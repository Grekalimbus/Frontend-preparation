import axios from "axios";
import { ISelectOptions } from "../interfaces/selectOptions";

interface IDataInput {
	[key: string]: string;
}

interface IProps {
	selectTechnologies: ISelectOptions[];
	selectTypes: ISelectOptions[];
	inputValue: IDataInput;
	setInputValue: React.Dispatch<React.SetStateAction<IDataInput>>;
}

const useAddQuestion = ({
	selectTechnologies,
	selectTypes,
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

	const endpoint = getEndpoint(
		selectTechnologies,
		selectTechnologies[0].typeOption
	);

	const createNewQuestion = async () => {
		try {
			const response = await axios.post(
				`http://localhost:3000/api/${endpoint}`,
				{
					question: inputValue.nameQuestion,
					answer: inputValue.answer,
					category: selectTypes[0].typeOption,
				}
			);
			setInputValue({
				nameQuestion: "",
				answer: "",
			});
		} catch (error) {
			console.error("Error creating question:", error);
		}
	};
	return { createNewQuestion };
};

export default useAddQuestion;
