import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.url";
import { INewQuestion, Question, Questions } from "../interfaces/question";
import { Technologies } from "../interfaces/selectOptions";

const useMutateQuestion = (technology: string, action?: string) => {
	const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
	const [filteredArray, setFilteredArray] = useState<Question[] | []>([]);
	const [indexCurrentQuestion, setIndexCurrentQuestion] = useState<number>(0);
	const [indexFiltered, setIndexFiltered] = useState<number>(0);
	const queryClient = useQueryClient();

	// fetch data
	const fetchData = async (technology: string): Promise<Questions | null> => {
		if (technology && technology in Technologies) {
			const { data } = await axios.get<Questions>(
				`${BASE_URL}questions/${technology}Question`
			);
			return data;
		}
		return null;
	};

	const fetchCreateQuestion = async (data: INewQuestion) => {
		const response = await axios.post(
			`${BASE_URL}questions/${technology}Question`,
			data
		);
		return response.data;
	};

	const fetchDeleteQuestion = async (_id: string): Promise<Questions> => {
		const response = await axios.delete<Questions>(
			`${BASE_URL}questions/${technology}Question?id=${_id}`
		);
		return response.data;
	};

	const fetchUpdateQuestion = async (data: Question): Promise<Questions> => {
		const updateQuestion = {
			newQuestion: data.question,
			newAnswer: data.answer,
			newCategory: data.category,
		};
		const response = await axios.put<Questions>(
			`${BASE_URL}questions/${technology}Question/${data._id}`,
			updateQuestion
		);
		return response.data;
	};

	// data and methond from useQuery
	const {
		data: questions,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`${technology}Question`],
		queryFn: () => fetchData(technology),
	});

	const mutationCreate = useMutation({
		mutationFn: fetchCreateQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [`${technology}Question`] }),
	});

	const mutationDelete = useMutation({
		mutationFn: fetchDeleteQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [`${technology}Question`] }),
	});

	const mutationUpdate = useMutation({
		mutationFn: fetchUpdateQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [`${technology}Question`] }),
	});

	const createNewQuestion = (newQuestion: INewQuestion) => {
		mutationCreate.mutate(newQuestion);
	};

	const deleteQuestion = (id: string) => {
		mutationDelete.mutate(id);
	};

	const updateQuestion = (updateQuestion: Question) => {
		mutationUpdate.mutate(updateQuestion);
	};

	// useEffects
	useEffect(() => {
		fetchData(technology);
		if (questions) {
			setIndexFiltered(0);
			setIndexCurrentQuestion(0);
			setCurrentQuestion(questions[technology][0]);
		}
	}, [questions]);

	useEffect(() => {
		if (questions) setCurrentQuestion(questions[technology][0]);
	}, [technology]);

	useEffect(() => {
		setIndexFiltered(0);
		setIndexCurrentQuestion(0);
	}, [action]);

	useEffect(() => {
		if (
			questions &&
			indexCurrentQuestion >= 0 &&
			indexCurrentQuestion < questions[technology].length
		) {
			setCurrentQuestion(questions[technology][indexCurrentQuestion]);
		}
	}, [indexCurrentQuestion]);

	useEffect(() => {
		if (indexFiltered >= 0 && indexFiltered < filteredArray.length) {
			setCurrentQuestion(filteredArray[indexFiltered]);
		}
	}, [indexFiltered]);

	useEffect(() => {
		const updateFilteredArray = () => {
			if (filteredArray.length !== 0) {
				setFilteredArray([]);
				setIndexFiltered(0);
			}
		};
		if (questions && filteredArray.length === questions[technology].length) {
			setCurrentQuestion(questions[technology][indexCurrentQuestion]);
			updateFilteredArray();
		}
	}, [filteredArray]);

	// methods to switch between questions
	const nextQuestion = () => {
		if (questions && indexCurrentQuestion < questions[technology].length - 1) {
			setIndexCurrentQuestion(prev => prev + 1);
		}
	};

	const prevQuestion = () => {
		if (indexCurrentQuestion > 0) {
			setIndexCurrentQuestion(prev => prev - 1);
		}
	};

	const nextFilteredQuestion = () => {
		if (indexFiltered < filteredArray.length - 1) {
			setIndexFiltered(prev => prev + 1);
		}
	};

	const prevFilteredQuestion = () => {
		if (indexFiltered > 0) {
			setIndexFiltered(prev => prev - 1);
		}
	};

	const filterQuestions = (str: string) => {
		if (questions) {
			const filteredArr: [] | Question[] = questions[technology].filter(
				question => {
					return question.question.toLowerCase().includes(str.toLowerCase());
				}
			);
			setFilteredArray(filteredArr);
			setCurrentQuestion(filteredArr[0]);
		}
	};

	return {
		currentQuestion,
		nextQuestion,
		prevQuestion,
		filterQuestions,
		nextFilteredQuestion,
		prevFilteredQuestion,
		deleteQuestion,
		updateQuestion,
		createNewQuestion,
		isLoading,
		error,
	};
};

export default useMutateQuestion;
