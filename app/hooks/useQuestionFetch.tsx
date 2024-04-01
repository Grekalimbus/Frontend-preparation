import IQuestion from "@/app/interfaces/question";
import QuestionService from "@/app/services/question.services";
import { useEffect, useState } from "react";

const arrayTachnologies = [
	"common",
	"css",
	"html",
	"javascript",
	"typescript",
	"react",
	"redux",
];

export const useQuestionFetch = (id: string) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([]);
	const [randomItem, setRandomItem] = useState<IQuestion | null>(null);
	console.log("id", id);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				const questions = response.data[id];
				setDataQuestion(questions);

				if (!randomItem && questions.length > 0) {
					const randomIndex = Math.floor(Math.random() * questions.length);
					setRandomItem(questions[randomIndex]);
				}
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		if (arrayTachnologies.includes(id)) {
			fetchData();
		}
	}, [id]);

	const handleNextQuestion = (): void => {
		if (dataQuestion.length > 0) {
			const nextQuestion = dataQuestion[0];
			setRandomItem(nextQuestion);
			setDataQuestion(prevData => prevData.slice(1));
		}
	};

	return { randomItem, handleNextQuestion };
};
