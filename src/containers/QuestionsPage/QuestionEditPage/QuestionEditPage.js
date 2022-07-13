import React, { useEffect, useState } from "react";
import "./QuestionEditPage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../../utils/questionsSlice";

import { QuestionEdit } from "../../../fragments/Questions/QuestionEdit/QuestionEdit";
import axios from "axios";

export default function QuestionEditPage() {
	const user = useSelector((state) => state.auth.user);
	let { questionId } = useParams();

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const questions = useSelector((state) => state.questions.questions);
	const [question, setQuestion] = useState({
		questionId: null,
		content: "",
		type: "SAMC",
		difficulty: 0,
		teacherId: null,
		options: [],
		tags: [],
	});

	useEffect(() => {
		questions.map((q) => {
			if (q.questionId === questionId) {
				setQuestion(q);
			}
		});
	}, []);

	const onSubmit = (question) => {
		if (location.pathname.includes("new")) {
			axios({
				method: "post",
				url: "http://localhost:8080/scrutor_server_war_exploded/questions/",
				headers: {
					userId: user.userId,
				},
				data: {
					content: question.content,
					type: question.type,
					difficulty: question.difficulty,
					tags: question.tags,
					options: question.options,
				},
			}).then((res, err) => {
				dispatch(questionsActions.add({ question: res.data }));
				navigate("../");
			});
		} else {
			axios({
				method: "put",
				url: `http://localhost:8080/scrutor_server_war_exploded/questions/${question.questionId}`,
				headers: {
					userId: user.userId,
				},
				data: {
					questionId: question.questionId,
					content: question.content,
					type: question.type,
					difficulty: question.difficulty,
					tags: question.tags,
					options: question.options,
				},
			}).then((res) => {
				dispatch(
					questionsActions.update({
						id: questionId,
						newQuestion: res.data,
					})
				);
				navigate("../");
			});
		}
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
