import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";
import Homepage from "./Pages/HomePage";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./Utils/PrivateRoute";

function App() {
  return (
    <>
      <div className="bg-[#FFF5E0] min-h-screen w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Homepage />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
