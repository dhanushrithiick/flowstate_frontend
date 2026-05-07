import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-24 md:pt-48 md:pb-32 px-[30px] md:px-[80px] bg-white font-['Poppins'] overflow-hidden flex items-center">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D2F69E]/30 blur-[140px] rounded-full z-0 animate-pulse" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-gray-100 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="text-left">
          {/* SMALL TOP LABEL */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-black text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2F69E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D2F69E]"></span>
            </span>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              System Active: v1.0.4
            </p>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-[56px] sm:text-[72px] lg:text-[84px] font-bold tracking-[-0.05em] text-black leading-[0.9] mb-10">
            Mastery through <br />
            <span className="text-black/15 italic">Perfect Focus.</span>
          </h1>

          {/* SUBTITLE */}
          <div className="max-w-xl mb-12">
            <p className="text-[18px] md:text-[20px] text-gray-500 font-medium leading-relaxed mb-6">
              The first adaptive learning protocol that monitors real-time attention to trigger smart interventions.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Attention Tracking", "Adaptive UI", "Smart Drills"].map((tag) => (
                <span key={tag} className="text-[12px] font-bold text-gray-300 border border-gray-100 px-3 py-1 rounded-md uppercase tracking-widest">
                  • {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              to="/login"
              className="group relative w-full sm:w-auto px-12 py-6 text-[16px] font-bold text-black bg-[#D2F69E] rounded-full transition-all duration-300 hover:shadow-[0_20px_40px_rgba(210,246,158,0.4)] hover:-translate-y-1 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Initialize Learning
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
          </div>
        </div>

        {/* RIGHT COLUMN: FLOATING UI MOCKUP (Nice visual addition) */}
        <div className="hidden lg:flex justify-center relative">
          <div className="relative w-[450px] h-[300px] bg-white rounded-[32px] border border-gray-100 shadow-2xl p-8 rotate-3 hover:rotate-0 transition-all duration-700 group">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#D2F69E] text-[10px] font-black uppercase">Active Session</div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
              <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
              <div className="pt-6">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Attention Metric</p>
                <div className="w-full h-12 bg-gray-50 rounded-2xl flex items-end p-2 gap-1">
                  {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-black rounded-t-sm transition-all duration-1000" 
                      style={{ height: `${h}%`, opacity: (i + 1) / 7 }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* FLOATING BADGE */}
            <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-3xl shadow-xl animate-bounce">
              <p className="text-[24px] font-bold text-[#D2F69E]">98%</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Retention Rate</p>
            </div>
          </div>
        </div>

      </div>

      {/* SCROLL INDICATOR */}
      
    </section>
  );
};

export default Hero;