import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useAddQuestion from "../hooks/useAddQuestion";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useInput from "../hooks/useInput";
import {
	ISelectOptions,
	initialTechnologies,
	initialTypes,
} from "../interfaces/selectOptions";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface ISelectHook {
	selectOption: ISelectOptions[];
	handleChangeTypeOption: (
		updateSelectValue: string,
		selectField: string
	) => unknown;
}

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

	const selectTechnologies: ISelectHook =
		useComplexSelectOption(initialTechnologies);
	const selectTypes: ISelectHook = useComplexSelectOption(initialTypes);
	console.log("selectTypes.selectOption", selectTypes.selectOption);

	const { createNewQuestion } = useAddQuestion({
		selectTechnologies: selectTechnologies.selectOption,
		selectTypes: selectTypes.selectOption,
		inputValue,
		setInputValue,
	});

	const isDisabled = () => {
		if (errors.answer || errors.nameQuestion) {
			return true;
		}
		if (
			selectTechnologies.selectOption.length > 0 &&
			selectTechnologies.selectOption[0].typeOption === "Выбирете технологию"
		) {
			return true;
		}
		if (
			selectTypes.selectOption.length > 0 &&
			selectTypes.selectOption[0].typeOption === "Выбирете категорию"
		) {
			return true;
		}
		return false;
	};

	const isDisabledState = isDisabled();

	// const isDisabled =
	// 	errors.answer ||
	// 	errors.nameQuestion ||
	// 	(selectTechnologies.selectOption.length > 0 &&
	// 		selectTechnologies.selectOption[0].typeOption === "Выбирете технологию")
	// 		? true
	// 		: false;

	return (
		<>
			{selectTechnologies.selectOption.map((item: ISelectOptions) => {
				return (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={selectTechnologies.handleChangeTypeOption}
					/>
				);
			})}
			{selectTypes.selectOption.map((item: ISelectOptions) => {
				return (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={selectTypes.handleChangeTypeOption}
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
				disabled={isDisabledState}
				createNewQuestion={createNewQuestion}
			/>
		</>
	);
};

export default AddQuestion;
