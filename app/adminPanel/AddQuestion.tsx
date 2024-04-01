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
	selectTechnologies: ISelectOptions[];
	textSelectOption: string;
}

const AddQuestion = ({ selectTechnologies, textSelectOption }: IProps) => {
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

	const selectTypes: ISelectHook = useComplexSelectOption(initialTypes);

	const { createNewQuestion } = useAddQuestion({
		selectTechnologies,
		selectTypes: selectTypes.selectOption,
		inputValue,
		setInputValue,
	});

	const isDisabledState: boolean = isDisabled({
		errorAnswer: errors.answer,
		errorQuestion: errors.nameQuestion,
		selectTechnologies,
		selectTypes: selectTypes.selectOption,
	});

	return (
		textSelectOption === "Добавить" && (
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
