import { IQuestion } from "../interfaces/question";

interface IParams {
	actions: string;
	technology: string;
	question: null | IQuestion;
	currentAction: string;
}
export const isTrueToDisplay = ({
	actions,
	technology,
	question,
	currentAction,
}: IParams): boolean => {
	if (
		actions === currentAction &&
		technology !== "Выберите технологию" &&
		question !== null
	) {
		return true;
	}
	return false;
};
