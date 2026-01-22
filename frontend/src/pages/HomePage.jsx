import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, UserCheck } from "lucide-react";
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
  }, [authData]);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Xush kelibsiz!
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6">
        <RoleButton
          icon={<UserCheck size={24} />}
          label="O'qituvchi sifatida kirish"
          onClick={() => handleLogin("teacher")}
          variants={buttonVariants}
        />
        <RoleButton
          icon={<User size={24} />}
          label="O'quvchi sifatida kirish"
          onClick={() => handleLogin("student")}
          variants={buttonVariants}
        />
      </div>
    </div>
  );
}

const RoleButton = ({ icon, subIcon, label, onClick, variants }) => (
  <motion.button
    className="flex items-center gap-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-5 rounded-2xl shadow-lg border border-gray-700"
    variants={variants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    onClick={onClick}
  >
    <div className="flex flex-col items-center">
      {icon}
      <span className="opacity-50">{subIcon}</span>
    </div>
    <span className="text-lg">{label}</span>
  </motion.button>
);
