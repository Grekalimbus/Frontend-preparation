import InputField from "../components/InputField";
import { useQuestionFetch } from "../hooks/useQuestionFetch";
import FlexButtons from "./FlexButtons";

interface IProps {
	isVisibleElem: boolean;
	typeOption: string;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
	// console.log("randomItem", randomItem);

	return (
		isVisibleElem &&
		typeOption !== "Выберите технологию" && (
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
				/>
			</>
		)
	);
};

export default DeleteQuestion;
