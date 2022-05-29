import React from "react";
import "./QuestionPage.scss";
import QuestionList from "../../../components/Questions/QuestionList";

export default function QuestionPage() {
	return (
		<div className="body pt-4">
			<div className="question-page container-lg">
				<h1 className="title">Câu hỏi</h1>
				<QuestionList />
			</div>
		</div>
	);
}
