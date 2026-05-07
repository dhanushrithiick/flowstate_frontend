import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://flowstate-backend-xlwk.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || data.error || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      const user = JSON.parse(atob(data.token.split(".")[1]));

      if (user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-['Poppins'] px-6 py-20">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#D2F69E]/10 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gray-50 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 w-full max-w-[480px]">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 text-[24px] font-bold tracking-tighter">
            FlowState<span className="text-[#D2F69E]">.</span>
          </Link>
          <h1 className="text-[32px] font-bold text-black tracking-tight leading-tight">
            Create Account
          </h1>
          <p className="text-gray-400 text-[15px] mt-2">Join the next generation of flow-state learners.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full h-[56px] px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all text-[15px]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Age</label>
              <input
                name="age"
                type="number"
                placeholder="24"
                value={form.age}
                onChange={handleChange}
                className="w-full h-[56px] px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all text-[15px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full h-[56px] px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all text-[15px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full h-[56px] px-6 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-[#D2F69E] outline-none transition-all text-[15px]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[60px] rounded-full bg-black text-white font-bold text-[16px] hover:bg-[#D2F69E] hover:text-black hover:shadow-xl hover:shadow-[#D2F69E]/20 transition-all duration-300 mt-6 flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating Account...
              </span>
            ) : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-[14px] text-gray-400 text-center mt-10">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-bold hover:text-[#D2F69E] transition-colors">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;