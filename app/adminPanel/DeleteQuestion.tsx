import { useEffect } from "react";
import InputField from "../components/InputField";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import { useQuestionFetch } from "../hooks/useQuestionFetch";
import FlexButtons from "./FlexButtons";

interface IProps {
	isVisibleElem: boolean;
	typeOption: string;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IHook {
	deleteQuestion: () => Promise<void>;
}

const DeleteQuestion = ({
	isVisibleElem,
	inputValue,
	typeOption,
	handleChangeInput,
}: IProps) => {
	const { randomItem, handleNextQuestion } = useQuestionFetch(
		typeOption.toLowerCase()
	);
	const { deleteQuestion }: IHook = useDeleteQuestion({
		_id: randomItem?._id,
		typeOption: typeOption.toLowerCase(),
		handleNextQuestion,
	});
	console.log("randomItem", randomItem);
	useEffect(() => {
		handleNextQuestion();
	}, [typeOption]);

	return (
		isVisibleElem &&
		typeOption !== "Выберите технологию" &&
		randomItem && (
			<>
				<p className="elem-question-text">{randomItem?.question}</p>
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
