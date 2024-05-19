import { SelectOptions } from "../interfaces/selectOptions";

interface IProps {
	errorAnswer: string;
	errorQuestion: string;
	technologiesSelectOptions: SelectOptions[];
	category: SelectOptions[];
}
const isDisabled = ({
	errorAnswer,
	errorQuestion,
	technologiesSelectOptions,
	category,
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
	if (category.length > 0 && category[0].typeOption === "Выберите") {
		return true;
	}
	return false;
};

export default isDisabled;
