import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onBack }) {
  const navigate = useNavigate();

  // THEME ------------------------------------
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // NAVIGATION ----------------------------------
  const handleHome = () => navigate('/');
  const handleEco = () => navigate('/eco');

  return (
    <nav className="w-full bg-brand-bg text-brand-text shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Brand */}
        <div className="flex items-center gap-4">
          <h1 
            className="text-xl md:text-2xl font-bold tracking-wide text-brand-primary cursor-pointer"
            onClick={onBack}
          >
            OhMyHome
          </h1>
        </div>

        {/* RIGHT: Eco + Home Selection + Theme */}
        <div className="flex items-center gap-6">

          {/* Desktop Navigation */}
          <button className="hover:text-brand-primary transition" onClick={handleEco}>
            Eco🌱
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-xl hover:text-brand-primary transition">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
         
        </div>
      </div>
    </nav>
  );
}