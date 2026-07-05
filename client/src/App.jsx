import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import { Register } from "./Components/Auth/Register.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
