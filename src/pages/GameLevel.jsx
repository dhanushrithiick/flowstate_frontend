import { useEffect, useState } from "react";

export default function GameLevel({ onComplete }) {

  const [playerX, setPlayerX] = useState(50);
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  // 🎉 SUCCESS
  const [completed, setCompleted] = useState(false);

  // ---------------- SPAWN OBJECTS ----------------

  useEffect(() => {

    if (completed || gameOver) return;

    const spawnInterval = setInterval(() => {

      setCoins((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),

          x: Math.random() * 90,

          y: 0,

          good: Math.random() > 0.3,
        },
      ]);

    }, 650);

    return () => clearInterval(spawnInterval);

  }, [completed, gameOver]);

  // ---------------- MOVE OBJECTS ----------------

  useEffect(() => {

    if (completed || gameOver) return;

    const moveInterval = setInterval(() => {

      setCoins((prev) =>
        prev
          .map((coin) => ({
            ...coin,
            y: coin.y + 3.8,
          }))
          .filter((coin) => coin.y < 100)
      );

    }, 70);

    return () => clearInterval(moveInterval);

  }, [completed, gameOver]);

  // ---------------- KEYBOARD CONTROL ----------------

  useEffect(() => {

    const handleKey = (e) => {

      if (completed || gameOver) return;

      if (e.key === "ArrowLeft") {

        setPlayerX((prev) =>
          Math.max(prev - 7, 5)
        );
      }

      if (e.key === "ArrowRight") {

        setPlayerX((prev) =>
          Math.min(prev + 7, 95)
        );
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };

  }, [completed, gameOver]);

  // ---------------- COLLISION DETECTION ----------------

  useEffect(() => {

    if (completed || gameOver) return;

    coins.forEach((coin) => {

      const hitX =
        coin.x > playerX - 6 &&
        coin.x < playerX + 6;

      const hitY =
        coin.y > 82 &&
        coin.y < 92;

      if (hitX && hitY) {

        // ✅ GOOD OBJECT
        if (coin.good) {

          const newScore = score + 1;

          setScore(newScore);

          setCoins((prev) =>
            prev.filter((c) => c.id !== coin.id)
          );

          // 🎉 COMPLETE GAME
          if (newScore >= 10) {

            setCompleted(true);

            // return to video after few seconds
            setTimeout(() => {

              if (onComplete) {
                onComplete();
              }

            }, 3500);
          }
        }

        // ❌ BAD OBJECT
        else {

          setGameOver(true);
        }
      }
    });

  }, [
    coins,
    playerX,
    score,
    completed,
    gameOver,
    onComplete,
  ]);

  // ---------------- RESTART ----------------

  const restartGame = () => {

    setCoins([]);
    setScore(0);

    setGameOver(false);
    setCompleted(false);

    setPlayerX(50);
  };

  // ---------------- GAME OVER SCREEN ----------------

  if (gameOver) {

    return (

      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">

        {/* RED GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-red-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] px-16 py-14 text-center shadow-2xl">

          <div className="text-8xl mb-6">
            💀
          </div>

          <h1 className="text-6xl font-black text-red-500 mb-4">
            Game Over
          </h1>

          <p className="text-2xl text-gray-300 mb-10">
            You hit a distraction object.
          </p>

          <button
            onClick={restartGame}
            className="bg-green-500 hover:bg-green-400 transition-all duration-300 px-10 py-5 rounded-3xl text-2xl font-bold shadow-2xl hover:scale-105"
          >
            Restart Game
          </button>

        </div>

      </div>
    );
  }

  // ---------------- SUCCESS SCREEN ----------------

  if (completed) {

    return (

      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">

        {/* GREEN GLOW */}
        <div className="absolute w-[700px] h-[700px] bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>

        {/* BLUE GLOW */}
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] px-20 py-16 text-center shadow-[0_0_80px_rgba(74,222,128,0.2)]">

          {/* ICON */}
          <div className="text-9xl mb-6 animate-bounce">
            🚀
          </div>

          {/* TITLE */}
          <h1 className="text-7xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
            AMAZING!
          </h1>

          {/* MESSAGE */}
          <p className="text-2xl text-gray-300 mb-4">
            Your focus level is back on track.
          </p>

          <p className="text-xl text-gray-500">
            Returning to your lesson...
          </p>

          {/* LOADING BAR */}
          <div className="mt-10 w-[400px] h-4 bg-white/10 rounded-full overflow-hidden">

            <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 animate-[loading_3s_linear_forwards]"></div>

          </div>

        </div>

        {/* CUSTOM ANIMATION */}
        <style>
          {`
            @keyframes loading {
              from {
                width: 0%;
              }
              to {
                width: 100%;
              }
            }
          `}
        </style>

      </div>
    );
  }

  // ---------------- MAIN GAME UI ----------------

  return (

    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-white">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-green-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 z-10 px-8 py-6 flex justify-between items-center backdrop-blur-xl bg-black/20 border-b border-white/10">

        {/* TITLE */}
        <div>

          <h1 className="text-5xl font-black tracking-wide">
            🎮 Focus Runner
          </h1>

          <p className="text-gray-400 mt-1 text-lg">
            Regain your focus and avoid distractions
          </p>

        </div>

        {/* SCORE CARD */}
        <div className="bg-green-500/10 border border-green-500/20 px-10 py-5 rounded-[28px] shadow-2xl backdrop-blur-xl">

          <p className="text-sm text-green-300 mb-1 tracking-widest">
            SCORE
          </p>

          <h2 className="text-5xl font-black text-green-400">
            {score} / 10
          </h2>

        </div>

      </div>

      {/* GAME AREA */}
      <div className="relative w-full h-full overflow-hidden">

        {/* PLAYER */}
        <div
          className="absolute bottom-8 w-24 h-24 rounded-[28px] transition-all duration-100 shadow-[0_0_50px_rgba(59,130,246,0.8)]"
          style={{
            left: `${playerX}%`,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(135deg,#3b82f6,#60a5fa)",
          }}
        >

          {/* INNER LIGHT */}
          <div className="absolute inset-2 rounded-[20px] bg-white/20"></div>

        </div>

        {/* OBJECTS */}
        {coins.map((coin) => (

          <div
            key={coin.id}

            className={`absolute rounded-full shadow-2xl transition-all duration-75 ${
              coin.good
                ? "bg-green-400 shadow-[0_0_35px_rgba(74,222,128,0.9)]"
                : "bg-red-500 shadow-[0_0_35px_rgba(239,68,68,0.9)]"
            }`}

            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              width: coin.good ? "65px" : "58px",
              height: coin.good ? "65px" : "58px",
            }}
          >

            {/* SHINE */}
            <div className="absolute inset-2 rounded-full bg-white/20"></div>

          </div>

        ))}

      </div>

      {/* BOTTOM PANEL */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center">

        <div className="bg-black/30 backdrop-blur-xl border border-white/10 px-12 py-6 rounded-[32px] shadow-2xl text-center">

          <p className="text-2xl font-bold mb-3">
            ⬅ Move Left &nbsp;&nbsp; ➡ Move Right
          </p>

          <p className="text-gray-300 text-lg">
            Catch{" "}
            <span className="text-green-400 font-bold">
              GREEN
            </span>{" "}
            objects and avoid{" "}
            <span className="text-red-400 font-bold">
              RED
            </span>{" "}
            distractions.
          </p>

        </div>

      </div>

    </div>
  );
}