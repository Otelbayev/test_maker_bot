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
    <div className="space-y-6 pb-20 p-2">
      {/* Pastki qismda padding qo'shildi */}
      {/* Yuqori qism - Mobil uchun flex-col yoki kichikroq flex */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-2">
        <div>
          <h1 className={`text-xl font-black tracking-tight ${textColor}`}>
            Mening Testlarim
          </h1>
        </div>

        {/* Yuqoridagi tugma mobil uchun biroz ixchamroq */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Javoblarni jo'natish
        </motion.button>
      </div>
      {/* Jarayondagi testlar */}
      <section className="space-y-3">
        <h2
          className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 ${subTextColor}`}
        >
          Jarayondagi testlar
        </h2>
        <div
          className={`p-8 rounded-4xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
            isDark
              ? "border-white/5 bg-white/2"
              : "border-gray-100 bg-gray-50/50"
          }`}
        >
          <div
            className={`p-4 rounded-2xl mb-3 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}
          >
            <ClipboardList size={32} className={emptyText} strokeWidth={1.5} />
          </div>
          <p
            className={`text-[13px] font-medium max-w-45 leading-relaxed ${emptyText}`}
          >
            Hozircha sizga hech qanday test belgilanmagan.
          </p>
        </div>
      </section>
      {/* Yakunlangan testlar */}
      <section className="space-y-3">
        <h2
          className={`text-[10px] font-black uppercase tracking-[0.2em] ml-1 ${subTextColor}`}
        >
          Yakunlangan testlar
        </h2>
        <div
          className={`p-8 rounded-4xl border flex flex-col items-center justify-center text-center transition-all ${cardBg}`}
        >
          <div
            className={`p-4 rounded-2xl mb-3 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}
          >
            <CheckCircle2 size={32} className={emptyText} strokeWidth={1.5} />
          </div>
          <p
            className={`text-[13px] font-medium max-w-45 leading-relaxed ${emptyText}`}
          >
            Siz hali birorta ham testni tugatmagansiz.
          </p>
        </div>
      </section>
      {/* Floating Action Button - Joylashuvi o'ng tomonga yaxshilab sozlandi */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 z-40"
      >
        <Plus size={32} />
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
