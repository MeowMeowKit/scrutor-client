import React from "react";
import "./Header.scss";

export default function Header() {
	return (
		<nav class="header navbar navbar-expand-lg navbar-light">
			<div class="container-lg">
				<a class="navbar-brand" href="#">
					SCRUTOR
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<form class="me-auto search-form">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Tìm kiếm"
							aria-label="Search"
						/>
						<button class="search-btn" type="button">
							<i class="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
					<ul class="navbar-nav mb-2 mb-lg-0">
						<li class="nav-item d-lg-inline-block">
							<a class="nav-link active" aria-current="page" href="#">
								Câu hỏi
							</a>
						</li>
						<li class="nav-item d-lg-inline-block">
							<a class="nav-link" href="#">
								Bài kiểm tra
							</a>
						</li>
						<li class="nav-item d-lg-inline-block">
							<a class="nav-link" href="#">
								Lớp học
							</a>
						</li>
						<li class="nav-item d-lg-inline-block dropdown user-menu">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="fa-solid fa-circle-user avatar"></i> Nguyễn Văn A
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a class="dropdown-item" href="#">
										Hồ sơ
									</a>
								</li>
								<li>
									<hr class="dropdown-divider" />
								</li>
								<li>
									<a class="dropdown-item" href="#">
										Đăng xuất
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
