import InputField from "../components/InputField";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import useMutateQuestion from "../hooks/useMutateQuestion";
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
	const { randomQuestion, handleNextQuestion } = useMutateQuestion(
		typeOption.toLowerCase()
	);
	console.log("randomQuestion", randomQuestion);

	const { deleteQuestion }: IHook = useDeleteQuestion({
		_id: randomQuestion?._id,
		typeOption: typeOption.toLowerCase(),
		handleNextQuestion,
	});
	console.log("randomQuestion", randomQuestion);
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
