import React, { useEffect, useRef, useState } from "react";

import "./QuestionEdit.scss";

export const QuestionEdit = (props) => {
	const lastOptionInputRef = useRef(null);

	const [tagInput, setTagInput] = useState("");

	const [isAddedOption, setIsAddedOption] = useState(false);

	const [hasFillAnswer, setHasFillAnswer] = useState(false);

	useEffect(() => {
		setHasFillAnswer(
			props.question.type === "F" && props.question.options.length > 0
		);
	}, [props.question]);

	useEffect(() => {
		return () => {
			if (lastOptionInputRef.current) {
				lastOptionInputRef.current.focus();
			}
		};
	}, [props.question.options.length]);

	const onChangeQuestionType = (e) => {
		if (e.target.value === "F" && props.question.options.length > 0)
			setHasFillAnswer(true);
		props.setQuestion({ ...props.question, type: e.target.value });
	};

	const onChangeQuestionContent = (e) => {
		props.setQuestion({ ...props.question, content: e.target.value });
	};

	const onChangeQuestionDifficulty = (e) => {
		let difficulty =
			e.target.value && e.target.value !== "" ? parseInt(e.target.value) : 0;

		if (difficulty > 100) difficulty = 100;
		if (difficulty < 0) difficulty = 0;

		props.setQuestion({
			...props.question,
			difficulty,
		});
	};

	const onToggleQuestionAnswer = (e, i) => {
		let options = [...props.question.options];

		if (props.question.type === "SAMC") {
			if (options[i].isCorrect) return;
			options = options.map((o, index) => {
				if (index !== i) {
					return { ...o, isCorrect: false };
				} else {
					return { ...o, isCorrect: true };
				}
			});
		} else if (props.question.type === "MAMC") {
			options[i] = { ...options[i], isCorrect: !options[i].isCorrect };
		}

		props.setQuestion({ ...props.question, options });
	};

	const onChangeQuestionOption = (e, i) => {
		let options = [...props.question.options];
		options[i] = { ...options[i], content: e.target.value };
		props.setQuestion({ ...props.question, options });
	};

	const onAddOption = (i) => {
		let options = [...props.question.options];
		options.push({ content: "", isCorrect: false });
		props.setQuestion({ ...props.question, options });
		setIsAddedOption(true);
	};

	const onDeleteOption = (i) => {
		let options = [...props.question.options];
		options.splice(i, 1);
		props.setQuestion({ ...props.question, options });
	};

	const onToggleFillAnswer = () => {
		setHasFillAnswer(!hasFillAnswer);
	};

	const onChangeFillAnswer = (e) => {
		let options = [...props.question.options];
		options[0] = { ...options[0], content: e.target.value };
		props.setQuestion({ ...props.question, options });
	};

	const onChangeTagInput = (e) => {
		setTagInput(e.target.value);
	};

	const onDeleteTag = (i) => {
		const tags = [...props.question.tags];
		tags.splice(i, 1);
		props.setQuestion({ ...props.question, tags });
	};

	const onAddTag = () => {
		const tags = [...props.question.tags];
		tags.push(tagInput);
		props.setQuestion({ ...props.question, tags });
		setTagInput("");
	};

	const onKeyDownTagInput = (e) => {
		if (e.key.toLowerCase() === "enter") {
			onAddTag();
		}
	};

	const onSubmit = () => {
		let submitQuestion = { ...props.question };
		let options = [...props.question.options];
		if (props.question.type === "F")
			options = [{ content: options[0].content, isCorrect: true }];
		submitQuestion.options = [...options];

		props.onSubmit(submitQuestion);
	};

	return (
		<div className="question-edit">
			<form>
				<div className="mb-2">
					<select
						className="d-inline-block form-select w-50 me-4"
						name=""
						selected={props.question.type}
						onChange={(e) => {
							onChangeQuestionType(e);
						}}
					>
						<option value="SAMC">Trắc nghiệm 1 đáp án</option>
						<option value="MAMC">Trắc nghiệm nhiều đáp án</option>
						<option value="F">Tự luận</option>
					</select>

					<div className="d-inline-block">
						<input
							type="number"
							className="d-inline-block form-control me-2"
							value={props.question.difficulty || 0}
							onChange={(e) => {
								onChangeQuestionDifficulty(e);
							}}
						/>
						<i className="fa-solid fa-star"></i>
					</div>
				</div>

				<div className="mt-3 mb-2">
					<textarea
						className="form-control p-2"
						placeholder="Đề bài"
						style={{ height: "8rem" }}
						value={props.question.content}
						onChange={(e) => {
							onChangeQuestionContent(e);
						}}
					></textarea>
				</div>

				<div className="mt-3 d-flex align-items-center">
					{/* If it is a fill props.question, user can choose to enable answer*/}
					{props.question.type === "F" ? (
						<div className="form-check form-switch d-inline-block">
							<input
								className="form-check-input"
								type="checkbox"
								checked={hasFillAnswer}
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
				{props.question.type === "F" && hasFillAnswer ? (
					<div>
						<textarea
							className="form-control p-2"
							placeholder="Câu trả lời cho câu hỏi tự luận"
							style={{ height: "8rem" }}
							value={props.question.options[0].content}
							onChange={(e) => {
								onChangeFillAnswer(e);
							}}
						></textarea>
					</div>
				) : (
					""
				)}

				{/* Render option list */}
				{props.question.options?.map((o, index) => {
					if (props.question.type === "SAMC")
						return (
							<div
								key={index}
								className={`option mb-2 ${index > 0 ? "mt-2" : ""}`}
							>
								<input
									className="d-inline-block me-2"
									id={`${props.question.questionId}_${index}`}
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
										index === props.question.options.length - 1 && isAddedOption
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
					else if (props.question.type === "MAMC")
						return (
							<div key={index} className="option mt-2 mb-2">
								<input
									className="d-inline-block me-2"
									id={`${props.question.questionId}_${index}`}
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
										index === props.question.options.length - 1 && isAddedOption
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
				{props.question.type !== "SAMC" ? (
					""
				) : (
					<div key={props.question.options.length} className="mt-2 mb-2">
						<input
							className="d-inline-block me-2"
							id={`${props.question.questionId}_${props.question.options.length}`}
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
				{props.question.type !== "MAMC" ? (
					""
				) : (
					<div key={props.question.options.length} className="mt-2 mb-2">
						<input
							className="d-inline-block me-2"
							id={`${props.question.questionId}_${props.question.options.length}`}
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
					<div className="tag-container d-inline-block">
						{props.question.tags?.map((t, index) => (
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
						{props.action === "create" ? "Tạo câu hỏi" : "Cập nhật"}
					</button>
				</div>
			</form>
		</div>
	);
};
