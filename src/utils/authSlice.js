import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
	},
	reducers: {
		set(state, action) {
			state.user = {
				userId: action.payload.userId,
				email: action.payload.email,
				fullName: action.payload.fullName,
				role: action.payload.role,
			};
		},
		reset(state) {
			state.user = null;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
