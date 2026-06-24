import { useNavigate } from "react-router-dom"; // Fixed: Next.js router ki jagah React Router use kiya
import "./style.css";
import { useEffect, useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavBar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadinsScreen";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate(); // Fixed: router ki jagah navigate use hoga

  const {user, loading} = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if(loading) {
    return <LoadingScreen/>
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white flex flex-col items-center">
      <NavBar />
      <div>
        <AnimatedGradientBackground />
      </div>
      <div className="relative z-30 w-full min-h-[90vh] flex flex-col items-center justify-center gap-4 px-4 pt-12 md:pt-16 -translate-y-20">
        <div>
          {/* Fixed: Delay aur duration attributes normal div se hata diye taaki React warning na de */}
        {/* Lottie Container - Even smaller and strictly maintaining aspect ratio */}
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
        </div>
        <h1 className="caprasimo-regular text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center">
          Price<span className="text-blue-500 group-hover:text-blue-500 transition-colors">Owl</span>
        </h1>
          <p className="caprasimo-regular text-center text-4xl">
            Keeping an Eye on Every Price.
          </p>
          {
            user ? (
              <button
          // Fixed: router.push ki jagah navigate use kiya
          onClick={() => navigate("/submit-url")}
          className="px-6 py-3 rounded-full text-white font-semibold text-lg shadow-xl 
             bg-gradient-to-r from-[#2979FF] via-[#FF80AB] to-[#FFD600]
             hover:from-[#FF6D00] hover:to-[#00E676]
             transition-all duration-300 hover:scale-105 mx-auto border-2 border-white" 
        >
          Get Started with PriceOwl.
        </button>
            ):(
              <button
          // Fixed: router.push ki jagah navigate use kiya
          onClick={() => navigate("/register")}
          className="px-6 py-3 rounded-full text-white font-semibold text-lg shadow-xl 
             bg-gradient-to-r from-[#2979FF] via-[#FF80AB] to-[#FFD600]
             hover:from-[#FF6D00] hover:to-[#00E676]
             transition-all duration-300 hover:scale-105 mx-auto border-2 border-white" 
        >
          Get Started with PriceOwl.
        </button>
            )
          }
      </div>
      {/* Section 1: Collaboration */}
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between py-24 gap-10">
        <h1 className="w-full md:w-[45%] text-4xl md:text-6xl font-bold text-white text-center md:text-left leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
            Never Miss
          </span>
          , the lowest price.
        </h1>
        <iframe
          width={isMobile ? 300 : 500}
          height={isMobile ? 300 : 500}
          src="https://lottie.host/embed/c4206d33-2368-4b32-bd04-6e233ab50b74/1AkVqUDEVQ.json"
          className="rounded-xl shadow-xl"
        ></iframe>
      </div>

      {/* Section 2: Quill Integration */}
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-24 gap-10">
        <iframe
          width={isMobile ? 300 : 500}
          height={isMobile ? 300 : 500}
          src="https://lottie.host/embed/7d4fa3c8-20d2-4c75-bac7-4d0450deab28/xZfHtqYC0p.lottie"
          className="rounded-xl shadow-xl"
        ></iframe>
        <h1 className="w-full md:w-[45%] text-4xl md:text-6xl font-bold text-white text-center md:text-left leading-tight">
          Real time Price tracking{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            for Smarter shopping.
          </span>
        </h1>
      </div>

      {/* Section 3: CTA */}
      <div className="w-[90%] md:w-[80%] mx-auto flex flex-col items-center gap-8 py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
          Track from anywhere, on{" "}
          <span className="text-blue-400">any device</span>.
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl">
          Monitor, track, and capture price drops from mobile, tablet, or desktop —
          anytime, anywhere.
        </p>
        {
          user ? (
            <button
          onClick={() => navigate("/submit-url")}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Track Price
        </button>
          ) : (
            <button
          onClick={() => navigate("/register")}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          Track Price
        </button>
          )
        }
      </div>

      {/* Footer */}
      <footer className="w-full py-6 bg-gradient-to-r from-slate-700 to-slate-800 text-center text-white text-sm">
        © 2026 PriceOwl. Built with ❤️ by Sumit Maddeshiya
      </footer>
    </div>
  );
}