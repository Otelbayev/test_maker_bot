import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const Layout = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow p-2 flex items-center gap-2"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-sm font-semibold text-gray-800">Sahifa</h1>
      </motion.header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      {true && (
        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-inner p-2 flex justify-around"
        >
          <button
            onClick={() => navigate("/teacher")}
            className={`flex flex-col items-center p-2 rounded-xl text-gray-700 ${
              isActive("/teacher") ? "text-white bg-gray-400 font-bold" : ""
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-sm mt-1">Bosh sahifa</span>
          </button>
          <button
            onClick={() => navigate("/students")}
            className={`flex flex-col items-center p-2 rounded-xl text-gray-700 ${
              isActive("/students") ? "text-white bg-gray-400 font-bold" : ""
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm mt-1">O'quvchilar</span>
          </button>
        </motion.footer>
      )}
    </div>
  );
};

export default Layout;
