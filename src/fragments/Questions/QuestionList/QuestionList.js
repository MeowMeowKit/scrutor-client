import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Question from "../Question/Question";
import "./QuestionList.scss";
import * as XLSX from "xlsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { questionsActions } from "../../../utils/questionsSlice";

export default function QuestionList(props) {
	// const [file, setFile] = useState();
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChangeFile = async (e) => {
		const [file] = e.target.files;
		const reader = new FileReader();

		const toQuestionList = (data) => {
			let questionList = [];

			data.forEach((row, i) => {
				if (row[0]) {
					questionList.push({
						content: row[1],
						type: row[2],
						difficulty: +row[3],
						options: [],
						tags: row[4].split(", ").map((tag) => ({ name: tag })),
					});
				} else {
					questionList[questionList.length - 1].options.push({
						content: row[1].toString(),
						isCorrect: row[2] && row[2] === 1 ? true : false,
					});
				}
			});

			return questionList;
		};

		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

			toQuestionList(data).map((question) => {
				axios({
					method: "post",
					url: "http://localhost:8080/scrutor_server_war_exploded/questions/",
					headers: {
						userId: user.userId,
						role: user.role,
					},
					data: {
						content: question.content,
						type: question.type,
						difficulty: question.difficulty,
						tags: question.tags,
						options: question.options,
					},
				}).then((res, err) => {
					dispatch(questionsActions.add({ question: res.data }));
					navigate("/questions");
				});
			});
		};
		reader.readAsBinaryString(file);
	};

	return (
		<div className="quiz-list container-lg">
			<div className="d-inline-block mb-4">
				<Link
					type="button"
					className="add-question-btn btn"
					to="/questions/new"
				>
					+ Tạo câu hỏi
				</Link>

				<div className="ms-2 d-inline-block">
					<label htmlFor="file" className="btn import-btn">
						Nhập câu hỏi từ file
					</label>
					<input
						type="file"
						id="file"
						style={{ visibility: "hidden" }}
						className="d-inline-block"
						onChange={(e) => {
							onChangeFile(e);
						}}
					/>
				</div>
			</div>

			<div className="row table-header">
				<div className="col-auto pe-3"></div>
				<div className="col-4 col-md-5 col-lg-7 ps-4 pe-4">
					<h6>Nội dung</h6>
				</div>
				<div className="d-none d-md-block col-2 col-lg-2 ps-4 pe-4">
					<h6>Thẻ</h6>
				</div>
				<div className="difficulty col-auto p-0">
					<h6>Độ khó</h6>
				</div>
				<div className="buttons col-4 col-md-2 col-lg-2 d-flex justify-content-end"></div>
			</div>
			{props.questions.map((q, i) => (
				<Question
					mode={props.mode}
					key={q.questionId}
					index={props.questions.indexOf(q) + 1}
					question={q}
					isChecked={q.isChecked || false}
					toggleIsChecked={() => {
						const newQuestions = props.questions.map((q, index) => {
							if (index === i) return { ...q, isChecked: !q.isChecked };
							else return q;
						});
						props.setQuestions(newQuestions);
					}}
				/>
			))}
		</div>
	);
}
