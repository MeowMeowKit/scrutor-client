import React, { useEffect, useRef, useState } from "react";
import "./QuestionEditPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../../utils/questionsSlice";
import { v4 as uuidv4 } from "uuid";
import { QuestionEdit } from "../../../fragments/Questions/QuestionEdit";

export default function QuestionEditPage() {
	let { questionId } = useParams();

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const questions = useSelector((state) => state.questions.questions);
	const [question, setQuestion] = useState({
		questionId: uuidv4(),
		content: "",
		type: "SAMC",
		difficulty: 0,
		teacherId: "teacher1",
		options: [],
		tags: [],
	});

	useEffect(() => {
		// console.log(3);
		questions.map((q) => {
			if (q.questionId === questionId) {
				setQuestion(q);
			}
		});
	}, []);

	const onSubmit = (question) => {
		if (location.pathname.includes("new")) {
			dispatch(
				questionsActions.add({
					question: question,
				})
			);
		} else {
			dispatch(
				questionsActions.update({
					id: questionId,
					newQuestion: question,
				})
			);
		}
		navigate("../");
	};

	return (
		<div className="question-edit-page">
			<div className="container-lg">
				{location.pathname.includes("new") ? (
					<h1>Tạo câu hỏi</h1>
				) : (
					<h1>Chỉnh sửa câu hỏi</h1>
				)}
			</div>
			<div className="box container-lg">
				<QuestionEdit
					question={question}
					setQuestion={setQuestion}
					action={location.pathname.includes("new") ? "create" : "update"}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	);
}
