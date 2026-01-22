import { motion } from "framer-motion";
import { X, Info } from "lucide-react";

const AddStudentModal = ({ isOpen, onClose, isDark }) => {
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
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Overlay - Orqa fon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal oynasi */}
          <div
            className={`relative w-full max-w-90 rounded-[1.75rem] p-6 shadow-2xl border transition-all duration-500 ${modalBg}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className={`text-lg font-extrabold ${titleColor}`}>
                O'quvchi qo'shish
              </h2>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-xl transition-colors ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <ModalInput label="Ism" placeholder="Ismi" isDark={isDark} />
              <ModalInput
                label="Familiya"
                placeholder="Familiyasi"
                isDark={isDark}
              />

              {/* Info Box - Mobil uchun ixchamroq */}
              <div
                className={`flex gap-3 p-3.5 rounded-xl border transition-all ${infoBox}`}
              >
                <Info size={18} className="shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium leading-normal">
                  ID avtomatik yaratiladi. Telegram ID kiritish shart emas.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-3 text-xs font-bold tracking-widest transition-colors ${cancelBtn}`}
                >
                  BEKOR QILISH
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalInput = ({ label, placeholder, isDark }) => (
  <div className="space-y-1">
    <label
      className={`text-[9px] font-black ml-1 uppercase tracking-widest ${
        isDark ? "text-gray-500" : "text-gray-400"
      }`}
    >
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-4 ${
        isDark
          ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-blue-500/10"
          : "bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-100"
      }`}
    />
  </div>
);

export default AddStudentModal;
