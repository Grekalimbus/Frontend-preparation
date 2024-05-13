import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import InputField from "../components/InputField";
import { BASE_URL } from "../config.url";
import useMutateQuestion from "../hooks/useMutateQuestion";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import FlexButtons from "./FlexButtons";

interface IProps {
	technology: string;
	actions: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeleteQuestion = ({ technology, actions }: IProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const data = useMutateQuestion(technology.toLowerCase());
	const queryClient = useQueryClient();
	const technologiyEndpoint: string = technology.toLowerCase();

	const fetchDeleteQuestion = async (_id: string) => {
		const response = await axios.delete(
			`${BASE_URL}questions/${technologiyEndpoint}Question?id=${_id}`
		);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: fetchDeleteQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [technologiyEndpoint] }),
	});
	const deleteQuestion = () => {
		const id = data.currentQuestion?._id;
		if (id) mutation.mutate(id);
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		data.filterQuestions(e.target.value);
	};
	const isValidDisplay = isTrueToDisplay({
		actions,
		technology,
		question: data.currentQuestion,
		currentAction: "Удалить",
	});
	return (
		isValidDisplay && (
			<>
				<p className="elem-question-text">
					{data.currentQuestion?.question || "Вопросов нет"}
				</p>
				<InputField
					textArea={false}
					handleChangeInput={handleChangeInput}
					value={inputValue}
					type="text"
					placeholder="Фильтрация"
					name="filter"
				/>
				<FlexButtons
					firstValue="Следующий"
					secondValue="Удалить"
					handleNextQuestion={data.nextQuestion}
					handleDeleteQiestion={deleteQuestion}
				/>
			</>
		)
	);
};

export default DeleteQuestion;
