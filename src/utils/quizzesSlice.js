import { createSlice } from "@reduxjs/toolkit";

export const quizzesSlice = createSlice({
	name: "quizzes",
	initialState: {
		quizzes: [
			{
				quizId: "f5016af6-82d0-42e0-9027-125d39b78632",
				quizName: "Bài kiểm tra chưa đặt tên",
				description: "This is the quiz 1",
				teacherId: "teacher1",
				startAt: new Date("2022-06-01T06:00:00"),
				endAt: new Date("2022-06-03T06:00:00"),
				time: 2700000,
				questions: [
					{
						questionId: "b237d09c-3c3d-4a81-9982-93a33f490afd",
						content:
							"Which of the following statements are correct about the status of the Http response? Select the one correct answer",
						type: "SAMC",
						difficulty: 50,
						teacherId: "teacher1",
						point: 10,
						options: [
							{
								content:
									"A status of 200 to 299 signifies that the request was successful.",
								isCorrect: true,
							},
							{
								content: "A status of 300 to 399 is informational messages.",
								isCorrect: false,
							},
							{
								content:
									"A status of 400 to 499 indicates an error in the server",
								isCorrect: false,
							},
							{
								content:
									"A status of 500 to 599 indicates an error in the client.",
								isCorrect: false,
							},
						],
						tags: [
							"prj301",
							"servlet",
							"http",
							"chap 1",
							"report generator servlet",
						],
					},
					{
						questionId: "122e36d4-660b-42a8-8ad3-feceb0bbe7d9",
						content:
							"Which method of ReportGeneratorServlet will be called when the user clicks on the URL shown by the following HTML. Assume that ReportGeneratorServlet does not override the service(HttpServletRequest, HttpServletResponse) method of the HttpServlet class.",
						type: "SAMC",
						difficulty: 70,
						teacherId: "teacher1",
						point: 10,
						options: [
							{
								content: "doGet(HttpServletRequest, HttpServletResponse);",
								isCorrect: true,
							},
							{
								content: "doPost(HttpServletRequest, HttpServletResponse);",
								isCorrect: false,
							},
							{
								content: "doHead(HttpServletRequest, HttpServletResponse);",
								isCorrect: false,
							},
							{
								content: "doOption(HttpServletRequest, HttpServletResponse);",
								isCorrect: false,
							},
						],
						tags: [
							"prj301",
							"servlet",
							"http",
							"chap 1",
							"report generator servlet",
						],
					},
					{
						questionId: "8fe67dc8-1c1e-4a2d-8194-9ee0a30cfc67",
						content: "1 + 1 = ?",
						type: "F",
						difficulty: 10,
						teacherId: "teacher1",
						point: 10,
						options: [
							{
								content: "2",
								isCorrect: true,
							},
						],
						tags: ["math"],
					},
				],
			},
			{
				quizId: "871679d8-98f6-4c66-8583-a1dbd75578a8",
				quizName: "Bài kiểm tra chưa đặt tên",
				description: "This is the quiz 2",
				teacherId: "teacher1",
				startAt: new Date("2022-06-01T06:00:00"),
				endAt: new Date("2022-06-03T06:00:00"),
				time: 2700000,
				questions: [
					{
						questionId: "b237d09c-3c3d-4a81-9982-93a33f490afd",
						content:
							"Which of the following statements are correct about the status of the Http response? Select the one correct answer",
						type: "SAMC",
						difficulty: 50,
						teacherId: "teacher1",
						point: 10,
						options: [
							{
								content:
									"A status of 200 to 299 signifies that the request was successful.",
								isCorrect: true,
							},
							{
								content: "A status of 300 to 399 is informational messages.",
								isCorrect: false,
							},
							{
								content:
									"A status of 400 to 499 indicates an error in the server",
								isCorrect: false,
							},
							{
								content:
									"A status of 500 to 599 indicates an error in the client.",
								isCorrect: false,
							},
						],
						tags: [
							"prj301",
							"servlet",
							"http",
							"chap 1",
							"report generator servlet",
						],
					},
					{
						questionId: "8fe67dc8-1c1e-4a2d-8194-9ee0a30cfc67",
						content: "1 + 1 = ?",
						type: "F",
						difficulty: 10,
						teacherId: "teacher1",
						point: 10,
						options: [
							{
								content: "2",
								isCorrect: true,
							},
						],
						tags: ["math"],
					},
				],
			},
		],
	},
	reducers: {
		update(state, action) {
			const { id, newQuiz } = action.payload;
			state.quizzes = state.quizzes.map((q) => {
				if (q.quizId === id) {
					return { ...newQuiz };
				}
				return q;
			});
		},
	},
});

export const quizzesActions = quizzesSlice.actions;
export default quizzesSlice.reducer;
