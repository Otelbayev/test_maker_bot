import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Plus } from "lucide-react";
import AddStudentModal from "../components/AddStudentModal";
import { useMode } from "../context/ModeContext";

const Students = () => {
  const { isDark } = useMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const iconBg = isDark
    ? "bg-white/5 text-gray-700"
    : "bg-gray-50 text-gray-200";

  return (
    <div className="flex flex-col min-h-[75vh] relative p-2">
      {/* Sarlavha qismi - Mobil uchun kichraytirildi */}
      <div className="mb-6 ml-2">
        <h1 className={`text-xl font-extrabold transition-colors ${textColor}`}>
          O'quvchilarim
        </h1>
        <p className={`text-sm font-medium transition-colors ${subTextColor}`}>
          {students.length} ta o'quvchi
        </p>
      </div>

      {students.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-center px-4"
        >
          {/* Bo'sh holat iconi - Mobilga moslandi */}
          <div
            className={`p-6 rounded-[2.5rem] mb-5 transition-all duration-500 ${iconBg}`}
          >
            <Users size={60} strokeWidth={1.2} />
          </div>

          <h2 className={`text-md font-bold mb-1.5 ${textColor}`}>
            O'quvchilar yo'q
          </h2>
          <p
            className={`max-w-60 text-xs mb-6 leading-relaxed ${subTextColor}`}
          >
            Hali o'quvchi qo'shmagansiz. Yangi o'quvchi qo'shishni boshlang.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20"
          >
            <UserPlus size={18} />
            O'quvchi qo'shish
          </motion.button>
        </motion.div>
      )}

      {/* FAB (Floating Action Button) - Mobil uchun optimallashgan */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-5 w-12 h-12 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30 z-40"
      >
        <Plus size={24} />
      </motion.button>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};

export default Students;
