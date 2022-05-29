import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ClassesPage from "./containers/ClassesPage";

import HomePage from "./containers/HomePage";
import QuestionPage from "./containers/Questions/QuestionsPage";
import QuizPage from "./containers/QuizzesPage";

function App() {
	return (
		<>
			<Header></Header>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/questions" element={<QuestionPage />}></Route>
				<Route path="/quizzes" element={<QuizPage />}></Route>
				<Route path="/classes" element={<ClassesPage />}></Route>
			</Routes>
		</>
	);
}

export default App;
