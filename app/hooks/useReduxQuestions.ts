import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchQuestions } from "@/redux/reducers/ActionCreators";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/question";

const useReduxQuestions = (id: string) => {
	const [arrayQuestions, setArrayQuestions] = useState<IQuestion[] | []>([]);
	const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
		null
	);
	const [filteredArray, setFilteredArray] = useState<IQuestion[] | []>([]);
	const [indexCurrentQuestion, setIndexCurrentQuestion] = useState<number>(0);
	const [indexFiltered, setIndexFiltered] = useState<number>(0);
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

	useEffect(() => {
		if (
			indexCurrentQuestion >= 0 &&
			indexCurrentQuestion < arrayQuestions.length
		) {
			setCurrentQuestion(arrayQuestions[indexCurrentQuestion]);
		}
	}, [indexCurrentQuestion]);

	const handleNextQuestion = () => {
		if (indexCurrentQuestion < arrayQuestions.length - 1) {
			setIndexCurrentQuestion(prev => prev + 1);
		}
	};

	const handleBackQuestion = () => {
		if (indexCurrentQuestion > 0) {
			setIndexCurrentQuestion(prev => prev - 1);
		}
	};

	useEffect(() => {
		if (indexFiltered >= 0 && indexFiltered < filteredArray.length) {
			setCurrentQuestion(filteredArray[indexFiltered]);
		}
	}, [indexFiltered]);

	const handleNextQuestionFiltered = () => {
		if (indexFiltered < filteredArray.length - 1) {
			setIndexFiltered(prev => prev + 1);
		}
	};

	const handleBackQuestionFiltered = () => {
		if (indexFiltered > 0) {
			setIndexFiltered(prev => prev - 1);
		}
	};

	const updateFilteredArray = () => {
		if (filteredArray.length !== 0) {
			setFilteredArray([]);
		}
	};

	useEffect(() => {
		if (filteredArray.length === arrayQuestions.length) {
			setCurrentQuestion(arrayQuestions[indexCurrentQuestion]);
			updateFilteredArray();
		}
	}, [filteredArray]);

	const handleFilterQuestions = (str: string) => {
		const filteredArr: [] | IQuestion[] = arrayQuestions.filter(question => {
			return question.question.toLowerCase().includes(str.toLowerCase());
		});
		setFilteredArray(filteredArr);
		setCurrentQuestion(filteredArr[0]);
	};

	return {
		currentQuestion,
		isLoading,
		error,
		handleNextQuestion,
		handleBackQuestion,
		handleFilterQuestions,
		handleNextQuestionFiltered,
		handleBackQuestionFiltered,
	};
};

export default useReduxQuestions;
