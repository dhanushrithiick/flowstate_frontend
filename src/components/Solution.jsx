const Solution = () => {
  const solutions = [
    {
      title: "Attention-aware learning",
      desc: "Real-time focus monitoring ensures you never miss a critical concept."
    },
    {
      title: "Interactive engagement",
      desc: "Dynamic tasks that trigger when your focus slips, bringing you back to center."
    },
    {
      title: "Level-based progression",
      desc: "Structured paths designed to build mastery through consistent milestones."
    },
  ];

  return (
    <section className="py-32 px-6 md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-400">Our Approach</span>
          <h2 className="text-[48px] md:text-[64px] font-bold text-black leading-[1.1] tracking-tight mt-4">
            A smarter way <br /> to learn.
          </h2>
        </div>

        {/* SOLUTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, i) => (
            <div 
              key={i} 
              className="group p-10 rounded-[40px] border border-gray-100 bg-white hover:border-[#D2F69E] hover:shadow-2xl hover:shadow-[#D2F69E]/10 transition-all duration-500 flex flex-col items-start justify-between min-h-[320px]"
            >
              <div className="w-full">
                {/* ICON & STEP */}
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#D2F69E] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-bold text-gray-200 group-hover:text-[#D2F69E] transition-colors tracking-tighter">
                    0{i + 1}
                  </span>
                </div>

                {/* CONTENT */}
                <h3 className="text-[24px] font-bold text-black mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* ACCENT LINE */}
              <div className="w-0 group-hover:w-full h-[2px] bg-[#D2F69E] mt-8 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;