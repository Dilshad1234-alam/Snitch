import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth.js";
import ContinueWithGoogle from "../components/ContinueWithGoogle";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await handleLogin({ email: formData.email, password: formData.password, });
      if (user.role == "buyer") {
        navigate("/");
      } else if (user.role == "seller") {
        navigate("/seller/dashboard")
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 font-sans relative overflow-hidden"
      style={{
        backgroundImage: 'url("/auth-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>

      <div className="w-full max-w-md space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-yellow-500 italic">
            SNITCH
          </h1>

          <p className="text-zinc-400 font-medium tracking-wide">
            WELCOME BACK TO THE REVOLUTION
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Email */}
            <div className="group relative">
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-zinc-800 py-3 px-1 outline-none transition-all duration-300 focus:border-yellow-500 placeholder:text-zinc-600 uppercase tracking-widest text-sm"
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <input
                type="password"
                name="password"
                placeholder="PASSWORD"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-zinc-800 py-3 px-1 outline-none transition-all duration-300 focus:border-yellow-500 placeholder:text-zinc-600 uppercase tracking-widest text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-none hover:bg-yellow-400 transition-colors duration-300 uppercase tracking-[0.2em] text-sm"
          >
            Log In
          </button>

          {/* <div className="flex items-center gap-4 my-6">
            <div className="h-[1px] bg-zinc-800 flex-1"></div>
            <span className="text-zinc-600 text-[10px] font-bold tracking-[0.2em] uppercase">
              OR
            </span>
            <div className="h-[1px] bg-zinc-800 flex-1"></div>
          </div> */}

          <ContinueWithGoogle />

        </form>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-500 hover:text-yellow-400 font-bold ml-2 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
