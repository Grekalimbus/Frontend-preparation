import { ISelectOptions } from "../interfaces/selectOptions";

interface IProps {
	errorAnswer: string;
	errorQuestion: string;
	selectTechnologies: ISelectOptions[];
	selectTypes: ISelectOptions[];
}
const isDisabled = ({
	errorAnswer,
	errorQuestion,
	selectTechnologies,
	selectTypes,
}: IProps): boolean => {
	if (errorAnswer || errorQuestion) {
		return true;
	}
	if (
		selectTechnologies.length > 0 &&
		selectTechnologies[0].typeOption === "Выберите технологию"
	) {
		return true;
	}
	if (
		selectTypes.length > 0 &&
		selectTypes[0].typeOption === "Выберите категорию"
	) {
		return true;
	}
	return false;
};

export default isDisabled;
