import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Save,
  Camera,
  Type,
  Minus,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { useMode } from "../context/ModeContext";
import { useNavigate } from "react-router-dom";

const CreateTest = () => {
  const { isDark } = useMode();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [testData, setTestData] = useState({
    title: "",
    subject: "Ingliz tili",
    isPublic: true,
    startTime: "",
    endTime: "",
  });

  const [mcqAnswers, setMcqAnswers] = useState(Array(35).fill(null));

  const [specialConfig, setSpecialConfig] = useState({
    method: "written",
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: 36 + i,
      answerCount: 1,
      correctAnswers: "",
    })),
  });

  const textColor = isDark ? "text-white" : "text-gray-800";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const inputBg = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const cardBg = isDark ? "bg-white/5" : "bg-gray-100";

  const handleMcqSelect = (idx, val) => {
    const newAns = [...mcqAnswers];
    newAns[idx] = val;
    setMcqAnswers(newAns);
  };

  return (
    <div
      className={`min-h-screen p-3 pb-24 transition-colors ${isDark ? "bg-[#0f172a]" : "bg-gray-50"}`}
    >
      {/* Header - Kichraytirilgan */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => (step > 1 ? setStep(1) : navigate(-1))}
          className={`p-1.5 rounded-lg ${cardBg} ${textColor}`}
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className={`text-lg font-black ${textColor}`}>Test yaratish</h1>
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* ASOSIY INPUTLAR - Zichlashtirilgan */}
          <div
            className={`p-4 rounded-xl ${cardBg} border ${isDark ? "border-white/5" : "border-gray-200"}`}
          >
            <label
              className={`block text-[9px] font-bold uppercase mb-1 ${subTextColor}`}
            >
              Test nomi
            </label>
            <input
              type="text"
              value={testData.title}
              onChange={(e) =>
                setTestData({ ...testData, title: e.target.value })
              }
              className={`w-full p-2.5 rounded-lg border text-sm outline-none mb-3 ${inputBg} ${textColor}`}
              placeholder="Masalan: Unit 5 Exam"
            />

            <label
              className={`block text-[9px] font-bold uppercase mb-1 ${subTextColor}`}
            >
              Fanni tanlang
            </label>
            <select
              value={testData.subject}
              onChange={(e) =>
                setTestData({ ...testData, subject: e.target.value })
              }
              className={`w-full p-2.5 rounded-lg border text-sm outline-none ${inputBg} ${textColor}`}
            >
              <option>Ingliz tili</option>
              <option>Matematika</option>
              <option>Ona tili</option>
            </select>
          </div>

          {/* TEST TURI - Balandligi kamaytirilgan */}
          <div
            className={`p-1 flex rounded-xl ${cardBg} border ${isDark ? "border-white/5" : "border-gray-200"}`}
          >
            <button
              onClick={() => setTestData({ ...testData, isPublic: true })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                testData.isPublic
                  ? "bg-blue-600 text-white shadow-md"
                  : subTextColor
              }`}
            >
              <Globe size={14} /> Ochiq
            </button>
            <button
              onClick={() => setTestData({ ...testData, isPublic: false })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                !testData.isPublic
                  ? "bg-red-600 text-white shadow-md"
                  : subTextColor
              }`}
            >
              <Lock size={14} /> Yopiq
            </button>
          </div>

          {/* VAQT - Grid va matn kichraytirilgan */}
          <AnimatePresence mode="wait">
            {testData.isPublic && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-3 rounded-xl ${cardBg}`}>
                    <label
                      className={`block text-[9px] font-bold mb-1 ${subTextColor}`}
                    >
                      Boshlash
                    </label>
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        setTestData({ ...testData, startTime: e.target.value })
                      }
                      className="w-full bg-transparent  text-[14px] text-blue-500 outline-none"
                    />
                  </div>
                  <div className={`p-3 rounded-xl ${cardBg}`}>
                    <label
                      className={`block text-[9px] font-bold mb-1 ${subTextColor}`}
                    >
                      Tugash
                    </label>
                    <input
                      type="datetime-local"
                      onChange={(e) =>
                        setTestData({ ...testData, endTime: e.target.value })
                      }
                      className="w-full bg-transparent text-[14px] text-red-500 outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg"
          >
            Savollarni kiritish
          </button>
        </motion.div>
      ) : (
        /* 2-QADAM: SAVOLLAR - LISTLAR OPTIMALLASHTIRILGAN */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <section>
            <h3
              className={`text-xs font-bold mb-3 flex items-center gap-2 ${textColor}`}
            >
              <span className="w-1 h-4 bg-blue-500 rounded-full"></span> 1-32
              (ABCD)
            </h3>
            <div className="space-y-2">
              {mcqAnswers.slice(0, 32).map((ans, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2"
                >
                  <span className={`text-[10px] font-bold w-5 ${subTextColor}`}>
                    {i + 1}.
                  </span>
                  <div className="flex gap-1 flex-1">
                    {["A", "B", "C", "D"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleMcqSelect(i, opt)}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-bold border transition-all ${
                          ans === opt
                            ? "bg-blue-600 border-blue-600 text-white"
                            : `${inputBg} ${textColor}`
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 33-35 SECTION - Kichikroq tugmalar */}
          <section>
            <h3
              className={`text-xs font-bold mb-3 flex items-center gap-2 ${textColor}`}
            >
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span> 33-35
              (ABCDEF)
            </h3>
            <div className="space-y-3">
              {mcqAnswers.slice(32, 35).map((ans, i) => (
                <div key={i + 32} className="flex flex-col gap-1.5">
                  <span className={`text-[10px] font-bold ${subTextColor}`}>
                    {i + 33}-savol:
                  </span>
                  <div className="flex gap-1">
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleMcqSelect(i + 32, opt)}
                        className={`flex-1 py-1.5 rounded-md text-[9px] font-bold border transition-all ${
                          ans === opt
                            ? "bg-purple-600 border-purple-600 text-white"
                            : `${inputBg} ${textColor}`
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 36-45 GURUHLI - Mobil uchun ixcham */}
          <section
            className={`p-3 rounded-2xl border ${isDark ? "border-white/5 bg-white/5" : "border-gray-200 bg-white"}`}
          >
            <div className="mb-4 text-center">
              <h3 className={`text-[11px] font-bold mb-2 ${textColor}`}>
                36-45 javob usuli
              </h3>
              <div className={`inline-flex p-1 rounded-lg ${cardBg}`}>
                <button
                  onClick={() =>
                    setSpecialConfig({ ...specialConfig, method: "written" })
                  }
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                    specialConfig.method === "written"
                      ? "bg-blue-600 text-white"
                      : subTextColor
                  }`}
                >
                  <Type size={12} /> Yozish
                </button>
                <button
                  onClick={() =>
                    setSpecialConfig({ ...specialConfig, method: "image" })
                  }
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${
                    specialConfig.method === "image"
                      ? "bg-blue-600 text-white"
                      : subTextColor
                  }`}
                >
                  <Camera size={12} /> Rasm
                </button>
              </div>
            </div>

            {specialConfig.method === "written" && (
              <div className="space-y-3">
                {specialConfig.questions.map((q) => (
                  <div key={q.id} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold ${textColor}`}>
                        {q.id}-savol
                      </span>
                      <div className="flex items-center gap-2 scale-90">
                        <button
                          className={`p-1 rounded ${cardBg} ${textColor}`}
                        >
                          <Minus size={10} />
                        </button>
                        <span className={`text-[10px] ${textColor}`}>
                          {q.answerCount}
                        </span>
                        <button
                          className={`p-1 rounded ${cardBg} ${textColor}`}
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Javobni kiriting"
                      className={`w-full p-2 rounded-lg border text-[11px] outline-none ${inputBg} ${textColor}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Fixed Save Button - Mobil uchun pastki qism */}
          <div
            className={`fixed bottom-0 left-0 right-0 p-3 border-t ${isDark ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-100"} z-50`}
          >
            <button className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
              <Save size={18} /> Saqlash
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateTest;
