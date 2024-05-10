import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestions } from "@/redux/reducers/ActionCreators";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/question";

const useReduxQuestions = (id: string) => {
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
			setCurrentQuestion(questions[id][0]);
		}
	}, [questions]);

	return { currentQuestion, isLoading, error };
};

export default useReduxQuestions;
