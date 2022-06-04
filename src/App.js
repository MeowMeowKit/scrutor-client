import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import ClassesPage from "./containers/ClassesPage";

import HomePage from "./containers/HomePage";
import QuestionsPage from "./containers/QuestionsPage";
import QuestionListPage from "./containers/QuestionsPage/QuestionListPage";
import QuestionEditPage from "./containers/QuestionsPage/QuestionEditPage";
import QuizPage from "./containers/QuizzesPage";

function App() {
	return (
		<div className="app">
			<Header></Header>
			<div className="body pt-4">
				<Routes>
					<Route path="" element={<HomePage />}></Route>
					<Route path="questions" element={<QuestionsPage />}>
						<Route path="" element={<QuestionListPage />}></Route>
						<Route path="new" element={<QuestionEditPage />}></Route>
						<Route
							path=":questionId/edit"
							element={<QuestionEditPage />}
						></Route>
					</Route>
					<Route path="quizzes" element={<QuizPage />}></Route>
					<Route path="classes" element={<ClassesPage />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
