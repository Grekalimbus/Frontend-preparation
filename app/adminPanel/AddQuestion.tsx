import axios from "axios";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import SelectOption from "../components/SelectOption";
import { ISelectOptions } from "../interfaces/selectOptions";
import { validator } from "../utils/validator";
import validatorConfig from "../utils/validatorConfig";
import FlexButtons from "./FlexButtons";
import "./adminPanel.scss";

interface IDataInput {
	[key: string]: string;
}

const initialTechnologies: ISelectOptions[] = [
	{
		typeOption: "Выбирете технологию",
		options: [
			{ text: "Общие", value: "commonQuestion" },
			{ text: "HTML", value: "htmlQuestion" },
			{ text: "CSS", value: "cssQuestion" },
			{ text: "JavaScript", value: "javascriptQuestion" },
			{ text: "TypeScript", value: "typescriptQuestion" },
			{ text: "React", value: "reactQuestion" },
			{ text: "Redux", value: "reduxQuestion" },
		],
	},
];

const AddQuestion = () => {
	const [errors, setErrors] = useState<IDataInput>({});
	const [inputValue, setInputValue] = useState<IDataInput>({
		nameQuestion: "",
		answer: "",
	});
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialTechnologies);

	const isDisabled =
		errors.answer ||
		errors.nameQuestion ||
		selectOption[0].typeOption === "Выбирете технологию"
			? true
			: false;

	const validate = () => {
		const errors = validator(inputValue, validatorConfig);
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	useEffect(() => {
		validate();
	}, [inputValue]);

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

	const getEndpoint = (
		obj: ISelectOptions[],
		typeOption: string
	): string | null => {
		const foundOption = obj.find(option => option.typeOption === typeOption);
		return foundOption
			? foundOption.options.find(opt => opt.text === typeOption)?.value || null
			: null;
	};

	const endpoint = getEndpoint(selectOption, selectOption[0].typeOption);

	const createNewQuestion = async () => {
		try {
			const response = await axios.post(
				`http://localhost:3000/api/${endpoint}`,
				{
					question: inputValue.nameQuestion,
					answer: inputValue.answer,
				}
			);
			setInputValue({
				nameQuestion: "",
				answer: "",
			});
			console.log("Question created successfully:", response.data);
		} catch (error) {
			console.error("Error creating question:", error);
		}
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
