import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from 'react-router-dom';
import styles from './CameraTesting.module.css';

function CameraTesting() {
    const { letter } = useParams();
    const expectedLetter = letter?.toUpperCase() || "A";
    const webcamRef = useRef(null);
    const [screenshots, setScreenshots] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [recordingTimeLeft, setRecordingTimeLeft] = useState(null);
    const [isBusy, setIsBusy] = useState(false);
    const [result, setResult] = useState(null);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const runCountdown = async (start = 3) => {
        for (let i = start; i > 0; i--) {
            setCountdown(i);
            await delay(1000);
        }
        setCountdown(null);
    };

    const runRecordingTimer = async (duration = 3) => {
        for (let i = duration; i > 0; i--) {
            setRecordingTimeLeft(i);
            await delay(1000);
        }
        setRecordingTimeLeft(null);
    };

    const captureSquareScreenshot = () => {
        const webcam = webcamRef.current;
        if (!webcam || !webcam.video) return null;

        const video = webcam.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        const size = Math.min(videoWidth, videoHeight);

        const sx = (videoWidth - size) / 2;
        const sy = (videoHeight - size) / 2;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);

        return canvas.toDataURL("image/jpeg");
    };

    const captureScreenshots = async () => {
        if (!webcamRef.current) return;

        setIsBusy(true);
        setScreenshots([]);
        setRecordingTimeLeft(null);
        setResult(null);

        await runCountdown(3);

        const shots = [];

        const timerPromise = runRecordingTimer(3);

        const shotStart = captureSquareScreenshot();
        if (shotStart) shots.push(shotStart);

        await delay(1500);
        const shotMiddle = captureSquareScreenshot();
        if (shotMiddle) shots.push(shotMiddle);

        await delay(1500);
        const shotEnd = captureSquareScreenshot();
        if (shotEnd) shots.push(shotEnd);

        await timerPromise;

        setScreenshots(shots);
        await uploadImages(shots);
        setIsBusy(false);
    };

    const uploadImages = async (images) => {
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            const base64Response = await fetch(images[i]);
            const blob = await base64Response.blob();
            formData.append('images', blob, `screenshot${i + 1}.jpg`);
        }

        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch('http://localhost/api/uploadimages/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("Upload response:", data);

            setResult(data);

        } catch (error) {
            console.error("Upload error:", error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className={styles.webcam}
                />

                <button
                    onClick={handleButtonClick}
                    disabled={isBusy}
                    className={styles.button}
                >
                    {isBusy
                        ? "Working..."
                        : (isCorrect && confidence >= 0.5)
                            ? "Przejdź dalej"
                            : "Start Capture"}
                </button>

                <div className={styles.statusWrapper}>
                    {countdown !== null && (
                        <p className={styles.countdown}>Starting in: {countdown}</p>
                    )}

                    {recordingTimeLeft !== null && (
                        <p className={styles.recording}>Recording... {recordingTimeLeft}s left</p>
                    )}
                </div>
            </div>

            <div className={styles.screanshotsWrapper}>
                {result ? (
                    result.error ? (
                        <p style={{ color: "red" }}>
                            ⚠️ {result.error}
                        </p>
                    ) : (
                        <div className={styles.detectedLetter}>
                            <h1>{result.predicted_letter.toUpperCase()}</h1>
                            <p>Confidence: {(confidence * 100).toFixed(1)}%</p>

                            {isCorrect ? (
                                confidence < 0.5 ? (
                                    <h2 style={{ color: "orange" }}>
                                        ⚠️ Wykryto literę, ale mało dokładnie, spróbuj ponownie.
                                    </h2>
                                ) : (
                                    <h2>
                                        <span style={{ color: "green" }}>✅ Correct!</span>
                                    </h2>
                                )
                            ) : (
                                <h2 style={{ color: "red" }}>
                                    ❌ Wykryto złą literę, spróbuj ponownie.
                                </h2>
                            )}
                        </div>
                    )
                ) : (
                    <p>No result yet.</p>
                )}
            </div>
        </div>
    );
}

export default CameraTesting;
