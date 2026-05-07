import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import GameLevel from "../pages/GameLevel";
import Footer from "../components/footer.jsx"; 

const Module = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();

  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [progress, setProgress] = useState([]);
  const [attention, setAttention] = useState("Focused");

  const [showGame, setShowGame] = useState(false);
  const [ytReady, setYtReady] = useState(false);

  const playerRef = useRef(null);
  const pollingRef = useRef(null);
  const stateArrayRef = useRef(["", "", "", 0]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchContent();
    fetchProgress();
  }, [levelId]);

  useEffect(() => {
    if (selectedContent) {
      initVideo();
    }
    return () => {
      stopAttentionTracking();
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [selectedContent]);

  const fetchContent = async () => {
    const res = await fetch(`https://flowstate-backend-xlwk.onrender.com/api/content/${levelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setContents(data);
    if (data.length > 0) { setSelectedContent(data[0]); }
  };

  const fetchProgress = async () => {
    const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/progress/my-progress", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProgress(data);
  };

  const sendProgress = async (score) => {
    if (!selectedContent) return;
    await fetch("https://flowstate-backend-xlwk.onrender.com/api/progress/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        contentId: selectedContent._id,
        levelId: selectedContent.level,
        score,
      }),
    });
    fetchProgress();
  };

  const isCompleted = (contentId) => {
    return progress.some((p) => p.content?._id === contentId && p.status === "completed");
  };

  // ---------------- UPDATED LOGGING LOGIC ----------------

  const resetAttentionState = () => {
    stateArrayRef.current = ["", "", "", 0];
    console.log("🔄 Attention State Reset", stateArrayRef.current); //
  };

  const startAttentionTracking = () => {
    if (pollingRef.current) return;
    console.log("✅ Attention tracking started"); //

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/status");
        const data = await res.json();
        const status = data.status;
        setAttention(status);

        if (status === "Calibrating") return;

        let stateArray = stateArrayRef.current;
        stateArray[0] = stateArray[1];
        stateArray[1] = stateArray[2];
        stateArray[2] = status;

        const lastThree = [stateArray[0], stateArray[1], stateArray[2]];
        const allDistracted = lastThree.every((s) => s && s !== "Focused");

        if (allDistracted && stateArray[3] === 0) {
          stateArray[3] = 1;
          stateArray[0] = ""; stateArray[1] = ""; stateArray[2] = "";
          alert("⚠ Please stay attentive!");
          console.log("⚠ Warning Triggered + Reset", stateArray); //
        } else if (allDistracted && stateArray[3] === 1) {
          console.log("🎮 Launching Focus Game", stateArray); //
          const htmlVideo = document.querySelector("video");
          if (htmlVideo) { htmlVideo.pause(); }
          if (playerRef.current && playerRef.current.pauseVideo) {
            try { playerRef.current.pauseVideo(); } catch (err) { console.log(err); }
          }
          stopAttentionTracking();
          setShowGame(true);
          resetAttentionState();
        } else {
          const allFocused = lastThree.every((s) => s === "Focused");
          if (allFocused && stateArray[3] === 1) { 
            stateArray[3] = 0;
            console.log("✅ User Refocused", stateArray); //
          }
        }
        
        console.log("👁 Attention Array:", stateArray); //

      } catch (err) {
        console.log("❌ FastAPI Error", err);
      }
    }, 5000);
  };

  const stopAttentionTracking = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
      resetAttentionState();
      console.log("🛑 Attention tracking stopped"); //
    }
  };

  // ---------------- VIDEO & UI (GALLERYX STYLE) ----------------

  const initVideo = () => {
    const url = selectedContent?.data?.videoUrl;
    if (!url) return;
    if (url.includes("youtube") || url.includes("youtu.be")) { loadYouTube(url); }
  };

  const loadYouTube = (url) => {
    const videoId = extractVideoId(url);
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => createPlayer(videoId);
    } else { createPlayer(videoId); }
  };

  const createPlayer = (videoId) => {
    if (playerRef.current?.destroy) { playerRef.current.destroy(); }
    playerRef.current = new window.YT.Player("youtube-player", {
      videoId,
      events: {
        onReady: () => { setYtReady(true); },
        onStateChange: handleYTState,
      },
    });
  };

  const handleYTState = async (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      await sendProgress(0);
      startAttentionTracking();
    }
    if (event.data === window.YT.PlayerState.PAUSED) { stopAttentionTracking(); }
    if (event.data === window.YT.PlayerState.ENDED) {
      await sendProgress(100);
      stopAttentionTracking();
    }
  };

  const extractVideoId = (url) => {
    if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1].split("?")[0];
    return "";
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setTimeout(() => {
      const htmlVideo = document.querySelector("video");
      if (htmlVideo) { htmlVideo.play().catch(() => {}); }
      if (ytReady && playerRef.current && playerRef.current.playVideo) {
        try { playerRef.current.playVideo(); } catch (err) { console.log(err); }
      }
      startAttentionTracking();
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderVideo = () => {
    if (!selectedContent?.data?.videoUrl) return <p className="text-gray-400 py-20 text-center">No video available</p>;
    const url = selectedContent.data.videoUrl;
    return (
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
        {url.includes("youtube") || url.includes("youtu.be") ? (
          <div id="youtube-player" className="w-full h-full"></div>
        ) : (
          <video controls className="w-full h-full"
            onPlay={() => { sendProgress(0); startAttentionTracking(); }}
            onPause={() => stopAttentionTracking()}
            onEnded={() => { sendProgress(100); stopAttentionTracking(); }}
          >
            <source src={url} type="video/mp4" />
          </video>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
     <div className="w-full border-b border-[#EFEFEF]">
        <div className="h-[88px] flex items-center justify-between px-[30px] md:px-[40px]">
          
          {/* Logo */}
          <h1 className="text-[30px] font-semibold tracking-[-1px] text-black">
            FlowState
          </h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-full bg-[#D2F69E] text-black text-[14px] font-medium transition hover:scale-[1.03]"
          >
            Logout
          </button>
        </div>
      </div>

      {showGame && (
        <div className="fixed inset-0 z-[100] bg-white">
          <GameLevel onComplete={handleGameComplete} />
        </div>
      )}

      <main className="pt-[50px] px-[30px] md:px-[80px] pb-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/dashboard")} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:border-black transition-all group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div>
              <h1 className="text-[32px] font-bold tracking-tight">{selectedContent?.title || "Loading..."}</h1>
              <p className="text-[14px] text-gray-400 font-medium uppercase tracking-widest">Module Contents</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
          <div className="xl:col-span-3">
            {renderVideo()}
            <div className="mt-8 p-8 rounded-3xl bg-gray-50 border border-gray-100">
              <h3 className="text-[20px] font-bold mb-3">About Lesson</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">Focus is monitored. If distraction is detected, the video will pause for a refocusing task.</p>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-[120px] rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-[16px] font-bold uppercase tracking-tight">Course Content</h3>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {contents.map((item, index) => {
                  const isActive = selectedContent?._id === item._id;
                  const completed = isCompleted(item._id);
                  return (
                    <div key={item._id} onClick={() => setSelectedContent(item)} className={`group flex items-start gap-4 p-5 cursor-pointer transition-all border-b border-gray-50 last:border-0 ${isActive ? "bg-[#D2F69E]/10" : "hover:bg-gray-50"}`}>
                      <div className={`mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border-2 ${completed ? "bg-[#D2F69E] border-[#D2F69E]" : "border-gray-200"}`}>
                        {completed && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[15px] font-bold ${isActive ? "text-black" : "text-gray-400"}`}>{item.title}</span>
                        <span className="text-[11px] text-gray-300 mt-1 font-bold">Step {index + 1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Module;