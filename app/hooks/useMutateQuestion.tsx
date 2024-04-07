import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import IQuestion from "../interfaces/question";

type State = null | [] | IQuestion[];
type RandomQuestion = null | IQuestion;

const useMutateQuestion = (typeOption: string) => {
	const [dataQuestion, setDataQuestion] = useState<State>(null);
	const [randomQuestion, setRandomQuestion] = useState<RandomQuestion>(null);

	const defaultObject = {
		_id: "000",
		question: "Вопросы закончились",
		answer: "Вопросы закончились",
		category: typeOption,
	};
	const fetchData = async () => {
		const { data } = await axios.get(
			`http://localhost:3000/api/${typeOption}Question`
		);
		return data;
	};

	const { data } = useQuery({
		queryKey: [typeOption],
		queryFn: fetchData,
	});

	const handleRandomQuestion = (arrayData: null | [] | IQuestion[]): void => {
		if (arrayData && arrayData.length) {
			const randomIndexArray = Math.floor(Math.random() * arrayData.length);
			const filterArray = arrayData.filter(
				(item, index) => index !== randomIndexArray
			);
			setDataQuestion(filterArray);
			setRandomQuestion(arrayData[randomIndexArray]);
		}
		if (arrayData?.length === 0) {
			setRandomQuestion(defaultObject);
		}
	};

	const handleNextQuestion = (): void => {
		if (dataQuestion && dataQuestion.length) {
			const randomIndexArray = Math.floor(Math.random() * dataQuestion.length);
			const filterArray = dataQuestion.filter(
				(item, index) => index !== randomIndexArray
			);
			setDataQuestion(filterArray);
			setRandomQuestion(dataQuestion[randomIndexArray]);
		}
		if (dataQuestion?.length === 0) {
			setRandomQuestion(defaultObject);
		}
	};

	const handleFindByName = (name: string) => {
		if (data && data[typeOption].length) {
			const filterArray = data[typeOption].filter((item: IQuestion) =>
				item.question.toLowerCase().includes(name.toLowerCase())
			);
			setDataQuestion(filterArray);
			setRandomQuestion(filterArray[0]);
		}
	};

	useEffect(() => {
		if (data) {
			fetchData();
			setDataQuestion(null);
			handleRandomQuestion(data[typeOption]);
		}
	}, [typeOption, data]);

	return {
		randomQuestion,
		handleNextQuestion,
		handleFindByName,
	};
};

export default useMutateQuestion;
