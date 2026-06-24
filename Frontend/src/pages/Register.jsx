import React, { useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    const {loading, handleRegister} = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // API call here
    const response = await handleRegister(formData);
    if(response.success){
      toast.success("User regsitered successfully.")
      navigate("/login");
    } else{
      console.log("response::",response);
      toast.error(response.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatedGradientBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            p-8
            shadow-[0_0_80px_rgba(59,130,246,0.12)]
          "
        >
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto flex items-center justify-center overflow-hidden">
  <div className="w-full h-full scale-90 transform origin-center">
    <DotLottieReact
      src="https://lottie.host/2fdfb483-efe8-4c62-97af-2937434c63f9/aexvea8Ubn.lottie"
      loop
      autoplay
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  </div>
</div>

          {/* Heading */}
          <h1 className="text-center text-4xl font-bold">
            Join{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              PriceOwl
            </span>
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Track prices, catch deals, and save money smarter.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                outline-none
                focus:border-blue-500
              "
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                outline-none
                focus:border-blue-500
              "
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                outline-none
                focus:border-blue-500
              "
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/40
                px-4
                py-3
                outline-none
                focus:border-blue-500
              "
            />

            <button
  type="submit"
  disabled={loading}
  className="
    w-full
    rounded-xl
    py-3
    font-semibold
    bg-gradient-to-r
    from-blue-600
    via-indigo-600
    to-blue-500
    transition-all
    duration-300
    shadow-lg
    shadow-blue-500/20
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
    hover:scale-[1.02]
  "
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>Creating Account...</span>
    </div>
  ) : (
    "Create Account"
  )}
</button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Button */}
          <button
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              py-3
              hover:bg-white/[0.06]
              transition-all
            "
          >
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button className="cursor-pointer text-blue-400 hover:text-blue-300" onClick={()=> navigate("/login")}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;