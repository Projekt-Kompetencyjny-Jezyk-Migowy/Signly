from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

import os
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from PIL import Image
import io
from mediapipe import solutions

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from joblib import load
import cv2

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, 'Randomforest_best.pkl')
model = load(model_path)

CLASS_NAMES = ['a', 'a+', 'b', 'c', 'c+', 'ch', 'cz', 'd', 'e', 'e+', 'f', 'g', 'h', 'i',
 'j', 'k', 'l', 'l+', 'm', 'n', 'n+', 'o', 'o+', 'p', 'r', 'rz', 's', 's+',
 'sz', 't', 'u', 'w', 'y', 'z', 'z+', 'z-']

BaseOptions = python.BaseOptions
HandLandmarker = vision.HandLandmarker
HandLandmarkerOptions = vision.HandLandmarkerOptions
MPImage = mp.Image

model_path = os.path.join(BASE_DIR, 'hand_landmarker.task')
base_options = BaseOptions(model_asset_path=model_path)
options = HandLandmarkerOptions(base_options=base_options, num_hands=1)
detector = HandLandmarker.create_from_options(options)

def calculate_vectors(hand_landmarks):
    vectors = []
    for connection in solutions.hands.HAND_CONNECTIONS:
        start_idx, end_idx = connection
        p1 = hand_landmarks[start_idx]
        p2 = hand_landmarks[end_idx]
        vector = (p2.x - p1.x, p2.y - p1.y, p2.z - p1.z)
        vectors.append((start_idx, end_idx, vector))
    return vectors

def apply_grouped_pca(X, n_components=1):
    lm_0_cols = [col for col in X.columns if col.startswith('0_point_lm_')]
    lm_1_cols = [col for col in X.columns if col.startswith('1_point_lm_')]
    lm_2_cols = [col for col in X.columns if col.startswith('2_point_lm_')]
    vec_cols = [col for col in X.columns if '_vec_' in col]

    def pca_transform(cols, prefix):
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X[cols])
        pca = PCA(n_components=n_components)
        X_pca = pca.fit_transform(X_scaled)
        return pd.DataFrame(X_pca, columns=[f'{prefix}_pca_{i}' for i in range(n_components)], index=X.index)

    pca_lm_0 = pca_transform(lm_0_cols, '0')
    pca_lm_1 = pca_transform(lm_1_cols, '1')
    pca_lm_2 = pca_transform(lm_2_cols, '2')
    vec_features = X[vec_cols].reset_index(drop=True)

    return pd.concat([pca_lm_0, pca_lm_1, pca_lm_2, vec_features], axis=1)
    
class ImageUpload(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist('images')
        if not images or len(images) < 3:
            return Response({"error": "Wymagane 3 zdjęcia!"}, status=status.HTTP_400_BAD_REQUEST)

        save_dir = '/app/saved_images'
        os.makedirs(save_dir, exist_ok=True)
        all_data = {}
        for idx, image_file in enumerate(images):
            row_data = {}
            filename = f'image{idx+1}.jpg'
            filepath = os.path.join(save_dir, filename)

            # Save the uploaded image file to disk
            with open(filepath, 'wb') as f:
                for chunk in image_file.chunks():
                    f.write(chunk)
            
            image = MPImage.create_from_file(filepath)
            result = detector.detect(image)

            if not result.hand_landmarks:
                return Response({"error": "Nothing detected in image try again"}, status=status.HTTP_400_BAD_REQUEST)

            landmarks = result.hand_landmarks[0]
            for i, lm in enumerate(landmarks):
                row_data[f"{idx}_point_lm_{i}_x"] = lm.x
                row_data[f"{idx}_point_lm_{i}_y"] = lm.y
                row_data[f"{idx}_point_lm_{i}_z"] = lm.z

            for start_idx, end_idx, vector in calculate_vectors(landmarks):
                vx, vy, vz = vector
                key_base = f"{idx}_point_vec_{start_idx}-{end_idx}"
                row_data[f"{key_base}_vx"] = vx
                row_data[f"{key_base}_vy"] = vy
                row_data[f"{key_base}_vz"] = vz

            all_data.update(row_data)
                
        if not all_data:
            return Response({"error": "No hands detected in the images"}, status=status.HTTP_400_BAD_REQUEST)

        df = pd.DataFrame([all_data])

        # Predykcja
        try:
            X_pca = apply_grouped_pca(df)
            sample = [X_pca.iloc[0]]
            proba = model.predict_proba(sample)[0]
            proba_dict = dict(zip(CLASS_NAMES, np.round(proba, 4)))
            most_likely = max(proba_dict, key=proba_dict.get)
            confidence = float(proba_dict[most_likely])

            return Response({
                "predicted_letter": most_likely,
                "confidence": confidence
            })
        except Exception as e:
            return Response({"error": f"Processing failed: {str(e)}"}, status=500)
