export interface Todo {
  title: string,
  text: string,
  completed: boolean,
  date: string,
  readonly id: string
};

export interface NewTodo {
  title: string,
  text: string,
  completed: boolean,
  date: string,
  id?: string
}