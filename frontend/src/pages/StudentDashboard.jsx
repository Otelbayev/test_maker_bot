import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, CheckCircle2, Send, Plus } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import EnterTestModal from "../components/EnterTestModal";

const StudentDashboard = () => {
  const { isDark } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Rang mantiqlari
  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const cardBg = isDark
    ? "bg-white/5 border-white/10"
    : "bg-white border-gray-100 shadow-sm";
  const emptyText = isDark ? "text-gray-600" : "text-gray-400";

  return (
    <div className="space-y-8 ">
      {/* Yuqori qism */}
      <div className="flex items-center justify-between">
        <h1
          className={`text-2xl font-black italic tracking-tight ${textColor}`}
        >
          Mening Testlarim
        </h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          <Send size={18} />
          Javoblarni jo'natish
        </motion.button>
      </div>

      {/* Jarayondagi testlar */}
      <section className="space-y-4">
        <h2
          className={`text-sm font-black uppercase tracking-widest ml-1 ${subTextColor}`}
        >
          Jarayondagi testlar
        </h2>
        <div
          className={`p-10 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
            isDark
              ? "border-white/5 bg-white/2"
              : "border-gray-100 bg-gray-50/50"
          }`}
        >
          <ClipboardList
            size={48}
            className={`mb-4 ${emptyText}`}
            strokeWidth={1.5}
          />
          <p className={`text-sm font-medium max-w-50 ${emptyText}`}>
            Hozircha sizga hech qanday test belgilanmagan.
          </p>
        </div>
      </section>

      {/* Yakunlangan testlar */}
      <section className="space-y-4">
        <h2
          className={`text-sm font-black uppercase tracking-widest ml-1 ${subTextColor}`}
        >
          Yakunlangan testlar
        </h2>
        <div
          className={`p-10 rounded-[2.5rem] border flex flex-col items-center justify-center text-center transition-all ${cardBg}`}
        >
          <CheckCircle2
            size={48}
            className={`mb-4 ${emptyText}`}
            strokeWidth={1.5}
          />
          <p className={`text-sm font-medium max-w-50 ${emptyText}`}>
            Siz hali birorta ham testni tugatmagansiz.
          </p>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 z-40"
      >
        <Plus size={35} />
      </motion.button>

      <EnterTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};

export default StudentDashboard;
