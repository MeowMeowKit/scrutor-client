import React from "react";
import "./QuestionListPage.scss";
import QuestionList from "../../../fragments/Questions/QuestionList";
import { useSelector } from "react-redux";

export default function QuestionListPage() {
	const questions = useSelector((state) => state.questions.questions);

	return (
		<>
			<div className="container-lg">
				<h1 className="title">Câu hỏi</h1>
			</div>
			<div className="box container-lg">
				<QuestionList questions={questions} />
			</div>
		</>
	);
}
