import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import PrivateRoute from "../Utils/PrivateRoute";
import AdminProfile from "../Pages/Admin/AdminProfile";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<PrivateRoute role="admin" />}>
          <Route path="profile" element={<AdminProfile />} />
          <Route path="home" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
