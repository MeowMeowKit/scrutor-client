import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHomePage.scss";

export default function StudentHomePage() {
	let navigate = useNavigate();

	const [quizId, setQuizId] = useState("");

	const onChangeQuizId = (e) => {
		setQuizId(e.target.value);
	};

	const [classId, setClassId] = useState("");

	const onChangeClassId = (e) => {
		setClassId(e.target.value);
	};

	const onAttemptQuiz = () => {
		navigate(`quizzes/${quizId}/attempt`);
	};

	return (
		<div className="student-home-page container-lg box">
			<div className="mb-3">
				<h5>Làm bài kiểm tra</h5>
				<input
					type="text"
					className="d-inline-block form-control w-25 me-3"
					onChange={(e) => {
						onChangeQuizId();
					}}
				/>
				<button
					type="button"
					className="btn"
					onClick={() => {
						onAttemptQuiz();
					}}
				>
					Làm bài
				</button>
			</div>
			<div>
				<h5>Tham gia lớp học</h5>
				<input
					type="text"
					className="d-inline-block form-control w-25 me-3"
					onChange={(e) => {
						onChangeClassId();
					}}
				/>
				<button type="button" className="btn">
					Tham gia
				</button>
			</div>
		</div>
	);
}
