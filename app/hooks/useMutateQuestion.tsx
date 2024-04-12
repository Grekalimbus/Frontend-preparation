import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.url";
import IQuestion from "../interfaces/question";
import { ISelectOptions } from "../interfaces/selectOptions";

type State = null | [] | IQuestion[];
type RandomQuestion = null | IQuestion;
interface IProps {
	typeOption: string;
	selectOption?: ISelectOptions[];
}

const useMutateQuestion = ({ typeOption, selectOption }: IProps) => {
	const [dataQuestion, setDataQuestion] = useState<State>(null);
	const [randomQuestion, setRandomQuestion] = useState<RandomQuestion>(null);
	const defaultObject = {
		_id: "000",
		question: "Вопросы закончились",
		answer: "Вопросы закончились",
		category: typeOption,
	};
	const fetchData = async () => {
		const { data } = await axios.get(`${BASE_URL}${typeOption}Question`);
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
		if (dataQuestion?.length === 0) {
			setRandomQuestion(defaultObject);
		}
		if (dataQuestion && dataQuestion.length) {
			const randomIndexArray = Math.floor(Math.random() * dataQuestion.length);
			const filterArray = dataQuestion.filter(
				(item: IQuestion, index: number) => index !== randomIndexArray
			);

			setDataQuestion(filterArray);
			setRandomQuestion(dataQuestion[randomIndexArray]);
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

	const handleSortCategory = (arrayData: IQuestion[]) => {
		if (
			arrayData &&
			selectOption &&
			selectOption[0].typeOption !== "Категория"
		) {
			if (selectOption[0].typeOption !== "Все") {
				const category = selectOption[0].typeOption;
				const filterByCategory = arrayData.filter(
					(item: IQuestion) => item.category === category
				);
				if (filterByCategory?.length === 0) {
					setRandomQuestion(defaultObject);
				} else {
					setDataQuestion(filterByCategory);
					setRandomQuestion(filterByCategory[0]);
				}
			}
			if (selectOption[0].typeOption === "Все") {
				setDataQuestion(arrayData);
				setRandomQuestion(arrayData[0]);
			}
		}
	};

	useEffect(() => {
		if (data) {
			fetchData();
			handleRandomQuestion(data[typeOption]);
			handleSortCategory(data[typeOption]);
		}
	}, [typeOption, data, selectOption]);

	return {
		randomQuestion,
		handleNextQuestion,
		handleFindByName,
	};
};

export default useMutateQuestion;
