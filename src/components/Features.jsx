const Features = () => {
  const features = [
    {
      title: "ADHD-friendly design",
      desc: "Minimalist interfaces and high-contrast visuals designed to reduce cognitive load.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Real-time focus tracking",
      desc: "Advanced attention monitoring that understands when you're truly engaged.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "Interactive activities",
      desc: "Learning by doing through touch-first, immersive digital experiences.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Gamified rewards",
      desc: "Dopamine-friendly milestones that celebrate every step of the journey.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
        </svg>
      ),
    },
    {
      title: "Personalized learning",
      desc: "Content that intelligently adapts to your specific pace and performance.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Smart Interventions",
      desc: "Subtle redirects that bring the focus back without causing frustration.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-32 px-[30px] md:px-[80px] bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-4">Core Capabilities</span>
            <h2 className="text-[48px] md:text-[64px] font-bold text-black leading-[1.1] tracking-tight">
              Designed for <br /> deep work.
            </h2>
          </div>
          <div className="pb-4">
            <p className="text-gray-400 text-[16px] max-w-sm">
              We've stripped away the noise to focus on the features that actually drive comprehension.
            </p>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group p-10 rounded-[40px] border border-gray-100 bg-[#F9FAFB] hover:bg-white hover:border-[#D2F69E] hover:shadow-2xl hover:shadow-[#D2F69E]/10 transition-all duration-500 flex flex-col items-start"
            >
              {/* ICON CIRCLE */}
              <div className="w-16 h-16 mb-8 rounded-[20px] bg-white border border-gray-100 flex items-center justify-center text-black group-hover:bg-[#D2F69E] group-hover:border-[#D2F69E] transition-all duration-500 shadow-sm">
                {f.icon}
              </div>

              {/* CONTENT */}
              <h3 className="text-[22px] font-bold text-black mb-4 group-hover:translate-x-1 transition-transform duration-300">
                {f.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;