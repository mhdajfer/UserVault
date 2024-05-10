import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/User/LoginPage";
import SignupPage from "./Pages/User/SignUpPage";
import Homepage from "./Pages/User/HomePage";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./Utils/PrivateRoute";
import AdminRoutes from "./Routes/AdminRoutes";
import UserProfile from "./Pages/User/UserProfile";

function App() {
  return (
    <>
      <div className="bg-[#FFF5E0] min-h-screen w-full">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route element={<PrivateRoute role="user" />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
