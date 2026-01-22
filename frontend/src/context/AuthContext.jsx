import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    chatId: 9879879879,
    firstName: "",
    lastName: "",
    username: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      setAuthData((prev) => ({
        ...prev,
        chatId: user.id,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        username: user.username || "",
      }));
    }
  }, []);

  const login = async (role) => {
    try {
      const payload = { ...authData, role };
      const res = await api.post("/auth/login", payload);

      setAuthData(res.data.user);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      console.error("Login xatosi:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthData({
      chatId: null,
      firstName: "",
      lastName: "",
      username: "",
      role: "",
    });
    window.location.href = "/";
  };

  const getData = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setAuthData(res.data.user);
    } catch (err) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    } else {
      setLoading(false);
    }
  }, [getData]);

  return (
    <AuthContext.Provider value={{ authData, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
