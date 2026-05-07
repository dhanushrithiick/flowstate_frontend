const Problem = () => {
  const problems = [
    {
      title: "Digital Distraction",
      text: "Constant notifications and wandering eyes make it impossible to stay in the zone during online lessons.",
    },
    {
      title: "Content Fatigue",
      text: "Traditional long-form videos lead to information overload, causing students to disengage quickly.",
    },
    {
      title: "Static Curriculum",
      text: "One-size-fits-all teaching fails to adapt to individual attention spans and unique learning speeds.",
    },
  ];

  return (
    <section className="py-32 px-[30px] md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">The Challenge</span>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-bold text-black leading-[1.1] tracking-tight max-w-3xl">
            Traditional learning isn't <br /> built for every mind.
          </h2>
        </div>

        {/* PROBLEMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {problems.map((item, i) => (
            <div 
              key={i} 
              className="group relative p-10 rounded-[40px] border border-gray-100 bg-white hover:bg-black transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-black/20"
            >
              {/* STEP INDICATOR */}
              <div className="w-12 h-12 mb-8 rounded-2xl bg-[#D2F69E] flex items-center justify-center text-black font-black text-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                {i + 1}
              </div>

              {/* TEXT CONTENT */}
              <h3 className="text-[22px] font-bold text-black mb-4 group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                {item.text}
              </p>

              {/* HOVER ACCENT */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#D2F69E]">
                  <path d="M18 6L6 18M18 6H6M18 6V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACCENT BAR */}
        <div className="mt-24 p-12 rounded-[40px] bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[20px] font-bold text-black text-center md:text-left">
            It's time to bridge the gap between <br className="hidden md:block" /> 
            content delivery and actual comprehension.
          </p>
          <div className="h-px w-20 bg-gray-200 hidden md:block"></div>
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#D2F69E] bg-black px-6 py-3 rounded-full">
            The Flowstate Mission
          </span>
        </div>
      </div>
    </section>
  );
};

export default Problem;