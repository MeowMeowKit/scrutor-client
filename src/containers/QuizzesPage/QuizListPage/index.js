import React from "react";
import QuizList from "../../../components/Quizzes/QuizList";

export default function QuizListPage() {
	return (
		<>
			<div className="container-lg">
				<h1 className="title">Bài kiểm tra</h1>
			</div>
			<div className="container-lg">
				<QuizList />
			</div>
		</>
	);
}
