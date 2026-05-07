import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

const Dashboard = () => {
  const [levels, setLevels] = useState([]);
  const [progress, setProgress] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLevels();
    fetchProgress();
  }, []);

  const fetchLevels = async () => {
    const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/levels", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    data.sort((a, b) => a.levelNumber - b.levelNumber);

    setLevels(data);
  };

  const fetchProgress = async () => {
    const res = await fetch(
      "https://flowstate-backend-xlwk.onrender.com/api/progress/my-progress",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    setProgress(data);
  };

  // ✅ Completed Levels
  const completedLevels = useMemo(() => {
    const map = {};

    progress.forEach((p) => {
      if (p.status === "completed") {
        const lvlId = p.level?._id || p.level;
        map[lvlId] = true;
      }
    });

    return map;
  }, [progress]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-white font-['Poppins'] overflow-hidden">

      {/* Navbar */}
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-[40px] px-[30px] md:px-[127px] pb-10">

        {/* Title */}
        <h1 className="text-[36px] md:text-[48px] mb-[29px] text-black">
          Levels
        </h1>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {levels.map((level) => {
            const isCompleted = completedLevels[level._id];

            return (
              <div
                key={level._id}
                onClick={() => navigate(`/module/${level._id}`)}
                className="relative aspect-[244/187] rounded-[10px] overflow-hidden border border-[#D9D9D9] bg-white hover:shadow-md cursor-pointer transition-all duration-250"
              >

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#D2F69E] to-transparent opacity-40 pointer-events-none" />

                {/* Content */}
                <div className="p-5 flex flex-col h-full relative z-10">

                  <p className="text-[12px] uppercase tracking-wider text-[#5F6368] mb-1">
                    Level {level.levelNumber}
                  </p>

                  <h2 className="text-[20px] font-medium text-black mb-auto leading-snug">
                    {level.title}
                  </h2>

                  {/* Status */}
                  <div className="mt-4 flex items-center">
                    {isCompleted ? (
                      <div className="flex items-center gap-2">

                        <div className="w-2.5 h-2.5 rounded-full bg-[#8BC34A]" />

                        <span className="text-[13px] font-medium text-[#4F4F4F]">
                          Completed
                        </span>
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#5F6368]">
                        Available
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;