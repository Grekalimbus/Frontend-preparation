import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.url";
import { IQuestion, IQuestions } from "../interfaces/question";

const useMutateQuestion = (technology: string, action?: string) => {
	const [arrayQuestions, setArrayQuestions] = useState<IQuestion[] | []>([]);
	const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
		null
	);
	const [filteredArray, setFilteredArray] = useState<IQuestion[] | []>([]);
	const [indexCurrentQuestion, setIndexCurrentQuestion] = useState<number>(0);
	const [indexFiltered, setIndexFiltered] = useState<number>(0);
	const queryClient = useQueryClient();

	const fetchData = async () => {
		const { data } = await axios.get<IQuestions>(`${BASE_URL}questions`);
		return data;
	};
	const {
		data: questions,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["questions"],
		queryFn: fetchData,
	});

	const fetchDeleteQuestion = async (_id: string) => {
		const response = await axios.delete<IQuestions>(
			`${BASE_URL}questions/${technology}Question?id=${_id}`
		);
		return response.data;
	};

	const fetchUpdateQuestion = async (data: IQuestion) => {
		const updateQuestion = {
			newQuestion: data.question,
			newAnswer: data.answer,
			newCategory: data.category,
		};
		const response = await axios.put(
			`${BASE_URL}questions/${technology}Question/${data._id}`,
			updateQuestion
		);
		return response.data;
	};

	const mutationDelete = useMutation({
		mutationFn: fetchDeleteQuestion,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
	});

	const mutationUpdate = useMutation({
		mutationFn: fetchUpdateQuestion,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
	});

	const deleteQuestion = () => {
		if (currentQuestion && questions) {
			mutationDelete.mutate(currentQuestion._id);
			setArrayQuestions(questions[technology]);
		}
	};

	const updateQuestion = (updateQuestion: IQuestion) => {
		if (currentQuestion && questions) {
			mutationUpdate.mutate(updateQuestion);
			setArrayQuestions(questions[technology]);
		}
	};

	useEffect(() => {
		fetchData();
		if (questions) {
			setArrayQuestions(questions[technology]);
			setIndexFiltered(0);
			setIndexCurrentQuestion(0);
		}
	}, [questions]);

	useEffect(() => {
		if (questions) setArrayQuestions(questions[technology]);
	}, [technology]);

	useEffect(() => {
		setIndexFiltered(0);
		setIndexCurrentQuestion(0);
	}, [action]);

	useEffect(() => {
		if (arrayQuestions && arrayQuestions.length > 0) {
			setCurrentQuestion(arrayQuestions[0]);
		}
	}, [arrayQuestions]);

	useEffect(() => {
		if (
			indexCurrentQuestion >= 0 &&
			indexCurrentQuestion < arrayQuestions.length
		) {
			setCurrentQuestion(arrayQuestions[indexCurrentQuestion]);
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
		if (filteredArray.length === arrayQuestions.length) {
			setCurrentQuestion(arrayQuestions[indexCurrentQuestion]);
			updateFilteredArray();
		}
	}, [filteredArray]);

	const nextQuestion = () => {
		if (indexCurrentQuestion < arrayQuestions.length - 1) {
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
		const filteredArr: [] | IQuestion[] = arrayQuestions.filter(question => {
			return question.question.toLowerCase().includes(str.toLowerCase());
		});
		setFilteredArray(filteredArr);
		setCurrentQuestion(filteredArr[0]);
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
		isLoading,
		error,
	};
};

export default useMutateQuestion;
