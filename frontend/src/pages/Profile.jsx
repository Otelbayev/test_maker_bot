import { motion } from "framer-motion";
import { User, Users, GraduationCap, Briefcase, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useMode } from "../context/ModeContext";

const Profile = () => {
  const { authData, updateAuthData } = useAuth();
  const { isDark } = useMode();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await api.put("/auth/update", { ...authData });
      navigate(`/${authData.role}`);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="flex items-center justify-center relative min-h-[85vh] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-95" // Mobil uchun kenglik cheklandi
      >
        <form
          onSubmit={handleSubmit}
          className={`backdrop-blur-xl border rounded-4xl p-6 sm:p-8 shadow-2xl space-y-5 transition-all duration-500 ${
            isDark
              ? "bg-white/5 border-white/10 shadow-black/40"
              : "bg-white border-gray-100 shadow-gray-200/50"
          }`}
        >
          {/* Sarlavha qismi - Mobilga moslangan */}
          <div className="text-center space-y-1.5">
            <div
              className={`inline-flex p-3 rounded-xl mb-1 transition-colors duration-500 ${
                isDark
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <Users size={24} /> {/* Icon kichraytirildi */}
            </div>
            <h2
              className={`text-xl font-extrabold ${isDark ? "text-white" : "text-gray-800"} `}
            >
              Profil sozlamalari
            </h2>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs font-medium`}
            >
              Ma'lumotlaringizni yangilang
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Ism Input */}
            <InputField
              label="Ism"
              value={authData.firstName}
              onChange={(val) => updateAuthData("firstName", val)}
              placeholder="Ismingiz"
              isDark={isDark}
            />

            {/* Familiya Input */}
            <InputField
              label="Familiya"
              value={authData.lastName}
              onChange={(val) => updateAuthData("lastName", val)}
              placeholder="Familiyangiz"
              isDark={isDark}
            />

            {/* Rol tanlash */}
            <div className="space-y-2">
              <label
                className={`
                  text-[9px] font-extrabold ml-1 uppercase tracking-widest transition-colors duration-500
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
              >
                Siz kimsiz?
              </label>
              <div className="grid grid-cols-2 gap-1">
                <RoleOption
                  active={authData.role === "student"}
                  onClick={() => updateAuthData("role", "student")}
                  icon={<GraduationCap size={18} />}
                  label="Test topshiruvchi"
                  isDark={isDark}
                />
                <RoleOption
                  active={authData.role === "teacher"}
                  onClick={() => updateAuthData("role", "teacher")}
                  icon={<Briefcase size={18} />}
                  label="Test yaratuvchi"
                  isDark={isDark}
                />
              </div>
            </div>
          </div>

          {/* Saqlash tugmasi - Ixchamroq */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all mt-2 text-sm"
          >
            <Save size={18} />
            Saqlash
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

/* Yordamchi komponent: Input - Balandligi va paddingi kichraytirildi */
const InputField = ({ label, value, onChange, placeholder, isDark }) => (
  <div className="group">
    <label
      className={`
        text-[9px] font-extrabold ml-1 uppercase tracking-widest transition-colors duration-500
        ${isDark ? "text-gray-500" : "text-gray-400"}
      `}
    >
      {label}
    </label>
    <div className="relative mt-1">
      <User
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
          isDark
            ? "text-gray-600 group-focus-within:text-blue-400"
            : "text-gray-400 group-focus-within:text-blue-500"
        }`}
      />
      <input
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-4 transition-all duration-300 ${
          isDark
            ? "bg-white/5 border-white/5 text-white focus:ring-blue-500/10 focus:border-blue-500/40 placeholder:text-gray-600"
            : "bg-gray-50 border-gray-100 text-gray-800 focus:ring-blue-500/5 focus:border-blue-200 placeholder:text-gray-400"
        }`}
      />
    </div>
  </div>
);

/* Yordamchi komponent: Rol tanlash - Padding va text kichraytirildi */
const RoleOption = ({ active, onClick, icon, label, isDark }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all duration-300 font-bold text-xs ${
      active
        ? isDark
          ? "bg-blue-500/20 border-blue-500 text-white shadow-md shadow-blue-500/10"
          : "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
        : isDark
          ? "bg-transparent border-white/5 text-gray-500"
          : "bg-transparent border-gray-100 text-gray-400"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Profile;
