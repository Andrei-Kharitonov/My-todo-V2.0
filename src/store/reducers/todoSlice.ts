import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetTodos, fetchAddTodo, fetchRedactTodo } from "./todoMiddleware";
import { Todo } from "../../interface/Todo-interface";

interface TodoState {
  todos: Todo[],
  loading: boolean
}

const initialState: TodoState = {
  todos: [],
  loading: true
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      state.todos = state.todos.map(todo => todo.id == id ? Object.assign({}, todo, { completed: true }) : todo);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchAddTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchRedactTodo.fulfilled, (state, action) => {
        let id = action.payload!.id;
        state.todos = state.todos.map(todo => todo.id == id
          ? Object.assign({}, todo, {
            title: action.payload!.title,
            text: action.payload!.text,
            date: action.payload!.date
          })
          : todo);
      });
  }
});

export const { setLoading, deleteTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer;