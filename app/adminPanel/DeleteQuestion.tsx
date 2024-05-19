import { useState } from "react";
import InputField from "../components/InputField";
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
	const data = useMutateQuestion(technology.toLowerCase(), actions);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		data.filterQuestions(e.target.value);
	};
	const deleteQuestion = () => {
		if (data.currentQuestion) data.deleteQuestion(data.currentQuestion?._id);
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
