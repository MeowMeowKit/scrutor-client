import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

import { authActions } from "./utils/authSlice";

import HomePage from "./containers/HomePage/HomePage";
import QuestionsPage from "./containers/QuestionsPage/QuestionsPage";
import ClassesPage from "./containers/ClassesPage/ClassesPage";

import QuestionListPage from "./containers/QuestionsPage/QuestionListPage/QuestionListPage";
import QuestionEditPage from "./containers/QuestionsPage/QuestionEditPage/QuestionEditPage";
import QuizzesPage from "./containers/QuizzesPage/QuizzesPage";
import TeacherHeader from "./fragments/TeacherHeader/TeacherHeader";
import UnauthedHeader from "./fragments/UnauthedHeader/UnauthedHeader";

import Modal from "react-bootstrap/Modal";
import QuizListPage from "./containers/QuizzesPage/QuizListPage/QuizListPage";
import QuizEditPage from "./containers/QuizzesPage/QuizEditPage/QuizEditPage";
import { useCookies } from "react-cookie";
import { questionsActions } from "./utils/questionsSlice";
import { quizzesActions } from "./utils/quizzesSlice";
import StudentHeader from "./fragments/StudentHeader/StudentHeader";
import QuizAttemptPage from "./containers/QuizzesPage/QuizAttemptPage/QuizAttemptPage";
import { attemptsActions } from "./utils/attemptsSlice";
import AttemptListPage from "./containers/QuizzesPage/AttemptListPage/AttemptListPage";
import AttemptDetailPage from "./containers/QuizzesPage/AttemptDetailPage/AttemptDetailPage";

