import { Outlet, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import React from "react";
import { useSelector } from "react-redux";
import { userState } from "../Types/Types";

interface PrivateRouteProps {
  role: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ role }) => {
  const userAuthenticated = localStorage.getItem("token") ? true : false;
  const isAdmin = useSelector((state: { user: userState }) => state.user.admin);

  //check whether authenticated user and role(route trying to access) are the same
  const sameRole =
    isAdmin && role == "admin"
      ? true
      : !isAdmin && role == "user"
      ? true
      : false;

  if (!userAuthenticated || !sameRole) {
    setTimeout(() => {
      toast.error("please login");
    }, 1000);
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
