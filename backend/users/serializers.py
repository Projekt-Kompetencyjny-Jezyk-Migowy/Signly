from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField()
    sex = serializers.ChoiceField(choices=Profile.SEX_CHOICES)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password', 'password2', 'date_of_birth', 'sex')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Email already in use.")
        return data

    def create(self, validated_data):
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        password = validated_data['password']
        date_of_birth = validated_data['date_of_birth']
        sex = validated_data['sex']

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        Profile.objects.create(
            user=user,
            date_of_birth=date_of_birth,
            sex=sex,
        )

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Nieprawidłowy email lub hasło.")

        data['user'] = user
        return data
    