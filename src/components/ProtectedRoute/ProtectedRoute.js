import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
	const user = useSelector((state) => state.auth.user);

	if (!user) return <Navigate to="/" replace />;

	if (props.roles.indexOf(user.role) < 0) return <Navigate to="/" replace />;

	return props.children;
};

export default ProtectedRoute;
