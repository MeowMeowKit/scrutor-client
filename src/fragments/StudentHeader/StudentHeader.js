import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../utils/authSlice";
import "./StudentHeader.scss";

export default function StudentHeader() {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
	let navigate = useNavigate();

	const [searchInput, setSearchInput] = useState("");

	const onLogOut = () => {
		dispatch(authActions.reset());

		removeCookie("userId");
	};

	const onChangeSearchInput = (e) => {
		setSearchInput(e.target.value);
	};

	const onSubmitSearchInput = () => {
		navigate(`quizzes/${searchInput}/attempt`);
	};

	return (
		<nav className="header navbar navbar-expand-lg navbar-light">
			<div className="container-lg">
				<Link className="navbar-brand" to="/">
					SCRUTOR
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<form className="me-auto search-form">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Tìm kiếm"
							aria-label="Search"
							value={searchInput}
							onChange={(e) => {
								onChangeSearchInput(e);
							}}
						/>
						<button
							className="search-btn"
							type="button"
							onClick={() => {
								onSubmitSearchInput();
							}}
						>
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
					<ul className="navbar-nav mb-2 mb-lg-0">
						<li className="nav-item d-lg-inline-block">
							<Link className="nav-link" to="/quizzes/attempted">
								Bài kiểm tra
							</Link>
						</li>
						<li className="nav-item d-lg-inline-block">
							<Link className="nav-link" to="/classes">
								Lớp học
							</Link>
						</li>
						<li className="nav-item d-lg-inline-block dropdown user-menu">
							<Link
								className="nav-link dropdown-toggle"
								to="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i className="fa-solid fa-circle-user avatar"></i>{" "}
								{user.fullName}
							</Link>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<Link className="dropdown-item" to="#">
										Hồ sơ
									</Link>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<button
										className="dropdown-item"
										onClick={() => {
											onLogOut();
										}}
									>
										Đăng xuất
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
