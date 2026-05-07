const HowItWorks = () => {
  const steps = [
    {
      title: "Watch",
      desc: "Engage with bite-sized, high-quality video lessons.",
      icon: "🎥"
    },
    {
      title: "Monitor",
      desc: "Attention is gently tracked to ensure active learning.",
      icon: "👁"
    },
    {
      title: "Interact",
      desc: "Smart activities trigger to reinforce focus.",
      icon: "⚡"
    },
    {
      title: "Progress",
      desc: "Advance through levels as you master skills.",
      icon: "🏆"
    },
  ];

  return (
    <section className="py-32 px-[30px] md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-24">
          <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400">The Process</span>
          <h2 className="text-[40px] md:text-[56px] font-bold text-black leading-tight mt-4">
            How It Works
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* CONNECTING LINE (Desktop Only) */}
          <div className="hidden lg:block absolute top-[20%] left-0 w-full h-[1px] bg-gray-100 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group flex flex-col items-center text-center">
              
              {/* CIRCLE INDICATOR */}
              <div className="w-20 h-20 mb-8 rounded-[30px] bg-[#F9FAFB] border border-gray-100 flex items-center justify-center transition-all duration-500 group-hover:bg-[#D2F69E] group-hover:border-[#D2F69E] group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#D2F69E]/20">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-500">{step.icon}</span>
              </div>

              {/* STEP NUMBER PILL */}
              <div className="mb-4 px-3 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-[#D2F69E] group-hover:text-black transition-colors">
                Step 0{i + 1}
              </div>

              {/* CONTENT */}
              <h3 className="text-[20px] font-bold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed max-w-[200px]">
                {step.desc}
              </p>

              {/* MOBILE DIVIDER */}
              {i !== steps.length - 1 && (
                <div className="lg:hidden w-px h-12 bg-gray-100 my-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION LOOK-ALIKE */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-2 text-[14px] font-bold text-gray-300">
            <span>Seamless</span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <span>Adaptive</span>
            <div className="w-1 h-1 rounded-full bg-gray-200"></div>
            <span>Focused</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;