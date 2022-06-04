import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Question.scss";

export default function Question(props) {
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

	return (
		<Link
			to={`./${props.question.questionId}/edit`}
			className="question row align-items-center"
			id={props.question.questionId}
		>
			<div className="col-auto pe-3">
				<input type="checkbox" className="" />
			</div>
			<div className="col-4 col-md-5 col-lg-7 ps-4 pe-4">
				<p className="content">{props.question.content}</p>
			</div>

			<div className="d-none d-md-block col-2 col-lg-2 ps-4 pe-4">
				<p className="tags">
					{props.question.tags.map((tag) => {
						let str = tag;
						str +=
							props.question.tags.indexOf(tag) !==
							props.question.tags.length - 1
								? ", "
								: "";
						return str;
					})}
				</p>
			</div>

			<div className="difficulty col-auto ">
				<p>
					{props.question.difficulty} <i className="fa-solid fa-star"></i>
				</p>
			</div>

			<div className="buttons col-4 col-md-2 col-lg-2 d-flex justify-content-end">
				<button className="btn btn-warning me-2">
					<i className="fa-solid fa-pen-to-square"></i>
				</button>
				<button className="btn btn-danger">
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
		</Link>
	);
}
