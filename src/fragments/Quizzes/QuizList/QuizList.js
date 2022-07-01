import React from "react";
import { useSelector } from "react-redux";
import Quiz from "../Quiz/Quiz";

export default function QuizList() {
	const quizzes = useSelector((state) => state.quizzes.quizzes);

	return (
		<div>
			{quizzes.map((quiz, index) => {
				return <Quiz key={quiz.quizId} quiz={quiz} />;
			})}
		</div>
	);
}
