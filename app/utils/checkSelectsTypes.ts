import IQuestion from "../interfaces/question";

interface IParams {
	actions: string;
	technology: string;
	randomQuestion: null | IQuestion | undefined;
	currentAction: string;
}
export const isTrueToDisplay = ({
	actions,
	technology,
	randomQuestion,
	currentAction,
}: IParams): boolean => {
	if (
		actions === currentAction &&
		technology !== "Выберите технологию" &&
		randomQuestion !== null
	) {
		return true;
	}
	return false;
};
