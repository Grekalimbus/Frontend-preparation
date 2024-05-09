import { BASE_URL } from "@/app/config.url";
import { IQuestions } from "@/app/interfaces/question";
import axios from "axios";
import { AppDispatch } from "../store";
import { questionSlice } from "./QuestionSlice";

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export const fetchQuestions = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(questionSlice.actions.questionsFetching());
		const response = await axios.get<IQuestions>(`${BASE_URL}questions`);
		dispatch(questionSlice.actions.questionsFetchingSuccess(response.data));
	} catch (e) {
		dispatch(questionSlice.actions.questionsFetchingError(getErrorMessage(e)));
	}
};
