import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import IQuestion from "../interfaces/question";

type State = null | [] | IQuestion[];
type RandomQuestion = null | IQuestion;

const useMutateQuestion = (typeOption: string) => {
	const [dataQuestion, setDataQuestion] = useState<State>(null);
	const [randomQuestion, setRandomQuestion] = useState<RandomQuestion>(null);

	const fetchData = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:3000/api/${typeOption}Question`
			);
			return data;
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	const { data } = useQuery({
		queryKey: [typeOption],
		queryFn: fetchData,
	});

	const handleRandomQuestion = (arrayData: null | [] | IQuestion[]) => {
		console.log("arrayData.length", arrayData);
		if (arrayData && arrayData.length) {
			const randomIndexArray = Math.floor(Math.random() * arrayData.length);
			const filterArray = arrayData.filter(
				(item, index) => index !== randomIndexArray
			);
			setDataQuestion(filterArray);
			setRandomQuestion(arrayData[randomIndexArray]);
		}
	};

	const handleNextQuestion = () => {
		console.log("dataQuestion?.length", dataQuestion?.length);
		if (dataQuestion && dataQuestion.length) {
			const randomIndexArray = Math.floor(Math.random() * dataQuestion.length);
			const filterArray = dataQuestion.filter(
				(item, index) => index !== randomIndexArray
			);
			setDataQuestion(filterArray);
			setRandomQuestion(dataQuestion[randomIndexArray]);
		}
		if (dataQuestion?.length === 0) {
			setRandomQuestion({
				_id: "000",
				question: "Вопросы закончились",
				answer: "Вопросы закончились",
				category: typeOption,
			});
		}
	};

	useEffect(() => {
		fetchData();
		if (data) {
			handleRandomQuestion(data[typeOption]);
		}
	}, [typeOption, data]);

	return { randomQuestion, handleNextQuestion };
};

export default useMutateQuestion;
