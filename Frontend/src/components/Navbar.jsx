import React, { useState, useEffect } from "react";
// Next.js ke navigation ke jagah standard React Router hooks use honge
import { useNavigate, useLocation } from "react-router-dom";
import applogo from "../assets/priceowllogoo.png"
import { useAuth } from "../hooks/useAuth";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

const NavBar = () => {
  const navigate = useNavigate(); // Next.js useRouter ki jagah
  const location = useLocation(); // Next.js usePathname ki jagah
  const pathname = location.pathname;

  const {user} = useAuth();

  // Fake auth variables (Next.js Clerk variables ko replace karne ke liye taaki code crash na ho)
  // Jab aap Firebase/Supabase/Context API use karo, toh inko true/false state se pass kar dena
  const isSignedIn = false; 

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-[#0b0a0c]/80 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "h-20 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => navigate("/")} // router.push ki jagah navigate()
            >
              <div className="relative flex justify-center items-center gap-3">
                {/* Next.js <Image/> component ki jagah normal HTML <img> tag */}
                <img
                  src={applogo}
                  alt="App logo"
                  className="w-15 h-15 object-contain"
                />
                <div
                  className={`caprasimo-regular text-2xl md:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                    scrolled ? "text-white" : "text-white"
                  }`}
                >
                  Price<span className="text-blue-500 group-hover:text-blue-500 transition-colors">Owl</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></div>
              </div>
              
              {isSignedIn && pathname !== "/" && (
                <span className={`hidden md:inline-block text-sm font-medium ${scrolled ? "text-gray-400" : "text-gray-300"}`}>
                  / Workspace
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-1">
                    <NavLink
                      href="/document"
                      active={pathname === "/document"}
                      scrolled={scrolled}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Documents
                    </NavLink>
                  </div>

                  <div className="flex items-center gap-4 ml-4">
                    <button
                      onClick={() => navigate("/document")}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Document
                      </div>
                    </button>

                    <div className="flex items-center gap-3">
                      {user && (
                        <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full ${scrolled ? "bg-gray-800" : "bg-white/10 backdrop-blur-sm"}`}>
                          <span className="text-sm font-medium text-white">
                            {user.firstName}
                          </span>
                        </div>
                      )}
                      {/* Avatar placeholder till you connect your Auth */}
                      <div className="w-9 h-9 rounded-full ring-2 ring-white/20 bg-purple-500 flex items-center justify-center text-xs font-bold text-white">
                        PO
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {
                    !user && (
                      <button
                    onClick={() => navigate("/login")}
                    className={`font-medium px-4 py-2 rounded-lg text-sm transition-all ${
                      scrolled ? "text-gray-300 hover:text-white" : "text-white hover:text-gray-200"
                    }`}
                  >
                    Login
                  </button>
                    )
                  }
                 {!user ?  (
                   <button
                    onClick={() => navigate("/login")}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                      Get Started Free
                    </div>
                  </button>
                 ) :
                 (<button
                    onClick={() => navigate("/submit-url")}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                      Get Started Free
                    </div>
                  </button>)
                }
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-gray-300 hover:bg-gray-800" : "text-white hover:bg-white/10"
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div className={`absolute right-0 top-0 h-full w-64 bg-[#0b0a0c] border-l border-white/5 shadow-xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl font-extrabold text-white">
                Price<span className="text-purple-500">Owl</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {isSignedIn ? (
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white">PO</div>
                    <div>
                      <p className="text-sm font-medium text-white">User</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/document")}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Go to Workspace
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/sign-in")}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for navigation links (Converted to standard React Router)
const NavLink = ({ href, active, scrolled, children }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(href)}
      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? scrolled
            ? "bg-gray-800 text-purple-400"
            : "bg-white/10 text-white"
          : scrolled
          ? "text-gray-400 hover:text-white hover:bg-gray-800"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
};

export default NavBar;