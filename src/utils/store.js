import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questionsSlice";
import authReducer from "./authSlice";

export default configureStore({
	reducer: {
		questions: questionsReducer,
		auth: authReducer,
	},
});
