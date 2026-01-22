import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User2, LogOut, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authData, logout } = useAuth();

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const isActive = (path) => location.pathname === path;

  return (
    // "dark" klassi orqali ranglarni boshqaramiz
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      {/* --- HEADER --- */}
      <motion.header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b px-5 py-3 flex items-center justify-between ${
          isDark
            ? "bg-[#0f172a]/80 border-white/5"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <User2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">
              {authData.firstName || "User"}
            </span>
            <span
              className={`text-[10px] mt-1 uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                isDark
                  ? "bg-white/5 text-gray-400"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {authData.role}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* --- DARK MODE TOGGLE --- */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark
                ? "bg-white/5 border-white/10 text-yellow-400"
                : "bg-gray-100 border-gray-200 text-indigo-600"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={logout}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-red-50 border-red-100 text-red-500"
            }`}
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </motion.header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 pb-28 p-4 max-w-2xl mx-auto w-full">
        <Outlet context={{ isDark }} />
      </main>

      {/* --- BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
        <div
          className={`backdrop-blur-2xl border rounded-[2.5rem] p-2 shadow-2xl flex justify-around items-center transition-all ${
            isDark
              ? "bg-[#1e293b]/90 border-white/10"
              : "bg-white/90 border-gray-200 shadow-gray-200"
          }`}
        >
          <NavItem
            icon={<Home size={22} />}
            label="Home"
            active={isActive("/teacher") || isActive("/student")}
            onClick={() =>
              navigate(authData.role === "teacher" ? "/teacher" : "/student")
            }
            isDark={isDark}
          />
          {authData.role === "teacher" && (
            <NavItem
              icon={<Users size={22} />}
              label="Students"
              active={isActive("/students")}
              onClick={() => navigate("/students")}
              isDark={isDark}
            />
          )}
          <NavItem
            icon={<User2 size={22} />}
            label="Profile"
            active={isActive("/profile")}
            onClick={() => navigate("/profile")}
            isDark={isDark}
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick, isDark }) => (
  <button
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all ${
      active
        ? isDark
          ? "text-blue-400"
          : "text-blue-600"
        : isDark
          ? "text-gray-500"
          : "text-gray-400"
    }`}
  >
    {active && (
      <motion.div
        layoutId="nav-pill"
        className={`absolute inset-0 rounded-2xl ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <div className="relative z-10">{icon}</div>
    <span
      className={`relative z-10 text-[10px] mt-1 font-bold ${active ? "opacity-100" : "opacity-60"}`}
    >
      {label}
    </span>
  </button>
);

export default Layout;
