import React from "react";
import owlLogo from "../assets/priceowllogoo.png"; // apna path yaha lagao

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
      
      {/* Owl Logo */}
      <div className="relative">
        <img
          src={owlLogo}
          alt="PriceOwl"
          className="w-40 md:w-52 animate-pulse"
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-125 animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-8 text-2xl md:text-3xl font-bold text-white">
        Price<span className="text-blue-500">Owl</span>
      </h2>

      <p className="mt-2 text-gray-400 text-sm md:text-base">
        Keeping an Eye on Every Price...
      </p>

      {/* Animated Dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
        <span
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
};

export default LoadingScreen;