import { useState } from "react";
import InputField from "../components/InputField";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useMutateQuestion from "../hooks/useMutateQuestion";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import FlexButtons from "./FlexButtons";

interface IProps {
	technologiesOptions: string;
	selectOption: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IHook {
	deleteQuestion: () => Promise<void>;
}

const DeleteQuestion = ({ technologiesOptions, selectOption }: IProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion(technologiesOptions.toLowerCase());
	const { deleteQuestion }: IHook = useDeleteQuestion({
		_id: randomQuestion?._id,
		technology: technologiesOptions.toLowerCase(),
		handleNextQuestion,
	});
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
