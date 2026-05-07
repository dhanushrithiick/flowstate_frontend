import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/footer.jsx"; 

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white font-['Poppins'] text-[#1a1a1a]">
      
      {/* GALLERYX NAVBAR */}
     <div className="w-full border-b border-[#EFEFEF]">
        <div className="h-[88px] flex items-center justify-between px-[30px] md:px-[40px]">
          
          {/* Logo */}
          <h1 className="text-[30px] font-semibold tracking-[-1px] text-black">
            FLOWSTATE
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

      <main className="pt-[90px] px-[30px] md:px-[80px] pb-24 max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-[40px] font-bold tracking-tight text-black">Admin Panel</h1>
          <p className="text-gray-400 mt-2 text-[16px]">Manage your educational levels and content modules.</p>
        </div>

        {/* ACTION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Create Level Card */}
          <div 
            onClick={() => navigate("/admin/create-level")}
            className="group relative p-8 rounded-[32px] border border-gray-100 bg-white cursor-pointer transition-all duration-300 hover:border-[#D2F69E] hover:shadow-xl hover:shadow-[#D2F69E]/10"
          >
            <div className="flex flex-col h-full">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D2F69E] transition-colors duration-300">
                <span className="text-2xl">➕</span>
              </div>
              <h2 className="text-[22px] font-bold mb-2">Create Level</h2>
              <p className="text-gray-500 text-[14px] mb-8">Establish new curriculum stages and unlock sequences.</p>
              <div className="mt-auto flex items-center text-[13px] font-bold uppercase tracking-wider group-hover:text-black">
                Add New Level
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Create Content Card */}
          <div 
            onClick={() => navigate("/admin/create-content")}
            className="group relative p-8 rounded-[32px] border border-gray-100 bg-white cursor-pointer transition-all duration-300 hover:border-[#D2F69E] hover:shadow-xl hover:shadow-[#D2F69E]/10"
          >
            <div className="flex flex-col h-full">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D2F69E] transition-colors duration-300">
                <span className="text-2xl">🎥</span>
              </div>
              <h2 className="text-[22px] font-bold mb-2">Create Content</h2>
              <p className="text-gray-500 text-[14px] mb-8">Upload video lessons and materials to existing levels.</p>
              <div className="mt-auto flex items-center text-[13px] font-bold uppercase tracking-wider group-hover:text-black">
                Add Material
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LOGOUT (Alternative) */}
        <div className="mt-20 flex justify-center">
            <button 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 text-[14px] font-medium transition-colors underline underline-offset-4"
            >
                Sign out of Admin Session
            </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Admin;