import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 h-[104px] flex justify-between items-center px-[45px] bg-white z-[1000]"
      role="navigation" 
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-[20px] font-medium text-black no-underline"
        aria-label="FLOWSTATE Home"
      >
        <b>FlowState</b>
      </Link>

      {/* Navigation & Primary Action */}
      <div className="flex items-center gap-[28px]">
        {/* Secondary Link */}
        <Link
          to="/signup"
          className="text-[14px] text-[#515154] no-underline hover:underline transition-all"
        >
          Sign Up
        </Link>
        
        {/* Primary CTA - Matches 'Sign Out' button style */}
        <Link
          to="/login"
          className="h-[41px] w-[77px] flex justify-center items-center text-[12px] font-medium text-black bg-[#D2F69E] hover:bg-[#c3ec8f] rounded-[20px] transition-all duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;