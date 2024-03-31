import axios from "axios";
import { ISelectOptions } from "../interfaces/selectOptions";

interface IDataInput {
	[key: string]: string;
}

interface IProps {
	selectOption: ISelectOptions[];
	inputValue: IDataInput;
	setInputValue: React.Dispatch<React.SetStateAction<IDataInput>>;
}

const useAddQuestion = ({
	selectOption,
	inputValue,
	setInputValue,
}: IProps) => {
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
	return { createNewQuestion };
};

export default useAddQuestion;
