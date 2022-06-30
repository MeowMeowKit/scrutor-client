import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { questionsActions } from "../../../utils/questionsSlice";
import "./Question.scss";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Question(props) {
	const question = props.question;

	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [cookies, setCookie] = useCookies(["userId"]);

	useEffect(() => {
		let content = document.querySelector(
			`[id="${props.question.questionId}"] .content`
		);

		if (content.scrollHeight > content.clientHeight) {
			content.classList.add("overflow");
		}

		let tags = document.querySelector(
			`[id="${props.question.questionId}"] .tags`
		);

		if (tags.scrollHeight > tags.clientHeight) {
			tags.classList.add("overflow");
		}
	});

	const onDeleteQuestion = (id) => {
		axios({
			method: "delete",
			headers: {
				userId: user.userId,
			},
			url: `http://localhost:8080/scrutor_server_war_exploded/questions/${id}`,
		}).then((res, err) => {
			if (res.data > 0) dispatch(questionsActions.remove({ id }));
		});
	};

	return (
		<div
			onClick={() => {
				if (props.mode !== "fixed")
					navigate(`/questions/${question.questionId}/edit`);
			}}
			className="question row align-items-center"
			id={question.questionId}
		>
			<div className="col-auto pe-3">
				<input
					type="checkbox"
					className=""
					checked={props.isChecked}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={(e) => {
						// e.stopPropagation();
						props.toggleIsChecked();
					}}
				/>
			</div>
			<div className="col-4 col-md-5 col-lg-7 ps-4 pe-4">
				<p className="content">{question.content}</p>
			</div>

			<div className="d-none d-md-block col-2 col-lg-2 ps-4 pe-4">
				<p className="tags">
					{question.tags.map((tag, i) => {
						let str = tag.name;
						str += i !== question.tags.length - 1 ? ", " : "";
						return str;
					})}
				</p>
			</div>

			<div className="difficulty col-1 ">
				<p className="text-start">
					{question.difficulty} <i className="fa-solid fa-star"></i>
				</p>
			</div>

			<div className="buttons col-3 col-md-1 col-lg-1 d-flex justify-content-end">
				<button className="btn btn-warning me-2">
					<i className="fa-solid fa-pen-to-square"></i>
				</button>
				<button
					className="btn btn-danger"
					onClick={(e) => {
						e.stopPropagation();
						onDeleteQuestion(question.questionId);
					}}
				>
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	);
}
