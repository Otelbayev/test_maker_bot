import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, ArrowRight, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useMode } from "../context/ModeContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { login, authData } = useAuth();
  const { isDark, setIsDark } = useMode();

  const handleLogin = async (role) => {
    try {
      await login(role);
      navigate(role === "teacher" ? "/teacher" : "/student");
    } catch (error) {
      alert("Kirishda xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    if (authData?.role) {
      navigate(authData.role === "teacher" ? "/teacher" : "/student");
    }
  }, [authData, navigate]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center min-h-screen transition-all duration-500 overflow-hidden px-4 py-8 ${
        isDark ? "bg-[#0f172a]" : "bg-gray-50"
      }`}
    >
      {/* Dark Mode Toggle - Mobil uchun qulayroq joylashuv */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-full shadow-lg transition-all border ${
            isDark
              ? "bg-slate-800 text-yellow-400 border-slate-700"
              : "bg-white text-indigo-600 border-gray-200"
          } active:scale-90`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Background Glows - Mobil ekranlarda juda katta ko'rinmasligi uchun */}
      <div
        className={`absolute top-[-5%] left-[-10%] w-48 h-48 rounded-full blur-[80px] transition-opacity ${
          isDark ? "bg-blue-600/20" : "bg-blue-400/20"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[340px] sm:max-w-md text-center"
      >
        <h1
          className={`text-4xl md:text-6xl font-black mb-3 tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          TEST<span className="text-blue-500">MAKER</span>
        </h1>

        <p
          className={`mb-8 text-sm sm:text-lg font-medium px-4 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Davom etish uchun o'z rolingizni tanlang
        </p>

        {/* Kartalar orasidagi masofa mobil uchun moslangan */}
        <div className="flex flex-col gap-4 w-full">
          <RoleCard
            icon={<GraduationCap size={24} />}
            title="Test yaratuvchi"
            description="Testlar yarating va boshqaring"
            onClick={() => handleLogin("teacher")}
            isDark={isDark}
            colorClass={isDark ? "text-blue-400" : "text-blue-600"}
          />
          <RoleCard
            icon={<User size={24} />}
            title="Test topshiruvchi"
            description="Bilimingizni sinab ko'ring"
            onClick={() => handleLogin("student")}
            isDark={isDark}
            colorClass={isDark ? "text-purple-400" : "text-purple-600"}
          />
        </div>
      </motion.div>
    </div>
  );
}

const RoleCard = ({
  icon,
  title,
  description,
  onClick,
  isDark,
  colorClass,
}) => (
  <motion.button
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex items-center justify-between p-4 rounded-3xl border transition-all text-left ${
      isDark
        ? "bg-slate-800/50 border-slate-700 text-white"
        : "bg-white border-gray-200 text-slate-800 shadow-sm"
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-2xl shrink-0 ${
          isDark ? "bg-slate-900" : "bg-slate-50"
        } ${colorClass}`}
      >
        {icon}
      </div>
      <div className="overflow-hidden">
        <h3 className="text-base font-bold leading-tight">{title}</h3>
        <p
          className={`text-[12px] truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          {description}
        </p>
      </div>
    </div>
    <ArrowRight
      size={18}
      className={`shrink-0 ml-2 ${isDark ? "text-slate-600" : "text-slate-300"}`}
    />
  </motion.button>
);
