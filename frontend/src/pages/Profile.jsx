import { motion } from "framer-motion";
import {
  User,
  Users,
  GraduationCap,
  Briefcase,
  Save,
  ChevronLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/axios";
import { useNavigate, useOutletContext } from "react-router-dom";

const Profile = () => {
  const { authData, updateAuthData } = useAuth();
  const { isDark } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/auth/update", { ...authData });
      navigate(`/${authData.role}`);
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 relative min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        {/* Orqaga qaytish tugmasi */}
        <button
          onClick={() => navigate(-1)}
          className={`
    flex items-center gap-1 mb-6 transition-all duration-300 font-medium group
    ${
      isDark
        ? "text-gray-400 hover:text-white"
        : "text-gray-500 hover:text-blue-600"
    }
  `}
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Orqaga</span>
        </button>

        <form
          onSubmit={handleSubmit}
          className={`backdrop-blur-xl border rounded-[2.5rem] p-8 shadow-2xl space-y-6 transition-all duration-500 ${
            isDark
              ? "bg-white/5 border-white/10 shadow-black/40"
              : "bg-white border-gray-100 shadow-gray-200/50"
          }`}
        >
          {/* Sarlavha qismi */}
          <div className="text-center space-y-2">
            <div
              className={`inline-flex p-4 rounded-2xl mb-2 transition-colors duration-500 ${
                isDark
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <Users size={32} />
            </div>
            <h2
              className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-800"} `}
            >
              Profil sozlamalari
            </h2>
            <p
              className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm font-medium`}
            >
              Ma'lumotlaringizni yangilang
            </p>
          </div>

          <div className="space-y-4">
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
    text-[10px] font-extrabold ml-1 uppercase tracking-[0.15em] transition-colors duration-500
    ${isDark ? "text-gray-500" : "text-gray-400"}
  `}
              >
                Siz kimsiz?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <RoleOption
                  active={authData.role === "student"}
                  onClick={() => updateAuthData("role", "student")}
                  icon={<GraduationCap size={20} />}
                  label="O'quvchi"
                  isDark={isDark}
                />
                <RoleOption
                  active={authData.role === "teacher"}
                  onClick={() => updateAuthData("role", "teacher")}
                  icon={<Briefcase size={20} />}
                  label="O'qituvchi"
                  isDark={isDark}
                />
              </div>
            </div>
          </div>

          {/* Saqlash tugmasi */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all mt-4"
          >
            <Save size={20} />
            Saqlash
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

/* Yordamchi komponent: Input */
const InputField = ({ label, value, onChange, placeholder, isDark }) => (
  <div className="group">
    <label
      className={`
    text-[10px] font-extrabold ml-1 uppercase tracking-[0.2em] transition-colors duration-500
    ${isDark ? "text-gray-500" : "text-gray-400"}
  `}
    >
      {label}
    </label>
    <div className="relative mt-1">
      <User
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
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
        className={`w-full border pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${
          isDark
            ? "bg-white/5 border-white/5 text-white focus:ring-blue-500/20 focus:border-blue-500/50 placeholder:text-gray-600"
            : "bg-gray-50 border-gray-100 text-gray-800 focus:ring-blue-500/10 focus:border-blue-200 placeholder:text-gray-400"
        }`}
      />
    </div>
  </div>
);

/* Yordamchi komponent: Rol tanlash */
const RoleOption = ({ active, onClick, icon, label, isDark }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all duration-300 font-bold ${
      active
        ? isDark
          ? "bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/20"
          : "bg-blue-50 border-blue-600 text-blue-600 shadow-md"
        : isDark
          ? "bg-transparent border-white/5 text-gray-500 hover:border-white/20"
          : "bg-transparent border-gray-100 text-gray-400 hover:border-gray-200"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Profile;
