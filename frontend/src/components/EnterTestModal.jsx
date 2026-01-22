import { motion } from "framer-motion";
import { X, KeyRound, Sparkles } from "lucide-react";

const EnterTestModal = ({ isOpen, onClose, isDark }) => {
  const modalBg = isDark
    ? "bg-[#1e293b] border-white/10 shadow-black/60"
    : "bg-white border-gray-100 shadow-xl";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <div
            className={`relative w-full max-w-85 rounded-[2.5rem] p-7 border transition-all duration-500 ${modalBg}`}
          >
            {/* Yopish tugmasi - Mobil uchun qulayroq */}
            <button
              onClick={onClose}
              className={`absolute top-5 right-5 p-1.5 rounded-full transition-colors ${
                isDark
                  ? "hover:bg-white/5 text-gray-500"
                  : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div
                className={`inline-flex p-4 rounded-3xl mb-4 ${
                  isDark
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                <KeyRound size={28} />
              </div>
              <h2 className={`text-xl font-black mb-1.5 ${textColor}`}>
                Test kodi
              </h2>
              <p
                className={`text-[13px] font-medium px-4 leading-snug ${subTextColor}`}
              >
                O'qituvchidan olgan{" "}
                <span className="text-orange-500 font-bold underline">
                  6 xonali
                </span>{" "}
                kodni kiriting
              </p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric" // Mobil klaviaturada raqamlarni chiqaradi
                  placeholder="000000"
                  className={`w-full py-4 px-4 rounded-2xl text-center text-2xl font-black tracking-[0.3em] border transition-all outline-none focus:ring-4 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-indigo-500/50 focus:ring-indigo-500/10 placeholder:text-gray-800"
                      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400 focus:ring-indigo-100 placeholder:text-gray-200"
                  }`}
                />
                <Sparkles
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 opacity-40 hidden sm:block"
                  size={18}
                />
              </div>

              <div className="flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-500/30 active:scale-95 transition-all text-sm tracking-wide"
                >
                  DAVOM ETISH
                </motion.button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`py-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
                    isDark
                      ? "text-gray-600 hover:text-gray-500"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterTestModal;
