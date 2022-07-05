import { createSlice } from "@reduxjs/toolkit";

export const quizzesSlice = createSlice({
	name: "quizzes",
	initialState: {
		quizzes: [],
	},
	reducers: {
		reset(state) {
			state.quizzes = [];
		},
		add(state, action) {
			const { newQuiz } = action.payload;
			state.quizzes.push(newQuiz);
		},
		remove(state, action) {
			const { id } = action.payload;
			state.quizzes = state.quizzes.filter((q) => q.quizId !== id);
		},
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
