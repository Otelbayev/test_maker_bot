import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Users, User2Icon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authData, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white shadow px-4 py-2 flex items-center justify-between" // justify-between qildik
      >
        {/* 1. Chap tomon: Logout tugmasi */}
        <motion.button
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl transition"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Chiqish</span>
        </motion.button>

        {/* 2. O'ng tomon: User info va Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right leading-tight">
            <div className="text-sm font-semibold text-gray-800">
              {authData.username || "Foydalanuvchi"}
            </div>

            <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
              <span>ID: {authData.chatId}</span>

              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
              ${
                authData.role === "teacher"
                  ? "bg-blue-100 text-blue-600 border border-blue-200"
                  : "bg-emerald-100 text-emerald-600 border border-emerald-200"
              }`}
              >
                {authData.role}
              </span>
            </div>
          </div>

          {/* Profile button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 transition shadow-sm"
          >
            <User2Icon className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      {authData.role === "teacher" && (
        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-inner p-2 pb-4 flex justify-around"
        >
          <button
            onClick={() => navigate("/teacher")}
            className={`flex flex-col items-center p-2 rounded-xl text-gray-700 ${
              isActive("/teacher") ? "text-white bg-gray-400" : ""
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-xs mt-1">Bosh sahifa</span>
          </button>
          <button
            onClick={() => navigate("/students")}
            className={`flex flex-col items-center p-2 rounded-xl text-gray-700 ${
              isActive("/students") ? "text-white bg-gray-400" : ""
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-xs mt-1">O'quvchilar</span>
          </button>
        </motion.footer>
      )}
    </div>
  );
};

export default Layout;
