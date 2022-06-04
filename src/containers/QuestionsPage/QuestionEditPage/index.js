import React, { useEffect, useRef, useState } from "react";
import "./QuestionEditPage.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Question from "../../../models/Question";

export default function QuestionEditPage() {
	let { questionId } = useParams();

	const questions = useSelector((state) => state.questions.questions);
	const [question, setQuestion] = useState(new Question());

	const [hasFillAnswer, setHasFillAnswer] = useState(
		question.type === "F" && question.options.length > 0
	);

	const lastOptionInputRef = useRef(null);

	const [tagInput, setTagInput] = useState("");

	useEffect(() => {
		questions.map((q) => {
			if (q.questionId === questionId) {
				setQuestion(q);
				if (q.type === "F" && q.options.length > 0) {
					setHasFillAnswer(true);
				}
			}
		});
	}, []);

	// Focus on the last option input when ever the question.options has changed
	useEffect(() => {
		if (lastOptionInputRef.current) {
			lastOptionInputRef.current.focus();
		}
	}, [question.options]);

	const onChangeQuestionType = (e) => {
		if (e.target.value === "F" && question.options.length > 0)
			setHasFillAnswer(true);
		setQuestion({ ...question, type: e.target.value });
	};

	const onChangeQuestionContent = (e) => {
		setQuestion({ ...question, content: e.target.value });
	};

	const onChangeQuestionDifficulty = (e) => {
		let difficulty =
			e.target.value && e.target.value !== "" ? parseInt(e.target.value) : 0;

		if (difficulty > 100) difficulty = 100;
		if (difficulty < 0) difficulty = 0;

		setQuestion({
			...question,
			difficulty,
		});
	};

	const onToggleQuestionAnswer = (e, i) => {
		let options = [...question.options];

		if (question.type === "SAMC") {
			if (options[i].isCorrect) return;
			options = options.map((o, index) => {
				if (index !== i) {
					return { ...o, isCorrect: false };
				} else {
					return { ...o, isCorrect: true };
				}
			});
		} else if (question.type === "MAMC") {
			options[i] = { ...options[i], isCorrect: !options[i].isCorrect };
		}

		setQuestion({ ...question, options });
	};

	const onChangeQuestionOption = (e, i) => {
		let options = [...question.options];
		options[i] = { ...options[i], content: e.target.value };
		setQuestion({ ...question, options });
	};

	const onAddOption = (i) => {
		let options = [...question.options];
		options.push({ content: "", isCorrect: false });
		setQuestion({ ...question, options });
	};

	const onDeleteOption = (i) => {
		let options = [...question.options];
		options.splice(i, 1);
		setQuestion({ ...question, options });
	};

	const onToggleFillAnswer = () => {
		setHasFillAnswer(!hasFillAnswer);
	};

	const onChangeFillAnswer = (e) => {
		let options = [...question.options];
		options[0] = { ...options[0], content: e.target.value };
		setQuestion({ ...question, options });
	};

	const onChangeTagInput = (e) => {
		setTagInput(e.target.value);
	};

	const onDeleteTag = (i) => {
		const tags = [...question.tags];
		tags.splice(i, 1);
		setQuestion({ ...question, tags });
	};

	const onAddTag = () => {
		const tags = [...question.tags];
		tags.push(tagInput);
		setQuestion({ ...question, tags });
		setTagInput("");
	};

	const onKeyDownTagInput = (e) => {
		// console.log(e.key);
		if (e.key.toLowerCase() === "enter") {
			onAddTag();
		}
	};

	const onSubmit = () => {
		let submitQuestion = { ...question };
		let options = [...question.options];
		if (question.type === "F")
			options = [{ content: options[0].content, isCorrect: true }];
		submitQuestion.options = [...options];
		console.log(submitQuestion);
	};

	return (
		<>
			<div className="container-lg">
				<h1>Chỉnh sửa câu hỏi</h1>
			</div>
			<div className="box container-lg">
				<form>
					<div className="mb-2">
						<h5>Loại câu hỏi</h5>
						<select
							className="form-select"
							name=""
							id=""
							selected={question.type}
							onChange={(e) => {
								onChangeQuestionType(e);
							}}
						>
							<option value="SAMC">Trắc nghiệm 1 đáp án</option>
							<option value="MAMC">Trắc nghiệm nhiều đáp án</option>
							<option value="F">Tự luận</option>
						</select>
					</div>

					<div className="mt-3 mb-2">
						<h5>Đề bài</h5>
						<textarea
							className="form-control p-2"
							placeholder="Nhập đề bài"
							id=""
							style={{ height: "8rem" }}
							value={question.content}
							onChange={(e) => {
								onChangeQuestionContent(e);
							}}
						></textarea>
					</div>

					{/* Difficulty */}
					<div className="mt-3 mb-2">
						<h5>Độ khó</h5>
						<input
							type="number"
							className="form-control"
							value={question.difficulty || 0}
							onChange={(e) => {
								onChangeQuestionDifficulty(e);
							}}
						/>
					</div>

					<div className="mt-3 d-flex align-items-center">
						<h5 className="d-inline-block me-2">Đáp án</h5>

						{/* If it is a fill question, user can choose to enable answer*/}
						{question.type === "F" ? (
							<div className="form-check form-switch d-inline-block">
								<input
									className="form-check-input"
									type="checkbox"
									checked={hasFillAnswer}
									id=""
									onChange={() => {
										onToggleFillAnswer();
									}}
								/>
							</div>
						) : (
							""
						)}
					</div>

					{/* Render fill answer */}
					{question.type === "F" && hasFillAnswer ? (
						<div>
							<textarea
								className="form-control p-2"
								placeholder="Nhập câu trả lời cho câu hỏi tự luận"
								id=""
								style={{ height: "8rem" }}
								value={question.options[0].content}
								onChange={(e) => {
									onChangeFillAnswer(e);
								}}
							></textarea>
						</div>
					) : (
						""
					)}

					{/* Render option list */}
					{question.options?.map((o, index) => {
						if (question.type === "SAMC")
							return (
								<div
									key={index}
									className={`option mb-2 ${index > 0 ? "mt-2" : ""}`}
								>
									<input
										className="d-inline-block me-2"
										id={`${question.questionId}_1`}
										type="radio"
										name="option"
										checked={o.isCorrect}
										onChange={(e) => {
											onToggleQuestionAnswer(e, index);
										}}
									/>

									<input
										className="form-control d-inline-block"
										type="text"
										value={o.content}
										ref={
											index === question.options.length - 1
												? lastOptionInputRef
												: undefined
										}
										onChange={(e) => {
											onChangeQuestionOption(e, index);
										}}
									/>

									<button
										type="button"
										className="option-delete-btn ms-2"
										onClick={() => {
											onDeleteOption(index);
										}}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
							);
						else if (question.type === "MAMC")
							return (
								<div key={index} className="option mt-2 mb-2">
									<input
										className="d-inline-block me-2"
										id={`${question.questionId}_1`}
										type="checkbox"
										name="option"
										checked={o.isCorrect}
										onChange={(e) => {
											onToggleQuestionAnswer(e, index);
										}}
									/>

									<input
										className="form-control d-inline-block"
										type="text"
										value={o.content}
										ref={
											index === question.options.length - 1
												? lastOptionInputRef
												: undefined
										}
										onChange={(e) => {
											onChangeQuestionOption(e, index);
										}}
									/>

									<button
										type="button"
										className="option-delete-btn ms-2"
										onClick={() => {
											onDeleteOption(index);
										}}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
							);
					})}

					{/* Add radio option  */}
					{question.type !== "SAMC" ? (
						""
					) : (
						<div key={question.options.length} className="mt-2 mb-2">
							<input
								className="d-inline-block me-2"
								id={`${question.questionId}_1`}
								type="radio"
								name="option"
								checked={false}
								onChange={() => {
									onAddOption();
								}}
							/>

							<input
								className="form-control d-inline-block"
								type="text"
								value={""}
								placeholder="Thêm đáp án"
								onFocus={() => {
									onAddOption();
								}}
								onChange={() => {}}
							/>
						</div>
					)}

					{/* Add checkbox option  */}
					{question.type !== "MAMC" ? (
						""
					) : (
						<div key={question.options.length} className="mt-2 mb-2">
							<input
								className="d-inline-block me-2"
								id={`${question.questionId}_1`}
								type="checkbox"
								name="option"
								checked={false}
								onChange={(e) => {
									onAddOption();
								}}
							/>

							<input
								className="form-control d-inline-block"
								type="text"
								placeholder="Thêm đáp án"
								value={""}
								onFocus={() => {
									onAddOption();
								}}
								onChange={() => {}}
							/>
						</div>
					)}

					<div className="mt-3 mb-2">
						<h5>Thẻ</h5>

						<div className="tag-container d-inline-block">
							{question.tags?.map((t, index) => (
								<div
									key={index}
									className="badge rounded-pill tag d-inline-block me-2"
								>
									<p className="d-inline-block me-1">{t}</p>
									<button
										type="button"
										className="tag-delete-btn d-inline-block"
										onClick={() => {
											onDeleteTag(index);
										}}
									>
										<i className="fa-solid fa-xmark"></i>
									</button>
								</div>
							))}

							<div className="w-auto d-inline-block">
								<input
									type="text"
									className="tag-input d-inline-block w-50"
									placeholder="Thêm thẻ"
									value={tagInput}
									onChange={(e) => {
										onChangeTagInput(e);
									}}
									onKeyDown={(e) => {
										onKeyDownTagInput(e);
									}}
								/>
								<button
									type="button"
									className="add-tag-btn d-inline-block"
									onClick={() => {
										onAddTag();
									}}
								>
									<i className="fa-solid fa-plus"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-end">
						<button type="button" className="btn update-btn" onClick={onSubmit}>
							Cập nhật
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
