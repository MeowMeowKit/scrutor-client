import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
	name: "questions",
	initialState: {
		questions: [
			{
				questionId: "b237d09c-3c3d-4a81-9982-93a33f490afd",
				content:
					"Which of the following statements are correct about the status of the Http response? Select the one correct answer",
				type: "SAMC",
				difficulty: 50,
				teacherId: "teacher1",
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
						content: "A status of 400 to 499 indicates an error in the server",
						isCorrect: false,
					},
					{
						content: "A status of 500 to 599 indicates an error in the client.",
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
				options: [
					{
						content: "2",
						isCorrect: true,
					},
				],
				tags: ["math"],
			},
			{
				questionId: "4f02a1a7-e60a-4b7a-940f-6555f93b18af",
				content: "",
				type: "SAMC",
				difficulty: 50,
				teacherId: "teacher1",
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
						content: "A status of 400 to 499 indicates an error in the server",
						isCorrect: false,
					},
					{
						content: "A status of 500 to 599 indicates an error in the client.",
						isCorrect: false,
					},
				],
				tags: [],
			},
		],
	},
	reducers: {
		add(state, action) {
			state.questions.push(action.payload.question);
		},
		remove(state, action) {
			const { id } = action.payload;
			state.questions = state.questions.filter((q) => q.questionId !== id);
		},
	},
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice.reducer;
