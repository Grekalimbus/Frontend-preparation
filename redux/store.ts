import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionReducer from "./reducers/QuestionSlice";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
	userReducer,
	questionReducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
