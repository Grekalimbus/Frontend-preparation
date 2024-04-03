import { useState } from "react";
import InputField from "../components/InputField";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useMutateQuestion from "../hooks/useMutateQuestion";
import FlexButtons from "./FlexButtons";

interface IProps {
	isVisibleElem: boolean;
	typeOption: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IHook {
	deleteQuestion: () => Promise<void>;
}

const DeleteQuestion = ({ isVisibleElem, typeOption }: IProps) => {
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
	return (
		isVisibleElem &&
		typeOption !== "Выберите технологию" &&
		randomQuestion !== null && (
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
