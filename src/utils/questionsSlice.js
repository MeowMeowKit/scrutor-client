import { createSlice } from "@reduxjs/toolkit";

export const questionsSlice = createSlice({
	name: "questions",
	initialState: {
		questions: [],
	},
	reducers: {
		reset(state) {
			state.questions = [];
		},
		add(state, action) {
			state.questions.unshift(action.payload.question);
		},
		remove(state, action) {
			const { id } = action.payload;
			state.questions = state.questions.filter((q) => q.questionId !== id);
		},
		update(state, action) {
			const { id, newQuestion } = action.payload;
			state.questions = state.questions.map((q) => {
				if (q.questionId === id) {
					return { ...newQuestion };
				}
				return q;
			});
		},
	},
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice.reducer;
