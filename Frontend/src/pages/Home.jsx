import { useNavigate } from "react-router-dom"; 
import "./style.css";
import { useEffect, useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavBar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadinsScreen";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); 
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  const handleStart = () => {
    if (user) {
      navigate("/submit-url");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0A0C] text-[#F4F4F6] flex flex-col items-center selection:bg-white/10">
      
      {/* Navbar with isolated index */}
      <div className="relative z-50 w-full">
        <NavBar />
      </div>
      
      {/* Background Animated Gradients */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedGradientBackground />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 w-full min-h-[90vh] flex flex-col items-center justify-center gap-6 px-5 pt-20 md:pt-28 pb-12 text-center max-w-5xl mx-auto">
        
        {/* Lottie Container with soft breathing shadow */}
        <div className="w-28 h-28 md:w-36 md:h-36 mx-auto flex items-center justify-center overflow-hidden rounded-full bg-white/[0.01] border border-white/[0.05] shadow-[0_0_40px_rgba(255,255,255,0.02)]">
          <div className="w-full h-full scale-90 transform origin-center">
            <DotLottieReact
              src="https://lottie.host/2fdfb483-efe8-4c62-97af-2937434c63f9/aexvea8Ubn.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="caprasimo-regular text-6xl sm:text-7xl md:text-8xl tracking-tight leading-none mt-2">
          Price<span className="text-blue-500 hover:text-blue-400 transition-colors duration-300">Owl</span>
        </h1>
        
        {/* Tagline */}
        <p className="caprasimo-regular text-2xl sm:text-3xl md:text-4xl text-gray-300 max-w-2xl font-light">
          Keeping an Eye on Every Price.
        </p>

        {/* Tactical Solid White CTA Button */}
        <button
          onClick={handleStart}
          className="mt-4 px-8 py-4 rounded-full text-[#09090B] font-bold text-base shadow-[0_10px_30px_rgba(255,255,255,0.1)] 
             bg-[#F4F4F6] hover:bg-white hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)]
             transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] tracking-wider" 
        >
          Get Started with PriceOwl
        </button>

      </div>

      {/* --- FEATURE SECTION 1: Collaboration --- */}
      <div className="relative z-10 w-[90%] md:w-[80%] max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between py-24 gap-12 border-t border-white/[0.04]">
        
        <div className="w-full md:w-[50%] flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500 bg-clip-text text-transparent">
              Never Miss
            </span>
            <br />
            the lowest price.
          </h2>
          <p className="text-gray-400 font-light leading-relaxed max-w-lg">
            Hum e-commerce links ko 24/7 monitor karte hain. Jab bhi price niche girti hai, hum aapko direct email bhejte hain taaki aap best discount grab kar sakein.
          </p>
        </div>

        <div className="relative group p-3 bg-[#0E0E11]/40 border border-white/[0.06] rounded-3xl backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          <iframe
            width={isMobile ? 280 : 440}
            height={isMobile ? 280 : 440}
            src="https://lottie.host/embed/c4206d33-2368-4b32-bd04-6e233ab50b74/1AkVqUDEVQ.json"
            className="rounded-2xl border border-white/[0.03] relative z-10"
            title="Never Miss Low Price Animation"
          ></iframe>
        </div>

      </div>

      {/* --- FEATURE SECTION 2: Realtime tracking --- */}
      <div className="relative z-10 w-[90%] md:w-[80%] max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-24 gap-12 border-t border-white/[0.04]">
        
        
        <div className="relative group p-3 bg-[#0E0E11]/40 border border-white/[0.06] rounded-3xl backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute -inset-2 rounded-3xl bg-purple-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          <iframe
            width={isMobile ? 280 : 440}
            height={isMobile ? 280 : 440}
            src="https://lottie.host/embed/7d4fa3c8-20d2-4c75-bac7-4d0450deab28/xZfHtqYC0p.lottie"
            className="rounded-2xl border border-white/[0.03] relative z-10"
            title="Realtime Tracking Animation"
          ></iframe>
        </div>

        <div className="w-full md:w-[50%] flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Real time Price tracking{" "}
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
              for Smarter shopping.
            </span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed max-w-lg">
            Smart shoppers price drops ka manually wait nahi karte. PriceOwl aapke liye monitoring ka boring kaam automatic kar deta hai.
          </p>
        </div>

      </div>

      {/* --- CTA SECTION --- */}
      <div className="relative z-10 w-[90%] md:w-[80%] max-w-4xl mx-auto flex flex-col items-center gap-6 py-28 text-center border-t border-white/[0.04]">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
          Track from anywhere, on{" "}
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">any device</span>.
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-xl font-light leading-relaxed">
          Monitor, track, and capture price drops from mobile, tablet, or desktop — anytime, anywhere.
        </p>
        <button
          onClick={() => navigate(user ? "/submit-url" : "/register")}
          className="mt-3 px-8 py-4.5 rounded-2xl text-xs uppercase tracking-widest font-semibold bg-[#F4F4F6] text-[#09090B] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          Track Price Now →
        </button>
      </div>

      {/* --- MINIMALIST FOOTER --- */}
      <footer className="w-full py-8 border-t border-white/[0.06] bg-[#070709] text-center text-gray-500 text-xs tracking-widest font-mono relative z-20">
        © 2026 PriceOwl. Built with ❤️ by <span className="text-gray-400 hover:text-white transition-colors duration-300">Sumit Maddeshiya</span>
      </footer>

    </div>
  );
}