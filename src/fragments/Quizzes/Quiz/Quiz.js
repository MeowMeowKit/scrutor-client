import React from "react";
import { Link } from "react-router-dom";
import "./Quiz.scss";

export default function Quiz(props) {
	const quiz = props.quiz;

	return (
		<Link to={`./${quiz.quizId}/edit`} className="quiz">
			<div className="quiz-header">
				<button className="quiz-delete-btn" type="button">
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
			<div className="content">
				<h5 className="title">{quiz.title}</h5>
				<p className="sub-title">{quiz.description}</p>
				<p className="sub-title">{`${quiz.questions.length} câu`}</p>
			</div>
		</Link>
	);
}
