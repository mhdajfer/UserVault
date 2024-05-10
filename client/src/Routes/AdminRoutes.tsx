import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import { PrivateRoute } from "../Utils/PrivateRoute";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<PrivateRoute role="admin" />}>
          <Route path="home" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
