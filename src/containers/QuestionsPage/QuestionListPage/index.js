import React from "react";
import "./QuestionListPage.scss";
import QuestionList from "../../../fragments/Questions/QuestionList";

export default function QuestionListPage() {
	return (
		<>
			<div className="container-lg">
				<h1 className="title">Câu hỏi</h1>
			</div>
			<div className="box container-lg">
				<QuestionList />
			</div>
		</>
	);
}
