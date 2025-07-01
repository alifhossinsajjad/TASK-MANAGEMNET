export interface ITodo {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  isCompleted: true | false;
  member: string | "Undefined";
}

export type TFilter = "all" | "high" | "medium" | "low";

export interface IUser {
  name: string;
  _id: string;
}
