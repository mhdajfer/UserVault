import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="home" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default AdminRoutes;
