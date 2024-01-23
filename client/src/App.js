import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GenerateVideo from "./pages/GenerateVideo";
import CustomVideo from "./pages/CustomVideo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Testing from "./components/Testing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/hello" element={<GenerateVideo />} />
      <Route path="/custom-video" element={<CustomVideo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/testing" element={<Testing />} />
    </Routes>
  );
}

export default App;
