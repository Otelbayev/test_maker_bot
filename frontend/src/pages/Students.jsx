import { useState } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import AddStudentModal from "../components/AddStudentModal";

const Students = () => {
  const { isDark } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  // Ranglarni isDark ga qarab o'zgaruvchilarga olamiz
  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const iconBg = isDark
    ? "bg-white/5 text-gray-600"
    : "bg-gray-100 text-gray-300";

  return (
    <div className="flex flex-col min-h-[80vh] relative">
      <div className="mb-8">
        <h1
          className={`text-3xl font-extrabold transition-colors ${textColor}`}
        >
          O'quvchilarim
        </h1>
        <p className={`font-medium transition-colors ${subTextColor}`}>
          {students.length} ta o'quvchi
        </p>
      </div>

      {students.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center text-center px-6"
        >
          <div
            className={`p-8 rounded-[3rem] mb-6 transition-all duration-500 ${iconBg}`}
          >
            <Users size={80} strokeWidth={1.5} />
          </div>
          <h2 className={`text-xl font-bold mb-2 ${textColor}`}>
            O'quvchilar yo'q
          </h2>
          <p className={`max-w-62.5 mb-8 leading-relaxed ${subTextColor}`}>
            Hali o'quvchi qo'shmagansiz. Yangi o'quvchi qo'shishni boshlang.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30"
          >
            <UserPlus size={20} />
            O'quvchi qo'shish
          </motion.button>
        </motion.div>
      )}

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 z-40"
      >
        <Plus size={30} />
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
