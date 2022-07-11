import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { attemptsActions } from "../../../utils/attemptsSlice";
import "./QuizAttemptPage.scss";

export default function QuizAttemptPage(props) {
	let { quizId } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const [quiz, setQuiz] = useState({
		quizId: null,
		title: "",
		description: "",
		teacherId: "teacher1",
		startAt: new Date(),
		endAt: new Date(),
		time: 0,
		questions: [],
	});

	useEffect(() => {
		if (user) {
			axios({
				method: "get",
				url: `http://localhost:8080/scrutor_server_war_exploded/quizzes/${quizId}`,
				headers: {
					userId: user.userId,
					role: user.role,
				},
			}).then((res) => {
				console.log(res.data);
				if (res.data) {
					setQuiz({
						quizId: res.data.quizId,
						teacherId: res.data.teacherId,
						title: res.data.title,
						description: res.data.description,
						questions: res.data.questions.map((q) => {
							let options = q.options.map((o) => ({ ...o, isChecked: false }));
							return { ...q, options, fillAnswer: null };
						}),
					});
				}
			});
		}
	}, [user]);

	const onChangeFillAnswer = (e, index) => {
		setQuiz({
			...quiz,
			questions: quiz.questions.map((q, i) => {
				if (i === index) return { ...q, fillAnswer: e.target.value };
				else return q;
			}),
		});
	};

	const onCheckOption = (e, indexQ, indexO) => {
		setQuiz({
			...quiz,
			questions: quiz.questions.map((q, i) => {
				if (i === indexQ) {
					let options = q.options.map((o, j) => {
						if (j === indexO) return { ...o, isChecked: !o.isChecked };
						else return { ...o };
					});

					return { ...q, options };
				} else return q;
			}),
		});
	};

	const onSubmit = () => {
		let grade = 0;
		let maxGrade = 0;

		quiz.questions.map((question) => {
			maxGrade += question.point;
			if (question.type === "F") {
				if (
					question.options.length > 0 &&
					question.fillAnswer === question.options[0].content
				)
					grade += question.point;
			} else if (question.type === "SAMC") {
				question.options.map((option) => {
					if (option.isCorrect && option.isChecked) grade += question.point;
				});
			} else if (question.type === "MAMC") {
				let perOptionPoint = question.point / question.options.length;

				question.options.map((option) => {
					if (
						(option.isCorrect && option.isChecked) ||
						(!option.isCorrect && !option.isChecked)
					)
						grade += perOptionPoint;

					return option;
				});
			}
		});

		axios({
			method: "post",
			url: "http://localhost:8080/scrutor_server_war_exploded/quizzes/",
			headers: {
				userId: user.userId,
				role: user.role,
			},
			data: {
				quiz: {
					quizId: quiz.quizId,
				},
				grade: grade.toFixed(2),
				maxGrade: maxGrade.toFixed(2),
				attemptQuestions: quiz.questions.map((q) => ({
					question: {
						questionId: q.questionId,
					},
					fillAnswer: q.fillAnswer,

					attemptOptions: q.options.map((o) => ({
						option: { optionId: o.optionId },
						isChecked: o.isChecked,
					})),
				})),
			},
		}).then((res) => {
			console.log(res.data);

			let newAttempt = {
				attemptId: res.data.attemptId,
				quiz: { ...quiz, quizId: res.data.quiz.quizId },
				studentId: res.data.studentId,
				grade: res.data.grade,
				maxGrade: res.data.maxGrade,
				questions: quiz.questions,
			};

			console.log(newAttempt);

			dispatch(attemptsActions.add({ newAttempt: newAttempt }));
		});

		navigate("/quizzes/attempted");
	};

	return (
		<div className="question-edit">
			<div className="container-lg box mb-3 ">
				<div className="position-relative">
					<div className="quiz-info">
						<h2>{quiz.title}</h2>
						<p>{quiz.description}</p>
					</div>
					<div className="position-absolute top-0 end-0">
						<button
							className="btn"
							onClick={() => {
								onSubmit();
							}}
						>
							Nộp bài
						</button>
					</div>
				</div>
			</div>
			{quiz?.questions.map((question, indexQuestion) => (
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
							<textarea
								className="form-control p-2"
								placeholder="Đề bài"
								style={{ height: "8rem" }}
								value={question.content}
							></textarea>
						</div>

						{/* Render fill answer */}
						{question.type === "F" && question.options.length > 0 ? (
							<div>
								<textarea
									className="form-control p-2"
									placeholder="Câu trả lời cho câu hỏi tự luận"
									style={{ height: "8rem" }}
									value={question.fillAnswer}
									onChange={(e) => {
										onChangeFillAnswer(e, indexQuestion);
									}}
								></textarea>
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
										className={`option mb-2 ${indexOption > 0 ? "mt-2" : ""}`}
									>
										<input
											className="d-inline-block me-2"
											id={`${question.questionId}_${indexOption}`}
											type="radio"
											name="option"
											checked={o.isChecked}
											onChange={(e) => {
												onCheckOption(e, indexQuestion, indexOption);
											}}
										/>

										<input
											className="form-control d-inline-block"
											type="text"
											value={o.content}
											readOnly={true}
										/>
									</div>
								);
							else if (question.type === "MAMC")
								return (
									<div key={indexOption} className="option mt-2 mb-2">
										<input
											className="d-inline-block me-2"
											id={`${question.questionId}_${indexOption}`}
											type="checkbox"
											name="option"
											checked={o.isChecked}
											onChange={(e) => {
												onCheckOption(e, indexQuestion, indexOption);
											}}
										/>

										<input
											className="form-control d-inline-block"
											type="text"
											value={o.content}
											readOnly={true}
										/>
									</div>
								);
						})}
					</form>
				</div>
			))}
		</div>
	);
}
