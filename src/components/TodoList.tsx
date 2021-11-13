import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Todo } from "../interface/Todo-interface";
import { RootState } from "../store/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface TodoListProps {
  allTodos: Todo[],
  todoSlice?: number
};

function TodoList({ allTodos, todoSlice }: TodoListProps): JSX.Element {
  let loading = useSelector((state: RootState) => state.todo.loading);
  let todos = allTodos.slice(todoSlice ?? 0);

  if (loading) {
    return (
      <Box className="todoList__loading">
        <CircularProgress size={45} />
      </Box>
    );
  } else if (!todos.length) {
    return (
      <h3 className="todoList__noTodo">
        <Link href="/create-todo">
          <a>No todos!</a>
        </Link>
      </h3>
    );
  } else {
    return (
      <ul className="todoList__list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <Link href={"/todo/[id]"} as={`/todo/${todo.id}`}>
                <a>
                  <Card className="todoList__todoCard" variant="outlined">
                    <CardContent
                      className="todoList__todoCard-container"
                      style={{ padding: "15px", paddingBottom: "15px" }}
                    >
                      <h3
                        className="todoList__todoCard-title"
                        style={{ color: todo.completed ? "#00a152" : "inherit" }}
                      >
                        {todo.title}
                      </h3>
                      <div
                        className="todoList__todoCard-status"
                        style={{ color: todo.completed ? "#00a152" : "#1976d2" }}
                      >
                        {todo.completed ? "Completed" : "Not completed"}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TodoList;