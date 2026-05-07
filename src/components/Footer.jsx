const Footer = () => {
  return (
    <footer className="py-20 px-[30px] md:px-[80px] bg-white border-t border-gray-50 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* LOGO & TAGLINE */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-[24px] font-bold tracking-tight text-black mb-2">
              FlowState<span className="text-[#D2F69E]">.</span>
            </h2>
            <p className="text-gray-400 text-[14px] max-w-[240px] leading-relaxed">
              Advancing human focus through adaptive, flow-state learning.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-[14px] font-bold text-black hover:text-[#D2F69E] transition-colors">Privacy</a>
            <a href="#" className="text-[14px] font-bold text-black hover:text-[#D2F69E] transition-colors">Terms</a>
            <a href="#" className="text-[14px] font-bold text-black hover:text-[#D2F69E] transition-colors">Contact</a>
          </div>

          {/* SOCIALS */}
          
        </div>

        {/* BOTTOM COPYRIGHT AREA */}
        <div className="mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-gray-300 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Flowstate Protocol
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D2F69E] animate-pulse"></div>
            <p className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">System Online</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;