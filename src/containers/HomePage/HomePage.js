import React from "react";
import { useSelector } from "react-redux";
import StudentHomePage from "../StudentHomePage/StudentHomePage";
import TeacherHomePage from "../TeacherHomePage/TeacherHomePage";

export const HomePage = () => {
	const user = useSelector((state) => state.auth.user);

	return user ? (
		user.role === "student" ? (
			<StudentHomePage />
		) : (
			<TeacherHomePage />
		)
	) : (
		<div></div>
	);
};
