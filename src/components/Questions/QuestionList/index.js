import React from "react";
import Question from "../Question";

const DUMMY_QUESTIONS = [
	{
		id: "1",
		content: "Which method ",
		tags: ["prj301", "servlet", "http", "chap 1", "report generator servlet"],
		difficulty: 50,
	},
	{
		id: "2",
		content:
			"Which method of ReportGeneratorServlet will be called when the user clicks on the URL shown by the following HTML. Assume that ReportGeneratorServlet does not override the service",
		tags: ["prj301"],
		difficulty: 50,
	},
];

export default function QuestionList() {
	return (
		<div className="container-lg ps-4 pe-4">
			{DUMMY_QUESTIONS.map((q) => (
				<Question
					key={q.id}
					id={DUMMY_QUESTIONS.indexOf(q) + 1}
					content={q.content}
					tags={q.tags}
					difficulty={q.difficulty}
				/>
			))}
		</div>
	);
}
