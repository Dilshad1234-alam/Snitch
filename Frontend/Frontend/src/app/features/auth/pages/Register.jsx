import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth.js";
import ContinueWithGoogle from "../components/ContinueWithGoogle.jsx";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    contact: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleRegister({
        email: formData.email,
        contact: formData.contact,
        password: formData.password,
        fullname: formData.fullname,
        isSeller: formData.isSeller,
      });

      navigate("/");
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
            JOIN THE CLOTHING REVOLUTION
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Full Name */}
            <div className="group relative">
              <input
                type="text"
                name="fullname"
                placeholder="FULL NAME"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-zinc-800 py-3 px-1 outline-none transition-all duration-300 focus:border-yellow-500 placeholder:text-zinc-600 uppercase tracking-widest text-sm"
              />
            </div>

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

            {/* Contact Number */}
            <div className="group relative">
              <input
                type="tel"
                name="contact"
                placeholder="CONTACT NUMBER"
                required
                value={formData.contact}
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

            {/* Seller Checkbox */}
            <div className="flex items-center space-x-3 pt-2">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="sr-only peer"
                />

                <div className="w-5 h-5 border-2 border-zinc-800 rounded-sm peer-checked:bg-yellow-500 peer-checked:border-yellow-500 transition-all duration-200"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-3.5 h-3.5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </label>

              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Register as a Seller
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-none hover:bg-yellow-400 transition-colors duration-300 uppercase tracking-[0.2em] text-sm"
          >
            Create Account
          </button>

          <ContinueWithGoogle />

        </form>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-400 font-bold ml-2 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;