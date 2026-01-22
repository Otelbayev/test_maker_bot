import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";

const AddStudentModal = ({ isOpen, onClose, isDark }) => {
  // Modal stil sozlamalari
  const modalBg = isDark
    ? "bg-[#1e293b] border-white/10"
    : "bg-white border-gray-100";
  const titleColor = isDark ? "text-white" : "text-gray-800";
  const infoBox = isDark
    ? "bg-blue-500/5 border-blue-500/20 text-blue-400"
    : "bg-blue-50 border-blue-100 text-blue-600";
  const cancelBtn = isDark
    ? "text-gray-500 hover:text-gray-300"
    : "text-gray-400 hover:text-gray-600";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border transition-all duration-500 ${modalBg}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-extrabold italic ${titleColor}`}>
                O'quvchi qo'shish
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <ModalInput
                label="Ism"
                placeholder="O'quvchi ismini yozing"
                isDark={isDark}
              />
              <ModalInput
                label="Familiya"
                placeholder="O'quvchi familiyasini yozing"
                isDark={isDark}
              />

              <div
                className={`flex gap-3 p-4 rounded-2xl border transition-all ${infoBox}`}
              >
                <Info size={24} className="shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  O'quvchi uchun avtomatik ID yaratiladi. Telegram ID kiritish
                  shart emas.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-4 font-bold transition-colors ${cancelBtn}`}
                >
                  BEKOR QILISH
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModalInput = ({ label, placeholder, isDark }) => (
  <div className="space-y-1.5">
    <label
      className={`text-[10px] font-black ml-1 uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}
    >
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full p-4 rounded-2xl border transition-all outline-none focus:ring-4 ${
        isDark
          ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-blue-500/10"
          : "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-100"
      }`}
    />
  </div>
);

export default AddStudentModal;
