import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from './CameraTesting.module.css';

function CameraTesting() {
    const webcamRef = useRef(null);
    const [screenshots, setScreenshots] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [recordingTimeLeft, setRecordingTimeLeft] = useState(null);
    const [isBusy, setIsBusy] = useState(false);

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

    const captureScreenshots = async () => {
        if (!webcamRef.current) return;

        setIsBusy(true);
        setScreenshots([]);
        setRecordingTimeLeft(null);

        await runCountdown(3);

        const shots = [];

        // Start recording timer in background (non-blocking)
        const timerPromise = runRecordingTimer(3);

        // Capture at t=0s
        const shotStart = webcamRef.current.getScreenshot();
        if (shotStart) shots.push(shotStart);

        await delay(1500);

        // Capture at t=1.5s
        const shotMiddle = webcamRef.current.getScreenshot();
        if (shotMiddle) shots.push(shotMiddle);

        await delay(1500);

        // Capture at t=3s
        const shotEnd = webcamRef.current.getScreenshot();
        if (shotEnd) shots.push(shotEnd);

        await timerPromise; // Ensure countdown finishes

        setScreenshots(shots);
        setIsBusy(false);
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

                <button onClick={captureScreenshots} disabled={isBusy} className={styles.button}>
                    {isBusy ? "Working..." : "Start Capture"}
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
                {screenshots.map((src, i) => (
                    <img key={i} src={src} alt={`Screenshot ${i + 1}`} className={styles.screenshot}/>
                ))}
            </div>
        </div>
    );
}

export default CameraTesting;
