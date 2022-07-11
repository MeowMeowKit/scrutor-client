import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QuestionEdit } from "../../../fragments/Questions/QuestionEdit/QuestionEdit";
import QuestionList from "../../../fragments/Questions/QuestionList/QuestionList";
import { questionsActions } from "../../../utils/questionsSlice";
import { quizzesActions } from "../../../utils/quizzesSlice";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./QuizEditPage.scss";
import axios from "axios";

export default function QuizEditPage() {
	const user = useSelector((state) => state.auth.user);
	let { quizId } = useParams();
	const location = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const quizzes = useSelector((state) => state.quizzes.quizzes);
	const questions = useSelector((state) => state.questions.questions);

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

	const [questionList, setQuestionList] = useState([]);
	const [tmpQuestionList, setTmpQuestionList] = useState([]);

	const [show, setShow] = useState(false);

	useEffect(() => {
		setQuestionList(questions);
		setTmpQuestionList(questions);

		if (location.pathname.includes("edit")) {
			quizzes.map((quiz) => {
				if (quiz.quizId === quizId) {
					setQuiz(quiz);

					const list = questions.map((question) => {
						let isChecked = false;

						for (let i = 0; i < quiz.questions.length; ++i) {
							if (quiz.questions[i].questionId === question.questionId) {
								isChecked = true;
							}
						}

						return { ...question, isChecked };
					});

					setQuestionList(list);
					setTmpQuestionList(list);
				}
			});
		}

		return () => {
			handleClose();
		};
	}, []);

	useEffect(() => {
		setQuestionList(questions);
		setTmpQuestionList(questions);

		if (location.pathname.includes("edit")) {
			quizzes.map((quiz) => {
				if (quiz.quizId === quizId) {
					setQuiz(quiz);

					const list = questions.map((question) => {
						let isChecked = false;

						for (let i = 0; i < quiz.questions.length; ++i) {
							if (quiz.questions[i].questionId === question.questionId) {
								isChecked = true;
							}
						}

						return { ...question, isChecked };
					});

					setQuestionList(list);
					setTmpQuestionList(list);
				}
			});
		}
	}, [quizzes]);

	const handleClose = () => {
		setTmpQuestionList([...questionList]);
		setShow(false);
	};

	const handleShow = () => setShow(true);

	const onChangeQuestionTitle = (e) => {
		setQuiz({ ...quiz, title: e.target.value });
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
				return { ...question, point: +e.target.value };
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

	const onAddQuestions = () => {
		setQuestionList([...tmpQuestionList]);
		setShow(false);
		const questions = tmpQuestionList.filter((tmpQ) => {
			let { isChecked, ...q } = tmpQ;
			if (isChecked) return { q, point: 0 };
		});
		setQuiz({ ...quiz, questions });
	};

	const onSubmitQuestion = (question) => {
		dispatch(
			questionsActions.update({
				id: question.questionId,
				newQuestion: question,
			})
		);
	};

	const onDeleteQuiz = (id) => {
		axios({
			method: "delete",
			url: `http://localhost:8080/scrutor_server_war_exploded/quizzes/${quiz.quizId}`,
			headers: {
				userId: user.userId,
				role: user.role,
			},
		}).then((res, err) => {
			dispatch(quizzesActions.remove({ id: quizId }));
			navigate("/quizzes");
		});
	};

	const onSubmit = () => {
		if (location.pathname.includes("new")) {
			axios({
				method: "post",
				url: "http://localhost:8080/scrutor_server_war_exploded/quizzes/",
				headers: {
					userId: user.userId,
					role: user.role,
				},
				data: {
					title: quiz.title,
					description: quiz.description,
					questions: quiz.questions.map((q) => ({
						questionId: q.questionId,
						point: q.point,
					})),
				},
			}).then((res, err) => {
				dispatch(
					quizzesActions.add({ newQuiz: { ...quiz, quizId: res.data.quizId } })
				);
				navigate("../");
			});
		} else {
			axios({
				method: "put",
				url: `http://localhost:8080/scrutor_server_war_exploded/quizzes/${quiz.quizId}`,
				headers: {
					userId: user.userId,
					role: user.role,
				},
				data: {
					title: quiz.title,
					description: quiz.description,
					questions: quiz.questions.map((q) => ({
						questionId: q.questionId,
						point: q.point,
					})),
				},
			}).then((res, err) => {
				dispatch(quizzesActions.update({ id: quizId, newQuiz: quiz }));
				navigate("../");
			});
		}

		console.log(quiz);

		navigate("/quizzes");
	};

	return (
		<>
			<Modal show={show} onHide={handleClose} size="xl">
				<Modal.Header closeButton>
					<Modal.Title>Chọn câu hỏi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<QuestionList
						mode="fixed"
						questions={tmpQuestionList}
						setQuestions={(questions) => {
							setTmpQuestionList(questions);
						}}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Hủy
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							onAddQuestions();
						}}
					>
						Xác nhận
					</Button>
				</Modal.Footer>
			</Modal>

			<div className="quiz-edit-page">
				<div className="box container-lg mb-3">
					<div className="quiz-info position-relative">
						<input
							type="text"
							className="form-control quiz-title-input mb-1 d-inline-block"
							placeholder="Tiêu đề"
							value={quiz.title}
							onChange={(e) => {
								onChangeQuestionTitle(e);
							}}
						/>
						<div className="position-absolute top-0 end-0">
							{location.pathname.includes("edit") ? (
								<button
									className="btn delete-btn me-2"
									onClick={() => {
										onDeleteQuiz(quiz.quizId);
									}}
								>
									Xóa
								</button>
							) : (
								""
							)}

							<button
								className="btn"
								onClick={() => {
									onSubmit();
								}}
							>
								Lưu
							</button>
						</div>

						<textarea
							className="form-control p-2 quiz-description-input"
							placeholder="Mô tả"
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

				<div className="container-lg d-flex justify-content-end">
					<button
						className="btn"
						onClick={() => {
							handleShow();
						}}
					>
						Thêm câu hỏi
					</button>
				</div>
			</div>
		</>
	);
}
