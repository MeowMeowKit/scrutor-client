import React, { useEffect } from "react";
import "./Question.scss";

export default function Question(props) {
	useEffect(() => {
		let content = document.querySelector(`[id="${props.id}"] .content`);

		if (content.scrollHeight > content.clientHeight) {
			content.classList.add("overflow");
		}

		let tags = document.querySelector(`[id="${props.id}"] .tags`);

		if (tags.scrollHeight > tags.clientHeight) {
			tags.classList.add("overflow");
		}

		console.log(tags.scrollHeight);
		console.log(tags.clientHeight);
	});

	return (
		<div className="question row align-items-center" id={props.id}>
			<div className="d-flex col-1 col-lg">
				<input type="checkbox" className="" />
			</div>
			<p className="col">{props.id}</p>
			<div className="col-4 col-md-5 col-lg-7 ps-2 pe-2">
				<p className="content">{props.content}</p>
			</div>
			<div className="d-none d-md-block col-2 col-lg-2 ps-2 pe-2">
				<p className="tags">
					{props.tags.map((tag) => {
						let str = tag;
						str +=
							props.tags.indexOf(tag) !== props.tags.length - 1 ? ", " : "";
						return str;
					})}
				</p>
			</div>
			<p className="difficulty col-1 col-lg-1 ps-2 pe-2">
				{props.difficulty} <i className="fa-solid fa-star"></i>
			</p>
			<div className="buttons col-4 col-md-2 col-lg-1 d-flex justify-content-end">
				<button className="btn btn-warning me-2">
					<i className="fa-solid fa-pen-to-square"></i>
				</button>
				<button className="btn btn-danger">
					<i className="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	);
}