// const axios = require("axios").default;

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const [cookies, setCookie] = useCookies(["userId"]);

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
		isRemember: false,
	});

	const [registerForm, setRegisterForm] = useState({
		role: "student",
		fullName: "",
		email: "",
		password: "",
	});

	const [isShowLoginModal, setIsShowLoginModal] = useState(false);
	const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);

	useEffect(() => {
		// Auto login
		if (cookies.userId) {
			axios({
				method: "post",
				url: "http://localhost:8080/scrutor_server_war_exploded/auth/auto-login",
				data: {
					userId: cookies.userId,
				},
			}).then((res, err) => {
				if (err) {
					console.log("Error");
				}

				dispatch(
					authActions.set({
						userId: res.data.userId,
						email: res.data.userId,
						fullName: res.data.fullName,
						role: res.data.role,
					})
				);

				setCookie("userId", res.data.userId, { path: "/" });
			});
		}
	}, []);

	const fetchQuestions = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/scrutor_server_war_exploded/questions",
			headers: {
				userId: user.userId,
				role: user.role,
			},
		}).then((res) => {
			console.log(res);
			if (res.data) {
				dispatch(questionsActions.reset());
				let questionList = res.data.map((question) => {
					let newQuestion = {
						questionId: question.questionId,
						content: question.content,
						type: question.type,
						difficulty: question.difficulty,
						teacherId: user.userId,
						options: question.options.map((option) => ({
							content: option.content,
							isCorrect: option.isCorrect,
						})),
						tags: question.tags.map((tag) => ({ name: tag.name })),
					};

					dispatch(questionsActions.add({ question: newQuestion }));

					return newQuestion;
				});
			}
		});
	};

	const fetchQuizzes = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/scrutor_server_war_exploded/quizzes/",
			headers: {
				userId: user.userId,
				role: user.role,
			},
		}).then((res) => {
			if (res.data) {
				dispatch(quizzesActions.reset());

				let quizList = res.data.map((quiz) => {
					let newQuiz = {
						quizId: quiz.quizId,
						teacherId: quiz.teacherId,
						title: quiz.title,
						description: quiz.description,
						questions: quiz.questions,
					};

					console.log(newQuiz);

					dispatch(quizzesActions.add({ newQuiz: newQuiz }));

					return newQuiz;
				});
			}
		});
	};

	const fetchAttempts = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/scrutor_server_war_exploded/quizzes/",
			headers: {
				userId: user.userId,
				role: user.role,
			},
		}).then((res) => {
			if (res.data) {
				dispatch(attemptsActions.reset());

				let attemptList = res.data.map((attempt) => {
					let newAttempt = {
						attemptId: attempt.attemptId,
						quiz: {
							...attempt.quiz,
							questions: attempt.attemptQuestions.map((aq) => {
								let question = {
									...aq.question,
									fillAnswer: aq.fillAnswer || null,
								};

								question.options = aq.attemptOptions.map((ao) => ({
									...ao.option,
									isChecked: ao.isChecked,
								}));

								return question;
							}),
						},
						studentId: attempt.studentId,
						grade: attempt.grade,
						maxGrade: attempt.maxGrade,
					};

					dispatch(attemptsActions.add({ newAttempt: newAttempt }));

					return newAttempt;
				});

				console.log(res.data);
			}
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			if (user && user.userId) {
				if (user.role === "teacher") {
					await fetchQuestions();
					await fetchQuizzes();
				} else if (user.role === "student") {
					await fetchAttempts();
				}
			}
		};

		fetchData();
	}, [user]);

	const handleShowLoginModal = () => {
		setIsShowLoginModal(true);
	};

	const handleHideLoginModal = () => {
		setIsShowLoginModal(false);
	};

	const handleShowRegisterModal = () => {
		setIsShowRegisterModal(true);
	};

	const handleHideRegisterModal = () => {
		setIsShowRegisterModal(false);
	};

	const onLogin = () => {
		axios({
			method: "post",
			url: "http://localhost:8080/scrutor_server_war_exploded/auth/login",
			data: {
				email: loginForm.email,
				password: loginForm.password,
			},
		}).then((res, err) => {
			if (err) {
				console.log("Error");
			}

			dispatch(
				authActions.set({
					userId: res.data.userId,
					email: res.data.userId,
					fullName: res.data.fullName,
					role: res.data.role,
				})
			);

			setCookie("userId", res.data.userId, { path: "/" });

			// Reset login form
			setLoginForm({
				email: "",
				password: "",
				isRemember: false,
			});

			handleHideLoginModal();
		});
	};

	const onRegister = () => {
		console.log(registerForm);
		axios({
			method: "post",
			url: "http://localhost:8080/scrutor_server_war_exploded/auth/register",
			data: {
				fullName: registerForm.fullName,
				email: registerForm.email,
				password: registerForm.password,
				role: registerForm.role,
			},
		}).then((res, err) => {
			if (err) {
				console.log("Error");
			}

			// Reset form
			setRegisterForm({
				role: "student",
				fullName: "",
				email: "",
				password: "",
			});

			handleHideRegisterModal();

			if (res.data != null) handleShowLoginModal();
		});
	};

	return (
		<div className="app">
			{user ? (
				user.role === "teacher" ? (
					<TeacherHeader />
				) : (
					<StudentHeader />
				)
			) : (
				<UnauthedHeader
					showLoginModal={handleShowLoginModal}
					showRegisterModal={handleShowRegisterModal}
				/>
			)}

			<Modal
				show={isShowLoginModal}
				onHide={handleHideLoginModal}
				keyboard={false}
				className="modal"
				dialogClassName="login-modal"
			>
				<Modal.Body>
					<div className="login-modal-content container">
						<div className="row login-modal-body">
							<form className="form d-inline-block col-12 col-md-6 col-lg-4">
								<h4 className="text-center">Đăng nhập</h4>

								<div className="mb-3">
									<label htmlFor="login-email-input" className="form-label">
										Email
									</label>
									<input
										type="email"
										className="form-control"
										id="login-email-input"
										aria-describedby="emailHelp"
										value={loginForm.email}
										onChange={(e) => {
											setLoginForm({ ...loginForm, email: e.target.value });
										}}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="login-password-input" className="form-label">
										Mật khẩu
									</label>
									<input
										type="password"
										className="form-control w-100"
										id="login-password-input"
										value={loginForm.password}
										onChange={(e) => {
											setLoginForm({ ...loginForm, password: e.target.value });
										}}
									/>
								</div>
								<div className="mb-4 form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="is-remember-input"
										checked={loginForm.isRemember}
										onChange={(e) => {
											setLoginForm({
												...loginForm,
												isRemember: !loginForm.isRemember,
											});
										}}
									/>
									<label
										className="form-check-label"
										htmlFor="is-remember-input"
									>
										Ghi nhớ tài khoản
									</label>
								</div>
								<button
									type="button"
									className="btn w-100"
									onClick={() => {
										onLogin();
									}}
								>
									Đăng nhập
								</button>
							</form>
							<div className="banner d-inline-block col-12 col-md-6 col-lg-8">
								...
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Modal
				show={isShowRegisterModal}
				onHide={handleHideRegisterModal}
				keyboard={false}
				className="modal"
				dialogClassName="register-modal"
			>
				<Modal.Body>
					<div className="register-modal-content container">
						<div className="row register-modal-body">
							<form className="form d-inline-block col-12 col-md-6 col-lg-4">
								<h4 className="text-center">Đăng ký</h4>

								<div className="mb-3">
									<label htmlFor="role-input" className="form-label">
										Chức vụ
									</label>
									<select
										className="form-select w-100"
										name=""
										id="role-input"
										value={registerForm.role}
										onChange={(e) => {
											setRegisterForm({
												...registerForm,
												role: e.target.value,
											});
										}}
									>
										<option value="student">Học sinh</option>
										<option value="teacher">Giáo viên</option>
									</select>
								</div>

								<div className="mb-3">
									<label htmlFor="full-name-input" className="form-label">
										Họ và tên
									</label>
									<input
										type="text"
										className="form-control w-100"
										id="full-name-input"
										aria-describedby="emailHelp"
										value={registerForm.fullName}
										onChange={(e) => {
											setRegisterForm({
												...registerForm,
												fullName: e.target.value,
											});
										}}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="register-email-input" className="form-label">
										Email
									</label>
									<input
										type="email"
										className="form-control w-100"
										id="register-email-input"
										aria-describedby="emailHelp"
										value={registerForm.email}
										onChange={(e) => {
											setRegisterForm({
												...registerForm,
												email: e.target.value,
											});
										}}
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="register-password-input"
										className="form-label"
									>
										Mật khẩu
									</label>
									<input
										type="password"
										className="form-control w-100"
										id="register-password-input"
										value={registerForm.password}
										onChange={(e) => {
											setRegisterForm({
												...registerForm,
												password: e.target.value,
											});
										}}
									/>
								</div>

								<button
									type="button"
									className="btn w-100"
									onClick={() => {
										onRegister();
									}}
								>
									Đăng ký
								</button>
							</form>
							<div className="banner d-inline-block col-12 col-md-6 col-lg-8">
								...
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<div className="body pt-4">
				<Routes>
					<Route path="" element={<HomePage />}></Route>
					<Route path="questions" element={<QuestionsPage />}>
						<Route path="" element={<QuestionListPage />}></Route>
						<Route path="new" element={<QuestionEditPage />}></Route>
						<Route
							path=":questionId/edit"
							element={<QuestionEditPage />}
						></Route>
					</Route>
					<Route path="quizzes" element={<QuizzesPage />}>
						<Route path="" element={<QuizListPage />}></Route>
						<Route path="new" element={<QuizEditPage />}></Route>
						<Route path=":quizId/edit" element={<QuizEditPage />}></Route>
						<Route path=":quizId/attempt" element={<QuizAttemptPage />}></Route>
						<Route path="attempted" element={<AttemptListPage />}></Route>
						<Route
							path="attempted/:attemptId"
							element={<AttemptDetailPage />}
						></Route>
					</Route>
					<Route path="classes" element={<ClassesPage />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
