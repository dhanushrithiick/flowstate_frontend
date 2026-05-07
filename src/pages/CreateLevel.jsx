import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer.jsx"; 

const CreateLevel = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    levelNumber: "",
    title: "",
    description: "",
    skills: "",
    minScore: 60,
    minCompletion: 80
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/levels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        levelNumber: Number(form.levelNumber),
        title: form.title,
        description: form.description,
        skills: form.skills.split(","),
        unlockCriteria: {
          minScore: Number(form.minScore),
          minCompletion: Number(form.minCompletion)
        }
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Level created successfully");
      navigate("/admin"); // Redirecting back to admin
    } else {
      alert(data.msg);
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
        <div className="text-[24px] font-bold tracking-tight">FLOWSTATE</div>
        <div className="flex items-center gap-8">
          <Link to="/admin" className="text-[15px] font-medium text-gray-500 hover:text-black">Admin Panel</Link>
          <button 
            onClick={handleLogout}
            className="bg-[#D2F69E] text-black px-6 py-2 rounded-full text-[14px] font-bold hover:opacity-90 transition-opacity shadow-sm"
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
            <h1 className="text-[32px] font-bold tracking-tight">Create New Level</h1>
            <p className="text-gray-400 text-[14px]">Define the parameters and requirements for a new stage.</p>
          </div>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Level Number</label>
              <input 
                name="levelNumber" 
                type="number"
                placeholder="e.g. 1" 
                onChange={handleChange} 
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all" 
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Level Title</label>
              <input 
                name="title" 
                placeholder="e.g. Introduction to Design" 
                onChange={handleChange} 
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Description</label>
            <textarea 
              name="description" 
              rows="4"
              placeholder="Describe the objectives of this level..." 
              onChange={handleChange} 
              className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all resize-none" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Skills (Comma Separated)</label>
            <input 
              name="skills" 
              placeholder="e.g. UI Design, Color Theory, Typography" 
              onChange={handleChange} 
              className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Min Score Required</label>
              <input 
                name="minScore" 
                type="number"
                value={form.minScore}
                placeholder="60" 
                onChange={handleChange} 
                className="w-full px-5 py-3 rounded-xl border border-white bg-white focus:border-[#D2F69E] outline-none transition-all" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-bold uppercase tracking-widest text-gray-400 ml-1">Min Completion %</label>
              <input 
                name="minCompletion" 
                type="number"
                value={form.minCompletion}
                placeholder="80" 
                onChange={handleChange} 
                className="w-full px-5 py-3 rounded-xl border border-white bg-white focus:border-[#D2F69E] outline-none transition-all" 
              />
            </div>
          </div>

          <button className="w-full py-4 mt-4 bg-black text-white font-bold rounded-full hover:bg-[#D2F69E] hover:text-black transition-all shadow-lg shadow-black/5">
            Create Level
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateLevel;