import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config.url";
import { IQuestions } from "../interfaces/question";

export const questionApi = createApi({
	reducerPath: "questionApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: builder => ({
		fetchQuestions: builder.query<IQuestions[], string>({
			query: () => "questions",
		}),
	}),
});

export const { useFetchQuestionsQuery } = questionApi;
