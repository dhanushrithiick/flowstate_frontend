import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-[30px] md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-black rounded-[48px] p-12 md:p-24 text-center">
          
          {/* BACKGROUND DECORATIVE GLOW */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#D2F69E]/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* LABEL */}
            <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#D2F69E] mb-8 block">
              Limited Access
            </span>

            {/* MAIN HEADING */}
            <h2 className="text-[40px] md:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-8">
              Ready to enter <br /> the <span className="text-[#D2F69E]">flow state?</span>
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-[18px] md:text-[20px] mb-12 max-w-xl mx-auto font-medium">
              Give them a calm, structured space to thrive at their own natural pace.
            </p>

            {/* CTA BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/login"
                className="group w-full sm:w-auto px-12 py-5 text-[16px] font-bold text-black bg-[#D2F69E] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(210,246,158,0.3)] hover:-translate-y-1 active:scale-95"
              >
                Get Started Now
              </Link>
              
              <button className="text-white text-[15px] font-bold border-b border-white/20 pb-1 hover:border-[#D2F69E] hover:text-[#D2F69E] transition-all">
                Contact Sales
              </button>
            </div>
          </div>

          {/* SUBTLE SYSTEM TEXT */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-20">
            <div className="w-1 h-1 rounded-full bg-white"></div>
            <span className="text-[10px] text-white font-black uppercase tracking-[0.5em]">GalleryX Protocol v1.0</span>
            <div className="w-1 h-1 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;