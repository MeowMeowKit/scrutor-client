import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
	const user = useSelector((state) => state.auth.user);

	const [cookies, setCookie, removeCookie] = useCookies(["userId", "role"]);

	if (!user && !cookies.userId) return <Navigate to="/" replace />;

	if (props.roles.indexOf(cookies.role) < 0) return <Navigate to="/" replace />;

	return props.children;
};

export default ProtectedRoute;
