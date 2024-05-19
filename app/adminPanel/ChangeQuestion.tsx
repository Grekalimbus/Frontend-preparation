import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useInput from "../hooks/useInput";
import useMutateQuestion from "../hooks/useMutateQuestion";
import useSelectOption from "../hooks/useSelectOption";
import { IQuestion } from "../interfaces/question";
import {
	ISelectOptions,
	actionsForQuestions,
} from "../interfaces/selectOptions";
import { isTrueToDisplay } from "../utils/checkSelectsTypes";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";

interface IProps {
	technology: string;
	technologiesSelectOptions: ISelectOptions[];
	actions: string;
	handleChangeToggle: () => void;
}

const ChangeQuestion = ({
	technology,
	technologiesSelectOptions,
	actions,
	handleChangeToggle,
}: IProps) => {
	const [isModalWindow, setModalWindow] = useState<boolean>(false);
	const [inputValueFilter, setInputValueFilter] = useState<string>("");
	const data = useMutateQuestion(technology.toLowerCase(), actions);

	const { selectOption: category, handleChangeTypeOption: changeCategory } =
		useSelectOption([
			{
				typeOption: data.currentQuestion?.category || "Выберите",
				options: [
					{ value: "easy", text: "Легкий" },
					{ value: "middle", text: "Средний" },
				],
			},
		]);

	const {
		errors,
		inputValue,
		handleChangeInput,
		handleChangeTextArea,
		setInputValue,
	} = useInput({
		initialValue: {
			nameQuestion: "",
			answer: "",
		},
		actions,
		question: data.currentQuestion,
	});

	const handleUpdateQuestion = () => {
		if (data.currentQuestion) {
			const updateQuestionData: IQuestion = {
				_id: data.currentQuestion._id,
				question: inputValue.nameQuestion,
				answer: inputValue.answer,
				category: category[0].typeOption,
			};
			data.updateQuestion(updateQuestionData);
			setInputValue({
				nameQuestion: "",
				answer: "",
			});
			setModalWindow(!isModalWindow);
			handleChangeToggle();
		}
	};

	useEffect(() => {
		setModalWindow(false);
	}, [actions]);

	const handleChangeInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValueFilter(e.target.value);
		data.filterQuestions(e.target.value);
	};

	const toggleModalWindow = () => {
		setModalWindow(!isModalWindow);
		setInputValue({
			nameQuestion: data.currentQuestion?.question,
			answer: data.currentQuestion?.answer,
		});
		handleChangeToggle();
	};

	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		technologiesSelectOptions,
		category,
	});

	const isValidDisplay = isTrueToDisplay({
		actions,
		technology,
		question: data.currentQuestion,
		currentAction: actionsForQuestions.change,
	});
	return (
		isValidDisplay && (
			<>
				{!isModalWindow && (
					<section>
						<p className="elem-question-text">
							{data.currentQuestion?.question || "Вопросов нет"}
						</p>
						<InputField
							textArea={false}
							handleChangeInput={handleChangeInputFilter}
							value={inputValueFilter}
							type="text"
							placeholder="Фильтрация"
							name="filter"
						/>
						<FlexButtons
							firstValue="Следующий"
							secondValue={actionsForQuestions.change}
							disabled={
								data.currentQuestion?.question === "Вопросы закончились"
							}
							handleNextQuestion={data.nextQuestion}
							toggleModalWindow={toggleModalWindow}
						/>
					</section>
				)}
				{isModalWindow && data.currentQuestion && (
					<section className="change-modal-window">
						{category.map((item: ISelectOptions) => {
							return (
								<SelectOption
									width={{ width: "100%" }}
									key={item.typeOption}
									typeOption={item.typeOption}
									options={item.options}
									handleChangeTypeOption={changeCategory}
								/>
							);
						})}
						<InputField
							name="nameQuestion"
							textArea={false}
							value={inputValue.nameQuestion}
							type="text"
							placeholder="Название вопроса"
							handleChangeInput={handleChangeInput}
							error={errors.nameQuestion}
						/>
						<InputField
							textArea={true}
							name="answer"
							value={inputValue.answer}
							type="text"
							placeholder="Введите текст для изменения ответа на вопрос"
							handleChangeTextArea={handleChangeTextArea}
							error={errors.answer}
						/>
						<FlexButtons
							firstValue="Назад"
							secondValue="Изменить"
							disabled={!isModalWindow ? false : isDisabledState}
							toggleModalWindow={toggleModalWindow}
							updateQuestion={handleUpdateQuestion}
							isModalWindow={isModalWindow}
						/>
					</section>
				)}
			</>
		)
	);
};

export default ChangeQuestion;
