import { Route, Routes } from "react-router-dom";
import "./App.scss";

import HomePage from "./containers/HomePage";
import QuestionsPage from "./containers/QuestionsPage";
import ClassesPage from "./containers/ClassesPage";

import QuestionListPage from "./containers/QuestionsPage/QuestionListPage";
import QuestionEditPage from "./containers/QuestionsPage/QuestionEditPage";
import QuizzesPage from "./containers/QuizzesPage";
import { useDispatch, useSelector } from "react-redux";
import AuthedHeader from "./fragments/AuthedHeader";
import UnauthedHeader from "./fragments/UnauthedHeader";
import { useEffect, useRef, useState } from "react";

import { Modal } from "bootstrap";
import { authActions } from "./utils/authSlice";
import QuizListPage from "./containers/QuizzesPage/QuizListPage";
import QuizEditPage from "./containers/QuizzesPage/QuizEditPage";

function App() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const loginModalRef = useRef();
	const registerModalRef = useRef();
	let loginModal = null;
	let registerModal = null;

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

	useEffect(() => {
		loginModal = new Modal(loginModalRef.current);
		registerModal = new Modal(registerModalRef.current);
	}, []);

	const showLoginModal = () => {
		loginModal.show();
	};

	const showRegisterModal = () => {
		registerModal.show();
	};

	const onLogin = () => {
		// Fake login
		dispatch(authActions.login());

		loginModal.hide();
	};

	const onRegister = () => {
		registerModal.hide();
	};

	return (
		<div className="app">
			{user ? (
				<AuthedHeader />
			) : (
				<UnauthedHeader
					showLoginModal={showLoginModal}
					showRegisterModal={showRegisterModal}
				/>
			)}

			<div
				className="modal fade"
				id="login-modal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				ref={loginModalRef}
			>
				<div className="modal-dialog">
					<div className="modal-content container">
						<div className="row">
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
				</div>
			</div>

			<div
				className="modal fade"
				id="register-modal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				ref={registerModalRef}
			>
				<div className="modal-dialog">
					<div className="modal-content container">
						<div className="row">
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
				</div>
			</div>

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
						<Route path=":quizId/edit" element={<QuizEditPage />}></Route>
					</Route>
					<Route path="classes" element={<ClassesPage />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
