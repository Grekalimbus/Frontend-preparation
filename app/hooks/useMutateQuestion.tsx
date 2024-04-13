import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.url";
import IQuestion from "../interfaces/question";
import { ISelectOptions } from "../interfaces/selectOptions";

type State = null | [] | IQuestion[];
type RandomQuestion = null | undefined | IQuestion;
interface IProps {
	technologyOption: string;
	selectOption?: ISelectOptions[];
	selectOptionType?: string;
}

const useMutateQuestion = ({
	technologyOption,
	selectOption,
	selectOptionType,
}: IProps) => {
	const [dataQuestion, setDataQuestion] = useState<State>(null);
	const [randomQuestion, setRandomQuestion] = useState<RandomQuestion>(null);
	const defaultObject = {
		_id: "000",
		question: "Вопросы закончились",
		answer: "Вопросы закончились",
		category: technologyOption,
	};
	const fetchData = async () => {
		const { data } = await axios.get(`${BASE_URL}${technologyOption}Question`);
		return data;
	};

	const { data } = useQuery({
		queryKey: [technologyOption],
		queryFn: fetchData,
	});

	const handleRandomQuestion = (arrayData: null | [] | IQuestion[]): void => {
		if (arrayData) {
			const arraySort = arrayData.sort((a, b): any => {
				const aNumber = parseInt((a.question.match(/^\d+/) ?? ["0"])[0]);
				const bNumber = parseInt((b.question.match(/^\d+/) ?? ["0"])[0]);
				return aNumber - bNumber;
			});
			setDataQuestion(arraySort);
			setRandomQuestion(arrayData[0]);
		}
		if (!arrayData) {
			setRandomQuestion(null);
		}
	};

	const handleNextQuestion = (): void => {
		if (!dataQuestion) {
			setRandomQuestion(undefined);
		}
		if (dataQuestion && randomQuestion) {
			const nextQuestion = parseInt(
				randomQuestion.question.match(/^\d+/)?.[0] ?? "0"
			);

			setRandomQuestion(dataQuestion[nextQuestion]);
		}
	};
	const handleBackQuestion = () => {
		if (!dataQuestion) {
			setRandomQuestion(undefined);
		}
		if (dataQuestion && randomQuestion) {
			const nextQuestion = parseInt(
				randomQuestion.question.match(/^\d+/)?.[0] ?? "0"
			);
			if (nextQuestion > 1) {
				setRandomQuestion(dataQuestion[nextQuestion - 2]);
			}
		}
	};

	const handleFindByName = (name: string) => {
		if (data && data[technologyOption].length) {
			const filterArray = data[technologyOption].filter((item: IQuestion) =>
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
			handleRandomQuestion(data[technologyOption]);
			handleSortCategory(data[technologyOption]);
		}
	}, [technologyOption, data, selectOption, selectOptionType]);

	return {
		randomQuestion,
		handleNextQuestion,
		handleBackQuestion,
		handleFindByName,
	};
};

export default useMutateQuestion;
