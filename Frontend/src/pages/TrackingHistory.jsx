import React, { useEffect, useState } from "react";
import AnimatedGradientBackground from "../components/animated-gradient-bg";
import NavBar from "../components/Navbar";
import { urlSubmit } from "../hooks/urlSubmit";

const platformStyles = {
  amazon: "text-amber-300 border-amber-500/20 bg-amber-500/[0.06]",
  flipkart: "text-blue-300 border-blue-500/20 bg-blue-500/[0.06]",
  default: "text-gray-300 border-white/[0.08] bg-white/[0.02]",
};

const platformIcons = {
  amazon: "🛒",
  flipkart: "🛍️",
  default: "📦",
};

// The API doesn't return a platform field directly, so we work it out
// from the stored product URL.
const getPlatform = (url = "") => {
  if (url.includes("amazon")) return "amazon";
  if (url.includes("flipkart")) return "flipkart";
  return "default";
};

const PriceChangeTag = ({ current, previous }) => {
  if (previous == null || current == null || previous === current) {
    return (
      <span className="text-xs text-gray-500 font-light">No change yet</span>
    );
  }

  const dropped = current < previous;
  const diff = Math.abs(previous - current);
  const percent = ((diff / previous) * 100).toFixed(1);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        dropped ? "text-emerald-400" : "text-rose-400"
      }`}
    >
      {dropped ? "↓" : "↑"} ₹{diff.toLocaleString("en-IN")} ({percent}%)
    </span>
  );
};

const ProductCardSkeleton = () => (
  <div className="rounded-3xl border border-white/[0.06] bg-[#0E0E11]/80 p-5 animate-pulse">
    <div className="h-36 w-full rounded-2xl bg-white/[0.04] mb-4" />
    <div className="h-3 w-3/4 rounded bg-white/[0.06] mb-3" />
    <div className="h-6 w-1/3 rounded bg-white/[0.06] mb-4" />
    <div className="h-9 w-full rounded-xl bg-white/[0.04]" />
  </div>
);

const EmptyState = () => (
  <div className="max-w-md mx-auto flex flex-col items-center justify-center text-center py-24 rounded-3xl border border-white/[0.06] bg-[#0E0E11]/60 backdrop-blur-xl">
    <span className="text-4xl mb-4">🦉</span>
    <h3 className="text-xl font-semibold text-gray-200 mb-2">
      Nothing tracked yet
    </h3>
    <p className="text-sm text-gray-500 max-w-sm font-light">
      Paste a product link on the home page and PriceOwl will start watching it
      for you.
    </p>
  </div>
);

//main logic goes below here
const TrackingHistory = () => {
  const { myProductTrackingDetails, handleMyTrackingDetails } = urlSubmit();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await handleMyTrackingDetails();
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0C] text-[#F4F4F6] selection:bg-white/10">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AnimatedGradientBackground />
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 py-24 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 text-center sm:text-left">
          <div className="mx-auto sm:mx-0 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 backdrop-blur-md mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">
              Your Tracked Products
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Tracking History
          </h1>
          <p className="text-sm text-gray-500 font-light mt-2">
            Every link you've submitted, and how its price has moved.
          </p>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : !myProductTrackingDetails ||
          myProductTrackingDetails.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProductTrackingDetails.map((product) => {
              const platformKey = getPlatform(product.productUrl);
              const badgeStyle = platformStyles[platformKey];
              const icon = platformIcons[platformKey];

              const priceHistory = Array.isArray(product.price)
                ? product.price
                : [];
              const previousPrice =
                priceHistory.length > 1
                  ? priceHistory[priceHistory.length - 2]
                  : null;

              return (
                <div
                  key={product._id}
                  className="group rounded-3xl border border-white/[0.06] bg-[#0E0E11]/80 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* IMAGE / ICON */}
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-[#08080A] border border-white/[0.05] mb-5 flex items-center justify-center">
                    <span className="text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                      {icon}
                    </span>

                    <span
                      className={`absolute top-2.5 right-2.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide backdrop-blur-md ${badgeStyle}`}
                    >
                      {platformKey === "default" ? "Unknown" : platformKey}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-sm font-medium text-gray-200 leading-snug line-clamp-2 mb-4 min-h-[2.5rem]">
                    {product.productName || "Untitled product"}
                  </h2>

                  {/* PRICE ROW */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-semibold text-white tracking-tight">
                      {product.currentPrice != null
                        ? `₹${product.currentPrice.toLocaleString("en-IN")}`
                        : "—"}
                    </span>
                    <PriceChangeTag
                      current={product.currentPrice}
                      previous={previousPrice}
                    />
                  </div>

                  {/* META */}
                  <p className="text-[11px] text-gray-600 font-light mb-5">
                    {priceHistory.length}{" "}
                    {priceHistory.length === 1 ? "price check" : "price checks"}{" "}
                    recorded
                  </p>

                  {/* ACTION */}
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      block text-center rounded-xl py-3 text-xs font-semibold
                      uppercase tracking-widest
                      bg-[#F4F4F6] text-[#09090B]
                      hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
                      transition-all duration-300 active:scale-[0.98]
                    "
                  >
                    View Product →
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingHistory;
