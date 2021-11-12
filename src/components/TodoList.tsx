import Link from "next/link";
import { Todo } from "../interface/Todo-interface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface TodoListProps {
  todos: Todo[],
};

export default function TodoList({ todos }: TodoListProps): JSX.Element {
  if (!todos.length) {
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
              <Card className="todoList__todoCard" variant="outlined">
                <CardContent
                  className="todoList__todoCard-container"
                  style={{ padding: "15px", paddingBottom: "15px" }}
                >
                  <Link href={"/todo/[id]"} as={`/todo/${todo.id}`}>
                    <a>
                      <h3
                        className="todoList__todoCard-title"
                        style={{ color: todo.completed ? "#00a152" : "inherit" }}
                      >
                        {todo.title}
                      </h3>
                    </a>
                  </Link>
                  <div
                    className="todoList__todoCard-status"
                    style={{ color: todo.completed ? "#00a152" : "#1976d2" }}
                  >
                    {todo.completed ? "Completed" : "Not completed"}
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    );
  }
}