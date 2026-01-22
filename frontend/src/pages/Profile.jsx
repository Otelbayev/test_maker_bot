import { motion } from "framer-motion";
import { User, Users, GraduationCap, ChartCandlestick } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { authData, updateAuthData, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(authData.role);
    window.location.href = `/${authData.role}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
          <Users className="w-6 h-6" />
          Profil ma’lumotlari
        </h2>

        {/* First Name */}
        <div>
          <label className="text-sm font-medium">Ism</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="firstName"
              required
              value={authData.firstName}
              onChange={(e) => updateAuthData("firstName", e.target.value)}
              placeholder="Ismingiz"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium">Familiya</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              name="lastName"
              required
              value={authData.lastName}
              onChange={(e) => updateAuthData("lastName", e.target.value)}
              placeholder="Familiyangiz"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium block mb-2">Rol</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={(e) => updateAuthData("role", "student")}
              className={`flex items-center justify-center gap-2 border rounded-xl py-2 transition
                ${
                  authData.role === "student"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              <GraduationCap className="w-5 h-5" />
              Student
            </button>

            <button
              type="button"
              onClick={(e) => updateAuthData("role", "teacher")}
              className={`flex items-center justify-center gap-2 border rounded-xl py-2 transition
                ${
                  authData.role === "teacher"
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              <ChartCandlestick className="w-5 h-5" />
              Teacher
            </button>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-black text-white py-2 rounded-xl font-medium"
        >
          Saqlash
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Profile;
