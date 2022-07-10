import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import questionsReducer from "./questionsSlice";
import quizzesReducer from "./quizzesSlice";
import attemptsReducer from "./attemptsSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		questions: questionsReducer,
		quizzes: quizzesReducer,
		attempts: attemptsReducer,
	},
});
