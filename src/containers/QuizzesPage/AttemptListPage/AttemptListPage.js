import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AttemptListPage.scss";

export default function AttemptListPage() {
	const attempts = useSelector((state) => state.attempts.attempts);

	return (
		<div className="attempt-list-page">
			<div className="container-lg">
				{attempts.map((a, index) => (
					<Link to={`./${a.attemptId}`} key={index} className="attempt">
						<div className="attempt-header">
							<button className="attempt-delete-btn" type="button">
								<i className="fa-solid fa-xmark"></i>
							</button>
						</div>
						<div className="content">
							<h5 className="title">{a.quiz.title}</h5>
							<p className="sub-title">
								Điểm: {a.grade}/{a.maxGrade}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
