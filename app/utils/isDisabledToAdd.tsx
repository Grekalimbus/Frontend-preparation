import { ISelectOptions } from "../interfaces/selectOptions";

interface IProps {
	errorAnswer: string;
	errorQuestion: string;
	technologiesSelectOptions: ISelectOptions[];
	selectTypes: ISelectOptions[];
}
const isDisabled = ({
	errorAnswer,
	errorQuestion,
	technologiesSelectOptions,
	selectTypes,
}: IProps): boolean => {
	if (errorAnswer || errorQuestion) {
		return true;
	}
	if (
		technologiesSelectOptions.length > 0 &&
		technologiesSelectOptions[0].typeOption === "Выберите технологию"
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
