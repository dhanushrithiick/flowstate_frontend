import { useEffect, useRef } from "react";

const AttentionTracker = ({ stream, onStatus }) => {
  const videoRef = useRef(null);
  const notFocusedStart = useRef(null);
  const hasPaused = useRef(false);

  useEffect(() => {
    if (!stream) return;

    let faceMesh;
    let isRunning = true;

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };

    const load = async () => {
      if (!window.FaceMesh) {
        const s = document.createElement("script");
        s.src =
          "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
        document.body.appendChild(s);
        await new Promise((r) => (s.onload = r));
      }

      const video = videoRef.current;
      video.srcObject = stream;

      await video.play().catch(() => {});

      faceMesh = new window.FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
      });

      const dist = (a, b) =>
        Math.hypot(a.x - b.x, a.y - b.y);

      const EAR = (lm, eye) => {
        const A = dist(lm[eye[1]], lm[eye[5]]);
        const B = dist(lm[eye[2]], lm[eye[4]]);
        const C = dist(lm[eye[0]], lm[eye[3]]);
        return (A + B) / (2 * C);
      };

      const L = [33, 160, 158, 133, 153, 144];
      const R = [362, 385, 387, 263, 373, 380];

      faceMesh.onResults((res) => {
        let status = "Focused";

        // 🔥 CRITICAL FIX — NO FACE
        if (!res.multiFaceLandmarks || res.multiFaceLandmarks.length === 0) {
          status = "Not Focused";
        } else {
          const lm = res.multiFaceLandmarks[0];

          const ear = (EAR(lm, L) + EAR(lm, R)) / 2;
          const offset = Math.abs(
            lm[1].x - (lm[234].x + lm[454].x) / 2
          );

          if (ear < 0.25) status = "Not Focused";
          else if (offset > 0.08) status = "Not Focused";
        }

        // 🔥 TIMER LOGIC
        if (status !== "Focused") {
          if (!notFocusedStart.current) {
            notFocusedStart.current = Date.now();
            console.log("⏱ started");
          }

          const duration = Date.now() - notFocusedStart.current;
          console.log("⏱", duration);

          if (duration > 10000 && !hasPaused.current) {
            console.log("⛔ PAUSE TRIGGERED");

            hasPaused.current = true;
            onStatus("PAUSE");

            // 🔥 STOP CAMERA (FIX YOUR LIGHT ISSUE)
            stopCamera();
          }
        } else {
          if (hasPaused.current) {
            console.log("▶ RESUME");
            onStatus("PLAY");
          }

          notFocusedStart.current = null;
          hasPaused.current = false;
        }
      });

      const loop = async () => {
        if (!isRunning) return;

        if (video.readyState >= 2) {
          await faceMesh.send({ image: video });
        }

        setTimeout(loop, 100);
      };

      loop();
    };

    load();

    return () => {
      isRunning = false;
      stopCamera(); // 🔥 cleanup fix
    };
  }, [stream]);

  return <video ref={videoRef} className="hidden" playsInline muted />;
};

export default AttentionTracker;