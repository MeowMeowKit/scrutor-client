import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { QuestionEdit } from "../../../fragments/Questions/QuestionEdit";
import { questionsActions } from "../../../utils/questionsSlice";
import { quizzesActions } from "../../../utils/quizzesSlice";

import "./QuizEditPage.scss";

export default function QuizEditPage() {
	let { quizId } = useParams();
	const location = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const quizzes = useSelector((state) => state.quizzes.quizzes);

	const [quiz, setQuiz] = useState({
		quizId: uuidv4(),
		quizName: "",
		description: "",
		teacherId: "teacher1",
		startAt: new Date(),
		endAt: new Date(),
		time: 0,
		questions: [],
	});

	const quizTitleRef = useRef();

	useEffect(() => {
		quizzes.map((q) => {
			if (q.quizId === quizId) {
				setQuiz(q);
			}
		});
		// quizTitleRef.current.focus();
	}, []);

	const onChangeQuizName = (e) => {
		setQuiz({ ...quiz, quizName: e.target.value });
	};

	const onChangeQuizDescription = (e) => {
		setQuiz({ ...quiz, description: e.target.value });
	};

	const setQuestion = (newQuestion) => {
		const questions = quiz.questions.map((question) => {
			if (question.questionId === newQuestion.questionId)
				return { ...newQuestion };
			else return question;
		});

		const newQuiz = { ...quiz, questions };

		setQuiz(newQuiz);
	};

	const onChangeQuestionPoint = (e, questionId) => {
		const questions = quiz.questions.map((question) => {
			if (question.questionId === questionId)
				return { ...question, point: e.target.value };
			else return question;
		});

		const newQuiz = { ...quiz, questions };
		setQuiz(newQuiz);
	};

	const removeQuestionFromQuiz = (i) => {
		const questions = quiz.questions.filter((q, index) => {
			if (index !== i) return q;
		});

		const newQuiz = { ...quiz, questions };
		setQuiz(newQuiz);
	};

	const onSubmitQuestion = (question) => {
		console.log(question);
		dispatch(
			questionsActions.update({
				id: question.questionId,
				newQuestion: question,
			})
		);
	};

	const onSubmit = () => {
		if (location.pathname.includes("new")) {
		} else {
			dispatch(quizzesActions.update({ id: quizId, newQuiz: quiz }));
		}

		navigate("/quizzes");
	};

	return (
		<div className="quiz-edit-page">
			<div className="box container-lg mb-3">
				<div className="quiz-info position-relative">
					<input
						type="text"
						className="form-control quiz-name-input mb-1 d-inline-block"
						placeholder="Tiêu đề"
						ref={quizTitleRef}
						value={quiz.quizName}
						onChange={(e) => {
							onChangeQuizName(e);
						}}
					/>
					<button
						className="btn position-absolute top-0 end-0"
						onClick={() => {
							onSubmit();
						}}
					>
						Lưu
					</button>
					<textarea
						className="form-control p-2 quiz-description-input"
						placeholder="Mô tả"
						id=""
						style={{ height: "4rem" }}
						value={quiz.description}
						onChange={(e) => {
							onChangeQuizDescription(e);
						}}
					></textarea>
				</div>
			</div>

			{quiz.questions.map((question, index) => {
				return (
					<div key={question.questionId} className="box container-lg mb-3">
						<div className="position-relative">
							<h5 className="mb-3 d-inline-block w-25 me-auto">
								Câu {index + 1}
							</h5>
							<div className="d-flex justify-content-end position-absolute top-0 end-0">
								<input
									type="number"
									className="form-control point-input d-inline-block"
									value={question.point}
									onChange={(e) => {
										onChangeQuestionPoint(e, question.questionId);
									}}
								/>
								<button
									className="btn remove-question-btn pt-0 pb-0"
									type="button"
									onClick={() => {
										removeQuestionFromQuiz(index);
									}}
								>
									<i className="fa-solid fa-xmark"></i>
								</button>
							</div>
						</div>
						<QuestionEdit
							question={question}
							setQuestion={setQuestion}
							action={"update"}
							onSubmit={onSubmitQuestion}
						/>
					</div>
				);
			})}
		</div>
	);
}
