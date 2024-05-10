import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestions } from "@/redux/reducers/ActionCreators";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/question";

const useReduxQuestions = (id: string) => {
	const [arrayQuestions, setArrayQuestions] = useState<IQuestion[] | []>([]);
	const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
		null
	);
	const dispatch = useAppDispatch();
	const { questions, isLoading, error } = useAppSelector(
		state => state.questionReducer
	);
	useEffect(() => {
		dispatch(fetchQuestions());
	}, []);

	useEffect(() => {
		if (questions[id].length) {
			setArrayQuestions(questions[id]);
			setCurrentQuestion(arrayQuestions[0]);
		}
	}, [questions]);

	const handleNextQuestion = (currentQuestion: null | IQuestion) => {
		if (currentQuestion) {
			const nextQuestion = parseInt(
				currentQuestion.question.match(/^\d+/)?.[0] ?? "0"
			);
			if (nextQuestion !== arrayQuestions.length) {
				setCurrentQuestion(arrayQuestions[nextQuestion]);
			}
		}
	};

	const handleBackQuestion = (currentQuestion: null | IQuestion) => {
		if (currentQuestion) {
			const nextQuestion = parseInt(
				currentQuestion.question.match(/^\d+/)?.[0] ?? "0"
			);
			if (nextQuestion > 1) {
				setCurrentQuestion(arrayQuestions[nextQuestion - 2]);
			}
		}
	};

	return {
		currentQuestion,
		isLoading,
		error,
		handleNextQuestion,
		handleBackQuestion,
	};
};

export default useReduxQuestions;
