import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout/layout";
import Profile from "./pages/Profile";
import Students from "./pages/Students";
import StudentDashboard from "./pages/StudentDashboard";
import Tests from "./pages/Tests";
import CreateTest from "./pages/CreateTest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/tests" element={<Tests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createtest" element={<CreateTest />} />
          <Route path="/teacher" element={<div>Teacher Page</div>} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/students" element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
