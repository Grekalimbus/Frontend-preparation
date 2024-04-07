import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import InputField from "../components/InputField";
import useMutateQuestion from "../hooks/useMutateQuestion";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import FlexButtons from "./FlexButtons";

interface IProps {
	technologiesOptions: string;
	selectOption: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeleteQuestion = ({ technologiesOptions, selectOption }: IProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion({ typeOption: technologiesOptions.toLowerCase() });
	const queryClient = useQueryClient();
	const technologiyEndpoint: string = technologiesOptions.toLowerCase();

	const fetchDeleteQuestion = async (_id: string) => {
		const response = await axios.delete(
			`http://localhost:3000/api/${technologiyEndpoint}Question?id=${_id}`
		);
		return response.data;
	};
	const mutation = useMutation({
		mutationFn: fetchDeleteQuestion,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [technologiyEndpoint] }),
	});
	const deleteQuestion = () => {
		const id = randomQuestion?._id;
		if (id) mutation.mutate(id);
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleFindByName(e.target.value);
	};
	const isValidDisplay = isTrueToDisplay({
		selectOption,
		technologiesOptions,
		randomQuestion,
		currentSelectOption: "Удалить",
	});
	return (
		isValidDisplay && (
			<>
				<p className="elem-question-text">
					{randomQuestion?.question || "Вопросов нет"}
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
					handleNextQuestion={handleNextQuestion}
					handleDeleteQiestion={deleteQuestion}
				/>
			</>
		)
	);
};

export default DeleteQuestion;
