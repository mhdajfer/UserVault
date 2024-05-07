import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";
import { HomePage } from "./Pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="bg-[#FFF5E0] min-h-screen w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
