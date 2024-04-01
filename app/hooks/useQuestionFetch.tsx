import IQuestion from "@/app/interfaces/question";
import QuestionService from "@/app/services/question.services";
import { useEffect, useState } from "react";

export const useQuestionFetch = (id: string) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([]);
	const [randomItem, setRandomItem] = useState<IQuestion | null>(null);

	// get Data from server and change state
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				console.log("response", response);
				setDataQuestion(response.data[id]);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	const updateRandomItem = () => {
		if (dataQuestion.length > 0) {
			const randomIndex = Math.floor(Math.random() * dataQuestion.length);
			const item = dataQuestion[randomIndex];
			const newDataQuestion = [
				...dataQuestion.slice(0, randomIndex),
				...dataQuestion.slice(randomIndex + 1),
			];
			setRandomItem(item);
			setDataQuestion(newDataQuestion);
		}
	};

	useEffect(() => {
		updateRandomItem();
	}, [dataQuestion]);

	return { randomItem };
};
