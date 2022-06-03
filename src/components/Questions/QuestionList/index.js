import React from "react";
import { useSelector } from "react-redux";
import Question from "../Question";

export default function QuestionList(props) {
	const questions = useSelector((state) => state.questions.questions);
	console.log(questions);

	return (
		<div className="container-lg">
			{questions.map((q) => (
				<Question
					key={q.questionId}
					index={questions.indexOf(q) + 1}
					question={q}
				/>
			))}
		</div>
	);
}
