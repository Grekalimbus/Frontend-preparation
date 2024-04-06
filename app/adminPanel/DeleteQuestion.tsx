import { useState } from "react";
import InputField from "../components/InputField";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useMutateQuestion from "../hooks/useMutateQuestion";
import FlexButtons from "./FlexButtons";

interface IProps {
	typeOption: string;
	selectOption: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IHook {
	deleteQuestion: () => Promise<void>;
}

const DeleteQuestion = ({ typeOption, selectOption }: IProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const { randomQuestion, handleNextQuestion, handleFindByName } =
		useMutateQuestion(typeOption.toLowerCase());
	const { deleteQuestion }: IHook = useDeleteQuestion({
		_id: randomQuestion?._id,
		typeOption: typeOption.toLowerCase(),
		handleNextQuestion,
	});
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleFindByName(e.target.value);
	};
	const isTrueToDisplay = () => {
		if (
			typeOption !== "Выберите технологию" &&
			randomQuestion !== null &&
			selectOption === "Удалить"
		) {
			return true;
		}
		return false;
	};
	return (
		isTrueToDisplay() && (
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
