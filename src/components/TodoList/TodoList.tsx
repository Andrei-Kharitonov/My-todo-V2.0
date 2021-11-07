import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Todo } from "../../interface/Todo-interface";
import { RootState } from "../../store/store";
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (!todos.length) {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px", color: "#2196f3" }}>No todo!</h3>
    );
  } else {
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <Card className="todo" variant="outlined">
                <CardContent style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  paddingBottom: "15px"
                }}>
                  <Link href={`todo/${todo.id}`}>
                    <a>
                      <h3 className={todo.completed ? "todo__title todo__title_comp" : "todo__title"}>
                        {todo.title}
                      </h3>
                    </a>
                  </Link>
                  <div className={todo.completed ? "todo__status todo__status_comp" : "todo__status"}>
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

export default TodoList;