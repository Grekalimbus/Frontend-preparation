import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

interface TodosState {
	todos: Todo[];
	status: "loading" | "fulfilled" | "rejected" | null;
	error: string | null;
}

const initialState: TodosState = {
	todos: [
		{
			id: "1",
			text: "Sample todo",
			completed: false,
		},
	],
	status: null,
	error: null,
};

export const fetchTodos = createAsyncThunk(
	"todos/fetchTodos",
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10"
			);

			if (!response.ok) {
				throw new Error("Server Error!");
			}

			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<{ text: string }>) => {
			state.todos.push({
				id: new Date().toISOString(),
				text: action.payload.text,
				completed: false,
			});
		},
		toggleComplete: (state, action: PayloadAction<{ id: string }>) => {
			const toggledTodo = state.todos.find(
				todo => todo.id === action.payload.id
			);
			if (toggledTodo) {
				toggledTodo.completed = !toggledTodo.completed;
			}
		},
		removeTodo: (state, action: PayloadAction<{ id: string }>) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTodos.pending, (state, action) => {
			state.status = "loading";
			state.error = null;
		});
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.status = "fulfilled";
			state.todos = action.payload;
		});
		builder.addCase(fetchTodos.rejected, (state, action) => {
			state.status = "rejected";
			state.error = null;
		});
	},
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
