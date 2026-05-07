const Levels = () => {
  const levelData = [
    { 
      level: "01", 
      title: "Foundations", 
      desc: "Master the basics of object recognition, geometric shapes, and logical sorting patterns." 
    },
    { 
      level: "02", 
      title: "Numeracy", 
      desc: "Develop a deep understanding of counting, number systems, and relative quantities." 
    },
    { 
      level: "03", 
      title: "Applications", 
      desc: "Apply learned skills to real-world scenarios and complex problem-solving environments." 
    },
  ];

  return (
    <section className="py-32 px-[30px] md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400">Curriculum Path</span>
          <h2 className="text-[40px] md:text-[56px] font-bold text-black leading-tight mt-4">
            Learning, step by step.
          </h2>
          <div className="w-20 h-1.5 bg-[#D2F69E] mx-auto mt-8 rounded-full"></div>
        </div>

        {/* LEVELS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levelData.map((l, i) => (
            <div 
              key={i} 
              className="group relative p-10 rounded-[40px] border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:border-[#D2F69E] hover:shadow-2xl hover:shadow-[#D2F69E]/10 transition-all duration-500"
            >
              {/* LEVEL INDICATOR */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full bg-black text-white group-hover:bg-[#D2F69E] group-hover:text-black transition-colors duration-500">
                <span className="text-[11px] font-black uppercase tracking-widest">Level</span>
                <span className="text-[14px] font-bold">{l.level}</span>
              </div>

              {/* TITLE & DESCRIPTION */}
              <h3 className="text-[24px] font-bold text-black mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {l.title}
              </h3>
              <p className="text-gray-500 text-[16px] leading-relaxed mb-6">
                {l.desc}
              </p>

              {/* PROGRESSION ARROW (Visible on Hover) */}
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* SIDE ACCENT */}
              <div className="absolute top-0 left-0 h-0 w-1 bg-[#D2F69E] group-hover:h-full transition-all duration-500 rounded-l-[40px]"></div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-20 text-center">
          <p className="text-[14px] text-gray-300 font-medium">
            Each level is unlocked upon meeting specific focus and performance milestones.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Levels;