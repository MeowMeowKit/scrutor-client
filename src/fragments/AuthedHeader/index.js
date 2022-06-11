import React from "react";
import { Link } from "react-router-dom";
import "./AuthedHeader.scss";

export default function AuthedHeader() {
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
						/>
						<button className="search-btn" type="button">
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
					<ul className="navbar-nav mb-2 mb-lg-0">
						<li className="nav-item d-lg-inline-block">
							<Link
								className="nav-link active"
								aria-current="page"
								to="/questions"
							>
								Câu hỏi
							</Link>
						</li>
						<li className="nav-item d-lg-inline-block">
							<Link className="nav-link" to="/quizzes">
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
								<i className="fa-solid fa-circle-user avatar"></i> Nguyễn Văn A
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
									<Link className="dropdown-item" to="#">
										Đăng xuất
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
