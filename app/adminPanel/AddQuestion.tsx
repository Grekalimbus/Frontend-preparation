import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useAddQuestion from "../hooks/useAddQuestion";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useInput from "../hooks/useInput";
import { ISelectOptions } from "../interfaces/selectOptions";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

const AddQuestion = () => {
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
	});
	const { selectOption, handleChangeTypeOption } = useComplexSelectOption();
	const { createNewQuestion } = useAddQuestion({
		selectOption,
		inputValue,
		setInputValue,
	});

	const isDisabled =
		errors.answer ||
		errors.nameQuestion ||
		selectOption[0].typeOption === "Выбирете технологию"
			? true
			: false;

	return (
		<>
			{selectOption.map((item: ISelectOptions) => {
				return (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={handleChangeTypeOption}
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
				placeholder="Ответ"
				handleChangeTextArea={handleChangeTextArea}
				error={errors.answer}
			/>
			<FlexButtons
				firstValue="Следующий"
				secondValue="Добавить"
				disabled={isDisabled}
				createNewQuestion={createNewQuestion}
			/>
		</>
	);
};

export default AddQuestion;
