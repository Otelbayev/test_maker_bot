// src/pages/HomePage.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, UserCheck, BookOpen, Monitor } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <motion.h1
        className="text-5xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Xush kelibsiz!
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.button
          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-md"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => navigate("/teacher")}
        >
          <UserCheck size={24} />
          <BookOpen size={24} />
          O'qituvchi sifatida kirish
        </motion.button>

        <motion.button
          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-md"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          onClick={() => navigate("/student")}
        >
          <User size={24} />
          <Monitor size={24} />
          O'quvchi sifatida kirish
        </motion.button>
      </div>
    </div>
  );
}
