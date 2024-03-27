import { useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import { ISelectOptions } from "../interfaces/selectOptions";
import "./adminPanel.scss";

interface IDataInput {
	nameQuestion: string;
	answer: string;
}

const initialTechnologies: ISelectOptions[] = [
	{
		typeOption: "Выбирете технологию",
		options: [
			{ text: "Общие", value: "commonQuestion" },
			{ text: "HTML", value: "htmlQuestion" },
			{ text: "CSS", value: "cssQuestion" },
			{ text: "JavaScript", value: "jsQuestion" },
			{ text: "TypeScript", value: "tsQuestion" },
			{ text: "React", value: "reactQuestion" },
			{ text: "Redux", value: "reduxQuestion" },
		],
	},
];

const AddQuestion = () => {
	const [inputValue, setInputValue] = useState<IDataInput>({
		nameQuestion: "",
		answer: "",
	});
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialTechnologies);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOption.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});

		setSelectOption(updateSelectOptions);
	};
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
			/>
			<InputField
				textArea={true}
				name="answer"
				value={inputValue.answer}
				type="text"
				placeholder="Ответ"
				handleChangeTextArea={handleChangeTextArea}
			/>
		</>
	);
};

export default AddQuestion;