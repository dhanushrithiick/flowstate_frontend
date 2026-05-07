import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer.jsx"; 

const CreateContent = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "video",
    level: "",
    order: "",
    skillTag: "",
    difficulty: "easy",
    videoUrl: "",
  });

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/levels", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLevels(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = form.type === "video" ? { videoUrl: form.videoUrl } : {};

    const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        order: Number(form.order),
        data,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Content created successfully");
      navigate("/admin"); // Redirect back to admin panel
    } else {
      alert(result.msg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#1a1a1a]">
      
      {/* GALLERYX NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-gray-100 px-[30px] md:px-[80px] flex items-center justify-between z-[50]">
        <div className="text-[24px] font-bold tracking-tight">GalleryX</div>
        <div className="flex items-center gap-8">
          <Link to="/admin" className="text-[15px] font-medium text-gray-500 hover:text-black">Admin Panel</Link>
          <button 
            onClick={handleLogout}
            className="bg-[#D2F69E] text-black px-6 py-2 rounded-full text-[14px] font-bold hover:opacity-90 shadow-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="pt-[140px] px-[30px] md:px-[80px] pb-24 max-w-3xl mx-auto">
        
        {/* HEADER & BACK BUTTON */}
        <div className="flex items-center gap-6 mb-10">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:border-black transition-all group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h1 className="text-[32px] font-bold tracking-tight">Add Content</h1>
            <p className="text-gray-400 text-[14px]">Link new video lessons or activities to existing modules.</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Content Title</label>
            <input
              name="title"
              placeholder="Enter lesson title"
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Content Type</label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all appearance-none"
              >
                <option value="video">🎥 Video Lesson</option>
                <option value="quiz">📝 Quiz</option>
                <option value="game">🎮 Game</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Assign to Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all appearance-none"
                required
              >
                <option value="">Select Level</option>
                {levels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    Level {lvl.levelNumber}: {lvl.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Sequence Order</label>
              <input
                name="order"
                type="number"
                placeholder="e.g. 1"
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Difficulty</label>
              <select
                name="difficulty"
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all appearance-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Skill Tag</label>
            <input
              name="skillTag"
              placeholder="e.g. Visual Logic"
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all"
            />
          </div>

          {form.type === "video" && (
            <div className="flex flex-col gap-2 animate-in fade-in duration-500">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">YouTube / Video URL</label>
              <input
                name="videoUrl"
                placeholder="https://youtube.com/..."
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-2xl border border-[#D2F69E] bg-[#D2F69E]/5 focus:bg-white focus:border-[#D2F69E] outline-none transition-all"
                required
              />
            </div>
          )}

          <button className="w-full py-4 mt-6 bg-black text-white font-bold rounded-full hover:bg-[#D2F69E] hover:text-black transition-all shadow-lg shadow-black/5">
            Publish Content
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateContent;