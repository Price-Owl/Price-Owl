import React, { useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


const Login = () => {
  const navigate = useNavigate();
  const { loading, setLoadin, handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const response = await handleLogin(formData);

    if (response?.success) {
      navigate("/");
    } else {
      toast.error(response?.message || "Something went wrong");
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
            Welcome Back to{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              PriceOwl
            </span>
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Login to continue tracking your favorite products.
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="
                mt-6
                rounded-xl
                border
                border-red-500/30
                bg-red-500/10
                px-4
                py-3
                text-red-400
                text-sm
              "
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                focus:ring-2
                focus:ring-blue-500/20
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
                focus:ring-2
                focus:ring-blue-500/20
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
                  <span>Logging the user...</span>
                </div>
              ) : (
                "Login"
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
            Don't have an account?{" "}
            <button className="cursor-pointer text-blue-400 hover:text-blue-300" onClick={()=> navigate("/register")}>
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
