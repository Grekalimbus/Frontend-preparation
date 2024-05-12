import { questionApi } from "@/app/services/QuestionService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/QuestionSlice";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
	userReducer,
	questionReducer,
	[questionApi.reducerPath]: questionApi.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(questionApi.middleware),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
