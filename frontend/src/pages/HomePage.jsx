import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, ArrowRight } from "lucide-react"; // Yaxshiroq iconlar
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { login, authData } = useAuth();

  const handleLogin = async (role) => {
    try {
      await login(role);
      navigate(role === "teacher" ? "/teacher" : "/student");
    } catch (error) {
      alert("Kirishda xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    if (authData.role) {
      navigate(authData.role === "teacher" ? "/teacher" : "/student");
    }
  }, [authData, navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0f172a] overflow-hidden p-6">
      {/* Orqa fondagi dekorativ doiralar (Modern vibe berish uchun) */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-md text-center"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TESTMAKER
        </motion.h1>
        <p className="text-gray-400 mb-12 text-lg">
          O'z rolingizni tanlang va tizimga kiring
        </p>

        <div className="grid grid-cols-1 gap-5 w-full">
          <RoleCard
            icon={<GraduationCap size={32} className="text-blue-400" />}
            title="Test oluvchi"
            description="Testlar yaratish va boshqarish"
            onClick={() => handleLogin("teacher")}
            color="hover:border-blue-500/50"
          />
          <RoleCard
            icon={<User size={32} className="text-purple-400" />}
            title="Test topshiruvchi"
            description="Testlarni yechish va natijalarni ko'rish"
            onClick={() => handleLogin("student")}
            color="hover:border-purple-500/50"
          />
        </div>
      </motion.div>
    </div>
  );
}

const RoleCard = ({ icon, title, description, onClick, color }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center justify-between p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 ${color} group text-left`}
  >
    <div className="flex items-center gap-5">
      <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:bg-gray-700/50 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white leading-none mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
    <div className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">
      <ArrowRight size={20} />
    </div>
  </motion.button>
);
