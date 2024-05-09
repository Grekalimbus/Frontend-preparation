import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
	userReducer,
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
