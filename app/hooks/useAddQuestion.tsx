import axios from "axios";
import { ISelectOptions } from "../interfaces/selectOptions";

interface IDataInput {
	[key: string]: string;
}

interface IProps {
	technologiesSelectOptions: string;
	selectTypes: ISelectOptions[];
	inputValue: IDataInput;
	setInputValue: React.Dispatch<React.SetStateAction<IDataInput>>;
}

const useAddQuestion = ({
	technologiesSelectOptions,
	selectTypes,
	inputValue,
	setInputValue,
}: IProps) => {
	const createNewQuestion = async () => {
		try {
			const response = await axios.post(
				`http://localhost:3000/api/${technologiesSelectOptions}Question`,
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
