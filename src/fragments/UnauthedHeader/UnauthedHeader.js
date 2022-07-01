import React from "react";
import { Link } from "react-router-dom";
import "./UnauthedHeader.scss";

export default function UnauthedHeader(props) {
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
					{/* <form className="me-auto search-form">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Tìm kiếm"
							aria-label="Search"
						/>
						<button className="search-btn" type="button">
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form> */}
					<div className="me-auto"></div>
					<ul className="navbar-nav mb-2 mb-lg-0">
						<button
							className="login-btn btn"
							onClick={() => {
								props.showLoginModal();
							}}
						>
							Đăng nhập
						</button>
						<button
							className="register-btn btn"
							onClick={() => {
								props.showRegisterModal();
							}}
						>
							Đăng ký
						</button>
					</ul>
				</div>
			</div>
		</nav>
	);
}
