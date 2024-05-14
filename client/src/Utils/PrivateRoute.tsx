import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../Types/Types";
import { clearStore } from "../Redux/user";

interface PrivateRouteProps {
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role }) => {
  const userAuthenticated = !!localStorage.getItem("token");
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: { user: userState }) => state.user.admin);

  const sameRole =
    isAdmin && role === "admin"
      ? true
      : !isAdmin && role === "user"
      ? true
      : false;

  useEffect(() => {
    if (!userAuthenticated || !sameRole) {
      setTimeout(() => {
        toast.error("please login");
      }, 1000);
      dispatch(clearStore());
      localStorage.removeItem("token");
    }
  }, [userAuthenticated, sameRole, dispatch]);

  if (!userAuthenticated || !sameRole) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  return <Outlet />;
};

export default React.memo(PrivateRoute);
