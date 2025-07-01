import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ITodo, type TFilter } from "@/types";
import { type RootState } from "@/redux/store";

interface InitialState {
  tasks: ITodo[];
  filter: TFilter;
}

const initialState: InitialState = {
  tasks: [
    {
      _id: "asdfawa53434357df",
      title: "Initiate Frontend",
      description: "Jot durto shombhob kore felte hobe",
      priority: "high",
      dueDate: "2024-11-01T18:00:00.000Z",
      isCompleted: false,
      member: "Undefined",
    },
  ],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITodo>) => {
      state.tasks.push(action.payload);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((item) =>
        item._id === action.payload
          ? (item.isCompleted = !item.isCompleted)
          : item
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((item) => item._id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<ITodo>) => {
      state.tasks.forEach((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    updateFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  return state.todo.tasks;
};

export const selectFilteredTasks = (state: RootState) => {
  const { filter } = state.todo;

  if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else {
    return state.todo.tasks;
  }
};

export const {
  addTask,
  toggleCompleteState,
  deleteTask,
  updateTask,
  updateFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
