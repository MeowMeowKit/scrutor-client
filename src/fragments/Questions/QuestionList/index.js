import React from "react";
import { Link } from "react-router-dom";
import Question from "../Question";
import "./QuestionList.scss";

export default function QuestionList(props) {
	return (
		<div className="container-lg">
			<Link
				type="button"
				className="add-question-btn btn mb-4"
				to="/questions/new"
			>
				+ Tạo câu hỏi
			</Link>
			<div className="row table-header">
				<div className="col-auto pe-3"></div>
				<div className="col-4 col-md-5 col-lg-7 ps-4 pe-4">
					<h6>Nội dung</h6>
				</div>
				<div className="d-none d-md-block col-2 col-lg-2 ps-4 pe-4">
					<h6>Thẻ</h6>
				</div>
				<div className="difficulty col-auto p-0">
					<h6>Độ khó</h6>
				</div>
				<div className="buttons col-4 col-md-2 col-lg-2 d-flex justify-content-end"></div>
			</div>
			{props.questions.map((q, i) => (
				<Question
					mode={props.mode}
					key={q.questionId}
					index={props.questions.indexOf(q) + 1}
					question={q}
					isChecked={q.isChecked}
					toggleIsChecked={() => {
						const newQuestions = props.questions.map((q, index) => {
							if (index === i) return { ...q, isChecked: !q.isChecked };
							else return q;
						});
						props.setQuestions(newQuestions);
					}}
				/>
			))}
		</div>
	);
}
