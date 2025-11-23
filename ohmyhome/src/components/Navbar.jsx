import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Helper function to safely parse and return an integer from localStorage
const getIntFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? parseInt(value) : defaultValue;
};

export default function Navbar({ onBack }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // THEME ------------------------------------
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Apply theme to the document root
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // MODE SELECTION ---------------------------
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "comfort_priority";
  });

  const [isUpdatingMode, setIsUpdatingMode] = useState(false);

  const handleModeChange = async (e) => {
    const newMode = e.target.value;
    setIsUpdatingMode(true);

    try {
      // MOCK MODE - Set to false when connecting to a real backend
      const MOCK_MODE = false;
      
      if (MOCK_MODE) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log('MOCK: Mode change', { mode: newMode });
      } else {
        // REAL API CALL
        const response = await fetch(`/mode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mode: newMode
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to update mode (${response.status})`);
        }
      }

      // Update local state
      setMode(newMode);
      localStorage.setItem("mode", newMode);

    } catch (err) {
      console.error('Error updating mode:', err);
      // Using a friendly message box instead of alert()
      // In a real application, replace this with a custom toast/modal
      alert(`Failed to update mode: ${err.message}`);
    } finally {
      setIsUpdatingMode(false);
    }
  };

  // THRESHOLD VALUES ---------------------------
  // Light Sensor Luminance Threshold (for automation triggering)
  const [luminance, setLuminance] = useState(() => getIntFromLocalStorage("luminance", 50));
  // Light Actuator Intensity Threshold (for setting desired light level)
  const [light, setLight] = useState(() => getIntFromLocalStorage("light", 50));
  // NEW: Humidity Threshold (for fan/dehumidifier)
  const [humidity, setHumidity] = useState(() => getIntFromLocalStorage("humidity", 60)); // 0-100%
  // NEW: Temperature Threshold (for AC/Thermostat)
  const [temperature, setTemperature] = useState(() => getIntFromLocalStorage("temperature", 24)); // 18-30°C

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("luminance", luminance.toString());
  }, [luminance]);

  useEffect(() => {
    localStorage.setItem("light", light.toString());
  }, [light]);

  useEffect(() => {
    localStorage.setItem("humidity", humidity.toString());
  }, [humidity]);

  useEffect(() => {
    localStorage.setItem("temperature", temperature.toString());
  }, [temperature]);

  // Handlers
  const handleLuminanceChange = (e) => {
    setLuminance(parseInt(e.target.value));
  };

  const handleLightChange = (e) => {
    setLight(parseInt(e.target.value));
  };
  
  const handleHumidityChange = (e) => {
    setHumidity(parseInt(e.target.value));
  };
  
  const handleTemperatureChange = (e) => {
    setTemperature(parseInt(e.target.value));
  };

  // SYSTEM MASTER SWITCH ---------------------------
  const [systemOn, setSystemOn] = useState(() => {
    return localStorage.getItem("systemOn") === "true";
  });
  const [isTogglingSystem, setIsTogglingSystem] = useState(false);

  const toggleSystem = async () => {
    const newState = systemOn ? "OFF" : "ON";
    setIsTogglingSystem(true);

    try {
      // MOCK MODE - Set to false when connecting to a real backend
      const MOCK_MODE = false;
      
      if (MOCK_MODE) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('MOCK: System toggle', { device: "system", state: newState, reason: "manual_frontend" });
      } else {
        // REAL API CALL
        const response = await fetch(`/device/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            device: "system",
            state: newState,
            reason: "manual_frontend"
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to update system (${response.status})`);
        }
      }

      // Update local state
      setSystemOn(!systemOn);
      localStorage.setItem("systemOn", (!systemOn).toString());

    } catch (err) {
      console.error('Error updating system:', err);
      // In a real application, replace this with a custom toast/modal
      alert(`Failed to update system: ${err.message}`);
    } finally {
      setIsTogglingSystem(false);
    }
  };

  // NAVIGATION ----------------------------------
  const handleEco = () => {
    // Navigates to the eco settings page
    navigate('/eco');
    // Removed setIsSidebarOpen(false) as the quick navigation button in the sidebar is now gone.
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="w-full bg-brand-bg text-brand-text shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LEFT: Brand + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu (Three Lines) */}
            <button 
              onClick={toggleSidebar}
              className="flex flex-col gap-1.5 hover:opacity-70 transition p-2 text-brand-text"
              aria-label="Toggle sidebar"
            >
              <span className="w-6 h-0.5 bg-brand-primary"></span>
              <span className="w-6 h-0.5 bg-brand-primary"></span>
              <span className="w-6 h-0.5 bg-brand-primary"></span>
            </button>

            <h1 
              className="text-xl md:text-2xl font-bold tracking-wide text-brand-primary cursor-pointer"
              onClick={onBack}
            >
              OhMyHome
            </h1>
          </div>

          {/* RIGHT: Eco + System Switch + Theme */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Navigation */}
            <button className="hidden sm:block hover:text-brand-primary transition font-semibold" onClick={handleEco}>
              Eco Mode 🌱
            </button>

            {/* System Master Switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSystem}
                disabled={isTogglingSystem}
                className={`relative inline-flex h-6 w-11 md:h-8 md:w-14 items-center rounded-full transition-colors ${
                  systemOn ? "bg-green-500" : "bg-red-500"
                } ${isTogglingSystem ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                title={`System is ${systemOn ? "ON" : "OFF"}`}
              >
                <span
                  className={`inline-block h-4 w-4 md:h-6 md:w-6 transform rounded-full bg-white transition-transform ${
                    systemOn ? "translate-x-5 md:translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold ${systemOn ? "text-green-500" : "text-red-500"}`}>
                {systemOn ? "ON" : "OFF"}
              </span>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-xl hover:text-brand-primary transition" title="Toggle Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-brand-bg text-brand-text shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button 
            onClick={toggleSidebar}
            className="mb-6 text-2xl hover:text-brand-primary transition"
            aria-label="Close sidebar"
          >
            ✕
          </button>

          {/* Sidebar Content */}
          <div className="space-y-4">
            <div className="border-b border-brand-primary pb-4">
              <h2 className="text-lg font-semibold mb-2">System Controls</h2>
            </div>
            
            {/* Mode Selection */}
            <div className="py-4">
              <label htmlFor="mode-select" className="block text-sm font-medium mb-2">
                Automation Mode
              </label>
              <select 
                id="mode-select"
                value={mode}
                onChange={handleModeChange}
                disabled={isUpdatingMode}
                className={`w-full px-3 py-2 bg-brand-bg border border-brand-primary rounded focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  isUpdatingMode ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option value="comfort_priority">Comfort Priority</option>
                <option value="manual_only">Manual Only</option>
                <option value="schedule_only">Schedule Only</option>
              </select>
              <p className="text-xs text-brand-text opacity-70 mt-2">
                Current: {mode.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            </div>
            
            {/* Removed Quick Navigation to Eco Mode */}
            {/* THRESHOLDS SECTION (Updated) */}
            <div className="py-4 border-t border-brand-primary pt-4">
              <h3 className="text-base font-bold mb-4 text-brand-text">Automation Thresholds</h3>

              {/* === LIGHT SECTION === */}
              <div className="mb-6 border-b border-gray-700 pb-4">
                <h4 className="text-base font-bold mb-2 text-purple-400">Light</h4>
                
                {/* 1. Luminance Sensor Threshold */}
                <div className="mb-4">
                  <label className="block text-sm mb-2">
                    Luminance Sensor Trigger (%)
                  </label>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={luminance}
                    onChange={handleLuminanceChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    style={{
                      background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${luminance}%, #374151 ${luminance}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-brand-text opacity-70 mt-1">
                    <span>0 (Dark)</span>
                    <span className="text-purple-400 font-semibold">{luminance}%</span>
                    <span>100 (Bright)</span>
                  </div>
                </div>

                {/* 2. Light Intensity Target */}
                <div>
                  <label className="block text-sm mb-2">
                    Desired Light Intensity (%)
                  </label>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={light}
                    onChange={handleLightChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    style={{
                      background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${light}%, #374151 ${light}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-brand-text opacity-70 mt-1">
                    <span>0 (Off)</span>
                    <span className="text-purple-400 font-semibold">{light}%</span>
                    <span>100 (Max)</span>
                  </div>
                </div>
              </div>

              {/* === FAN SECTION === */}
              <div className="mb-6 border-b border-gray-700 pb-4">
                <h4 className="text-base font-bold mb-2 text-green-400">Fan</h4>
                
                {/* 3. Humidity Threshold */}
                <div>
                  <label className="block text-sm mb-2">
                    Humidity Trigger (%)
                  </label>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={humidity}
                    onChange={handleHumidityChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    style={{
                      background: `linear-gradient(to right, #22c55e 0%, #22c55e ${humidity}%, #374151 ${humidity}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-brand-text opacity-70 mt-1">
                    <span>0</span>
                    <span className="text-green-400 font-semibold">{humidity}%</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* === AC SECTION === */}
              <div className="mb-4">
                <h4 className="text-base font-bold mb-2 text-sky-400">AC</h4>
                
                {/* 4. Temperature Threshold */}
                <div>
                  <label className="block text-sm mb-2">
                    Desired Temperature (°C)
                  </label>
                  <input 
                    type="range"
                    min="18"
                    max="30"
                    step="1"
                    value={temperature}
                    onChange={handleTemperatureChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    // Calculate gradient percentage based on the range (30 - 18 = 12 steps)
                    style={{
                      background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((temperature - 18) / 12) * 100}%, #374151 ${((temperature - 18) / 12) * 100}%, #374151 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-brand-text opacity-70 mt-1">
                    <span>18</span>
                    <span className="text-sky-400 font-semibold">{temperature}°C</span>
                    <span>30</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}