import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher" element={<div>Teacher Page</div>} />
        <Route path="/student" element={<div>Student Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}
