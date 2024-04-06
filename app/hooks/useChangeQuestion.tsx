import axios from "axios";
import { ISelectOptions } from "../interfaces/selectOptions";

interface IDataInput {
	[key: string]: string;
}

interface IProps {
	_id: string | null | undefined;
	technologiesSelectOptions: string;
	selectTypes: ISelectOptions[];
	inputValue: IDataInput;
	setInputValue: React.Dispatch<React.SetStateAction<IDataInput>>;
}

const useChangeQuestion = ({
	_id,
	technologiesSelectOptions,
	selectTypes,
	inputValue,
	setInputValue,
}: IProps) => {
	const updateQuestion = async () => {
		try {
			if (_id) {
				const response = await axios.put(
					`http://localhost:3000/api/${technologiesSelectOptions}Question/${_id}`,
					{
						newQuestion: inputValue.nameQuestion,
						newAnswer: inputValue.answer,
						newCategory: selectTypes[0].typeOption,
					}
				);
				setInputValue({
					nameQuestion: "",
					answer: "",
				});
			}
		} catch (error) {
			console.error("Error creating question:", error);
		}
	};
	return { updateQuestion };
};

export default useChangeQuestion;
