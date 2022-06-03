import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questionsSlice";

export default configureStore({
	reducer: {
		questions: questionsReducer,
	},
});
