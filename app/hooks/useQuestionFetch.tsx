import IQuestion from "@/app/interfaces/question";
import QuestionService from "@/app/services/question.services";
import { useEffect, useRef, useState } from "react";

export const useQuestionFetch = (id: string) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([]);
	const randomItemRef = useRef<IQuestion | null>(null);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				const questions = response.data[id];
				setDataQuestion(questions);

				if (!randomItemRef.current && questions.length > 0) {
					const randomIndex = Math.floor(Math.random() * questions.length);
					randomItemRef.current = questions[randomIndex];
				}
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	const handleNextQuestion = (): void => {
		if (dataQuestion.length > 0) {
			const nextQuestion = dataQuestion[0];
			randomItemRef.current = nextQuestion;
			setDataQuestion(prevData => prevData.slice(1));
		}
	};

	return { randomItem: randomItemRef.current, handleNextQuestion };
};
