import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Save, Camera, Type, Minus, Plus } from "lucide-react";
import { useMode } from "../context/ModeContext";

const CreateTest = () => {
  const { isDark } = useMode();
  const [step, setStep] = useState(1);

  // Test ma'lumotlari
  const [testData, setTestData] = useState({
    title: "",
    subject: "",
    type: "open",
    startTime: "",
    endTime: "",
  });

  // Javoblar
  const [mcqAnswers, setMcqAnswers] = useState(Array(35).fill(null));

  // 36-45 savollar uchun guruhli sozlama
  const [specialConfig, setSpecialConfig] = useState({
    method: "written", // "written" yoki "image"
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
      className={`min-h-screen p-4 pb-32 transition-colors ${isDark ? "bg-[#0f172a]" : "bg-gray-50"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => step > 1 && setStep(1)}
          className={`p-2 rounded-xl ${cardBg} ${textColor}`}
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className={`text-xl font-black ${textColor}`}>Test yaratish</h1>
      </div>

      {step === 1 ? (
        /* 1-QADAM: ASOSIY MA'LUMOTLAR */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          <div
            className={`p-5 rounded-2xl ${cardBg} border ${isDark ? "border-white/5" : "border-gray-200"}`}
          >
            <label
              className={`block text-[10px] font-bold uppercase mb-2 ${subTextColor}`}
            >
              Test nomi
            </label>
            <input
              type="text"
              className={`w-full p-3 rounded-xl border outline-none ${inputBg} ${textColor}`}
              placeholder="Masalan: Unit 5 Exam"
            />

            <label
              className={`block text-[10px] font-bold uppercase mt-4 mb-2 ${subTextColor}`}
            >
              Fanni tanlang
            </label>
            <select
              className={`w-full p-3 rounded-xl border outline-none ${inputBg} ${textColor}`}
            >
              <option>Ingliz tili</option>
              <option>Matematika</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-2xl ${cardBg}`}>
              <label
                className={`block text-[10px] font-bold mb-2 ${subTextColor}`}
              >
                Boshlash
              </label>
              <input
                type="datetime-local"
                className="w-full bg-transparent text-xs text-blue-500 outline-none"
              />
            </div>
            <div className={`p-4 rounded-2xl ${cardBg}`}>
              <label
                className={`block text-[10px] font-bold mb-2 ${subTextColor}`}
              >
                Tugash
              </label>
              <input
                type="datetime-local"
                className="w-full bg-transparent text-xs text-red-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30"
          >
            Savollarni kiritish
          </button>
        </motion.div>
      ) : (
        /* 2-QADAM: SAVOLLAR */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* 1-32 SAVOLLAR (ABCD) */}
          <section>
            <h3
              className={`text-sm font-bold mb-4 flex items-center gap-2 ${textColor}`}
            >
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span> 1-32
              savollar (ABCD)
            </h3>
            <div className="space-y-4">
              {mcqAnswers.slice(0, 32).map((ans, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group"
                >
                  <span className={`text-xs font-bold ${subTextColor}`}>
                    {i + 1}.
                  </span>
                  <div className="flex gap-2 w-[85%]">
                    {["A", "B", "C", "D"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleMcqSelect(i, opt)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${ans === opt ? "bg-blue-600 border-blue-600 text-white" : `${inputBg} ${textColor}`}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 33-35 SAVOLLAR (ABCDEF) */}
          <section>
            <h3
              className={`text-sm font-bold mb-4 flex items-center gap-2 ${textColor}`}
            >
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span> 33-35
              savollar (ABCDEF)
            </h3>
            <div className="space-y-4">
              {mcqAnswers.slice(32, 35).map((ans, i) => (
                <div key={i + 32} className="flex flex-col gap-2">
                  <span className={`text-xs font-bold ${subTextColor}`}>
                    {i + 33}-savol:
                  </span>
                  <div className="flex gap-1.5">
                    {["A", "B", "C", "D", "E", "F"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleMcqSelect(i + 32, opt)}
                        className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold border transition-all ${ans === opt ? "bg-purple-600 border-purple-600 text-white" : `${inputBg} ${textColor}`}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 36-45 SAVOLLAR (GURUHLI) */}
          <section
            className={`p-4 rounded-3xl border-2 ${isDark ? "border-white/5 bg-white/5" : "border-gray-200 bg-white"}`}
          >
            <div className="mb-6 text-center">
              <h3 className={`text-sm font-bold mb-2 ${textColor}`}>
                36-45 savollar uchun javob usuli
              </h3>
              <div className={`inline-flex p-1 rounded-xl ${cardBg}`}>
                <button
                  onClick={() =>
                    setSpecialConfig({ ...specialConfig, method: "written" })
                  }
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${specialConfig.method === "written" ? "bg-blue-600 text-white" : subTextColor}`}
                >
                  <Type size={14} /> Yozish
                </button>
                <button
                  onClick={() =>
                    setSpecialConfig({ ...specialConfig, method: "image" })
                  }
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${specialConfig.method === "image" ? "bg-blue-600 text-white" : subTextColor}`}
                >
                  <Camera size={14} /> Rasm
                </button>
              </div>
              <p className="text-[10px] mt-3 text-orange-400">
                {specialConfig.method === "image"
                  ? "O'quvchi 36-45 javoblarini 1 ta rasmda yuboradi"
                  : "Har bir savol uchun matnli javob kiritiladi"}
              </p>
            </div>

            {specialConfig.method === "written" && (
              <div className="space-y-4">
                {specialConfig.questions.map((q, idx) => (
                  <div key={q.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${textColor}`}>
                        {q.id}-savol
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-1 rounded ${cardBg} ${textColor}`}
                        >
                          <Minus size={12} />
                        </button>
                        <span className={`text-xs ${textColor}`}>
                          {q.answerCount}
                        </span>
                        <button
                          className={`p-1 rounded ${cardBg} ${textColor}`}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Javoblarni kiriting (masalan: a, b)"
                      className={`w-full p-3 rounded-xl border text-xs outline-none ${inputBg} ${textColor}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Fixed Save Button */}
          <div
            className={`fixed bottom-0 left-0 right-0 p-4 border-t ${isDark ? "bg-[#0f172a] border-white/10" : "bg-white border-gray-100"} z-50`}
          >
            <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-green-600/20">
              <Save size={20} /> Testni yakunlash
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateTest;
