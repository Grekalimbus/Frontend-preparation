import { IQuestions } from "@/app/interfaces/question";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface QuestionState {
	questions: IQuestions;
	isLoading: boolean;
	error: string;
}

const emptyData: IQuestions = {
	common: [],
	html: [],
	css: [],
	javascript: [],
	typescript: [],
	react: [],
	redux: [],
};

const initialState: QuestionState = {
	questions: emptyData,
	isLoading: false,
	error: "",
};

export const questionSlice = createSlice({
	name: "question",
	initialState,
	reducers: {
		questionsFetching(state) {
			state.isLoading = true;
		},
		questionsFetchingSuccess(state, action: PayloadAction<IQuestions>) {
			state.isLoading = false;
			state.error = "";
			state.questions = action.payload;
		},
		questionsFetchingError(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export default questionSlice.reducer;
