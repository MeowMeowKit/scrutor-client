import { createSlice } from "@reduxjs/toolkit";

export const attemptsSlice = createSlice({
	name: "attempts",
	initialState: {
		attempts: [],
	},
	reducers: {
		reset(state) {
			state.attempts = [];
		},
		add(state, action) {
			const { newAttempt } = action.payload;
			state.attempts.unshift(newAttempt);
		},
		remove(state, action) {
			const { id } = action.payload;
			state.attempts = state.attempts.filter((a) => a.attemptId !== id);
		},
		update(state, action) {
			const { id, newAttempt } = action.payload;
			state.attempts = state.attempts.map((a) => {
				if (a.attemptId === id) {
					return { ...newAttempt };
				}
				return a;
			});
		},
	},
});

export const attemptsActions = attemptsSlice.actions;
export default attemptsSlice.reducer;
