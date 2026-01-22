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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`relative w-full max-w-sm rounded-[3rem] p-10 border transition-all duration-500 ${modalBg}`}
          >
            {/* Yopish tugmasi */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-500/10"
            >
              <X size={20} className="text-gray-400" />
            </button>

            <div className="text-center mb-8">
              <div
                className={`inline-flex p-5 rounded-4xl mb-4 ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}
              >
                <KeyRound size={36} />
              </div>
              <h2 className={`text-2xl font-black mb-2 ${textColor}`}>
                Test kodi
              </h2>
              <p className={`text-sm font-medium ${subTextColor}`}>
                O'qituvchidan olgan{" "}
                <span className="text-orange-500 font-bold underline">
                  6 xonali
                </span>{" "}
                kodni kiriting
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Kodni kiritish..."
                  className={`w-full py-5 px-6 rounded-3xl text-center text-2xl font-black tracking-[0.5em] border transition-all outline-none focus:ring-8 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white focus:border-indigo-500/50 focus:ring-indigo-500/10 placeholder:text-gray-700"
                      : "bg-gray-50 border-gray-200 text-gray-800 focus:border-indigo-400 focus:ring-indigo-100 placeholder:text-gray-300"
                  }`}
                />
                <Sparkles
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-400 opacity-50"
                  size={20}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-5 rounded-3xl font-black shadow-xl shadow-indigo-500/40 active:scale-95 transition-all text-lg"
                >
                  DAVOM ETISH
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`py-2 text-sm font-bold uppercase tracking-widest ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EnterTestModal;
