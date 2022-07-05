import React from "react";
import { Link } from "react-router-dom";
import QuizList from "../../../fragments/Quizzes/QuizList/QuizList";

export default function QuizListPage() {
	return (
		<>
			<div className="container-lg">
				<h1 className="title d-inline-block">Bài kiểm tra</h1>
				<Link
					type="button"
					className="add-question-btn d-inline-block btn ms-3"
					to="/quizzes/new"
				>
					+ Tạo bài kiểm tra
				</Link>
			</div>

			<div className="container-lg">
				<QuizList />
			</div>
		</>
	);
}
