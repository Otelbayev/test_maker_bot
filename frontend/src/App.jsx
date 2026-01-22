import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout/layout";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/teacher" element={<div>Teacher Page</div>} />
          <Route path="/student" element={<div>Student Page</div>} />
          <Route path="/students" element={<div>Students Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
