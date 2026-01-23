import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, ClipboardList } from "lucide-react";
import { useMode } from "../context/ModeContext";

const Tests = () => {
  const { isDark } = useMode();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("process"); // 'process' yoki 'closed'
  const [tests, setTests] = useState([]); // Testlar ro'yxati

  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const iconBg = isDark
    ? "bg-white/5 text-gray-700"
    : "bg-gray-50 text-gray-200";

  return (
    <div className="flex flex-col min-h-[75vh] relative p-2">
      {/* Yuqori qism: Sarlavha va Tugma */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h1
            className={`text-xl font-extrabold transition-colors ${textColor}`}
          >
            Testlar
          </h1>
          <p
            className={`text-sm font-medium transition-colors ${subTextColor}`}
          >
            {tests.length} ta umumiy test
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/createtest")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md"
        >
          <Plus size={18} />
          <span>Test qo'shish</span>
        </motion.button>
      </div>

      {/* Tablar (Rasmda ko'rsatilganidek) */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 mx-2">
        <button
          onClick={() => setActiveTab("process")}
          className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
            activeTab === "process" ? textColor : "text-gray-400"
          }`}
        >
          Jarayondagi testlar
          {activeTab === "process" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
            activeTab === "closed" ? textColor : "text-gray-400"
          }`}
        >
          Yopilgan testlar
          {activeTab === "closed" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
            />
          )}
        </button>
      </div>

      {/* Kontent qismi */}
      <AnimatePresence mode="wait">
        {tests.filter((t) => t.status === activeTab).length === 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-4"
          >
            <div
              className={`p-6 rounded-[2.5rem] mb-5 transition-all duration-500 ${iconBg}`}
            >
              <ClipboardList size={60} strokeWidth={1.2} />
            </div>

            <h2 className={`text-md font-bold mb-1.5 ${textColor}`}>
              {activeTab === "process"
                ? "Jarayonda testlar yo'q"
                : "Sizda hali yopilgan testlar yo'q"}
            </h2>
            <p
              className={`max-w-60 text-xs mb-6 leading-relaxed ${subTextColor}`}
            >
              {activeTab === "process"
                ? "Hozirda faol testlar mavjud emas. Yangi test yaratib o'quvchilarni tekshiring."
                : "Yopilgan testlar tarixi shu yerda ko'rinadi."}
            </p>

            {activeTab === "process" && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/createtest")}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20"
              >
                <FileText size={18} />
                Test yaratish
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="px-2">
            {/* Bu yerda testlar ro'yxati (map) bo'ladi */}
            <p className={subTextColor}>Testlar ro'yxati bu yerda chiqadi...</p>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/createtest")}
        className="fixed bottom-24 right-5 w-12 h-12 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30 z-40"
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default Tests;
