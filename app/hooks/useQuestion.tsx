import IQuestion from "@/app/interfaces/question";
import QuestionService from "@/app/services/question.services";
import { useEffect, useState } from "react";

export const useQuestion = (id: string) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([]);

	// get Data from server and change state
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				setDataQuestion(response.data[id]);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);
	return dataQuestion;
};
