import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./AttemptDetailPage.scss";

export default function AttemptDetailPage(props) {
	const { attemptId } = useParams();
	const attempts = useSelector((state) => state.attempts.attempts);

	const [attempt, setAttempt] = useState({
		attemptId: null,
		quiz: null,
		studentId: null,
		grade: 0,
	});

	useEffect(() => {
		attempts.map((a) => {
			if (a.attemptId === attemptId) {
				setAttempt({ ...a });
			}
		});
	}, []);

	useEffect(() => {
		attempts.map((a) => {
			if (a.attemptId === attemptId) {
				setAttempt({ ...a });
			}
		});
	}, [attempts]);

	return (
		<div className="question-edit">
			<div className="container-lg box mb-3 ">
				<div className="position-relative">
					<div className="quiz-info">
						<h2>{attempt.quiz?.title}</h2>
						<h4>
							Điểm: {attempt.grade}/{attempt.maxGrade}
						</h4>
						<p>{attempt.quiz?.description}</p>
					</div>
				</div>
			</div>
			{attempt.quiz?.questions.map((question, indexQuestion) => (
				<div className="container-lg box mb-3" key={indexQuestion}>
					<form>
						<h5 className="d-inline-block me-4">Câu {indexQuestion + 1}</h5>
						<div className="mb-2 d-inline-block">
							<div className="d-inline-block me-4">
								<p className="d-inline-block m-0 p-0 me-1">
									Độ khó: {question.difficulty}
								</p>
								<i className="fa-solid fa-star"></i>
							</div>
							<div className="d-inline-block">
								<p className="d-inline-block m-0 p-0 me-1">
									Điểm: {question.point}
								</p>
								<i className="fa-solid fa-star"></i>
							</div>
						</div>

						<div className="mt-3 mb-2">
							<p className="">{question.content}</p>
						</div>

						{/* Render fill answer */}
						{question.type === "F" && question.options.length > 0 ? (
							<div>
								<textarea
									className="form-control p-2"
									placeholder="Câu trả lời cho câu hỏi tự luận"
									style={{ height: "8rem" }}
									value={question.fillAnswer}
								></textarea>
								<p
									className={`option correct ${
										question.fillAnswer === question.options[0].content
											? "checked"
											: ""
									}`}
								>
									{question.options[0].content}
								</p>
							</div>
						) : (
							""
						)}

						{/* Render option list */}
						{question.options?.map((o, indexOption) => {
							if (question.type === "SAMC")
								return (
									<div
										key={indexOption}
										className={`option mb-2 ${indexOption > 0 ? "mt-2" : ""} ${
											o.isCorrect ? "correct" : ""
										} ${o.isChecked ? "checked" : ""}`}
									>
										<input
											className="d-inline-block me-2"
											id={`${question.questionId}_${indexOption}`}
											type="radio"
											name="option"
											checked={o.isChecked}
										/>
										<p className="d-inline-block m-0">{o.content}</p>
									</div>
								);
							else if (question.type === "MAMC")
								return (
									<div
										key={indexOption}
										className={`option mt-2 mb-2 ${
											o.isCorrect ? "correct" : ""
										} ${o.isChecked ? "checked" : ""}`}
									>
										<input
											className="d-inline-block me-2"
											id={`${question.questionId}_${indexOption}`}
											type="checkbox"
											name="option"
											checked={o.isChecked}
										/>

										<p className="d-inline-block m-0">{o.content}</p>
									</div>
								);
						})}
					</form>
				</div>
			))}
		</div>
	);
}
