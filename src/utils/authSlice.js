import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
	},
	reducers: {
		// Fake login
		login(state, action) {
			state.user = {
				userId: "teacher1",
				email: "teacher1@gmail.com",
				fullName: "Teacher 1",
				role: "teacher",
			};
		},
		register(state, action) {},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
