import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

export const PrivateRoute = () => {
  const userAuthenticated = localStorage.getItem("token") ? true : false;

  if (!userAuthenticated) {
    setTimeout(() => {
      toast.error("please login");
    }, 1000);
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
