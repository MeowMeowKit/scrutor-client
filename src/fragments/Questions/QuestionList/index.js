import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Question from "../Question";
import "./QuestionList.scss";

export default function QuestionList(props) {
	const questions = useSelector((state) => state.questions.questions);

	const navigate = useNavigate();

	return (
		<div className="container-lg">
			{/* <div className="row">
				<div className="col-auto pe-3"></div>
				<div className="col-4 col-md-5 col-lg-7 ps-4 pe-4">
					<button type="button" className="add-question-btn btn mb-4">
						+ Tạo câu hỏi
					</button>
				</div>
			</div> */}
			<Link type="button" className="add-question-btn btn mb-4" to="./new">
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
