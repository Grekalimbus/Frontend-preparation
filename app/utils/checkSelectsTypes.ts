import IQuestion from "../interfaces/question";

interface IParams {
	selectOption: string;
	technologiesOptions: string;
	randomQuestion: null | IQuestion;
	currentSelectOption: string;
}
export const isTrueToDisplay = ({
	selectOption,
	technologiesOptions,
	randomQuestion,
	currentSelectOption,
}: IParams): boolean => {
	if (
		selectOption === currentSelectOption &&
		technologiesOptions !== "Выберите технологию" &&
		randomQuestion !== null
	) {
		return true;
	}
	return false;
};
