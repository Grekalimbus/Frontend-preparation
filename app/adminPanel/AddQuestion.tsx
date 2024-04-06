import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import useAddQuestion from "../hooks/useAddQuestion";
import useComplexSelectOption from "../hooks/useComplexSelectOption";
import useInput from "../hooks/useInput";
import { ISelectHook } from "../interfaces/selectHook";
import { ISelectOptions, initialTypes } from "../interfaces/selectOptions";
import isDisabled from "../utils/isDisabledToAdd";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface IProps {
	technologiesSelectOptions: ISelectOptions[];
	selectOption: string;
}

const AddQuestion = ({ technologiesSelectOptions, selectOption }: IProps) => {
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
		selectOption,
	});

	const selectTypes: ISelectHook = useComplexSelectOption(initialTypes);

	const { createNewQuestion } = useAddQuestion({
		technologiesSelectOptions:
			technologiesSelectOptions[0].typeOption.toLowerCase(),
		selectTypes: selectTypes.selectOption,
		inputValue,
		setInputValue,
	});
	// console.log("selectTypes", selectTypes.selectOption[0].typeOption);
	console.log(
		"technologiesSelectOptions",
		technologiesSelectOptions[0].typeOption
	);
	// console.log("inputValue", inputValue);
	// console.log("setInputValue", setInputValue);
	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		technologiesSelectOptions,
		selectTypes: selectTypes.selectOption,
	});

	return (
		selectOption === "Добавить" && (
			<>
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
		)
	);
};

export default AddQuestion;
