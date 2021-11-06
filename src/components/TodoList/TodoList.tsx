import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { Todo } from "../../interface/Todo-interface";
import { Styles } from "../../interface/Styles-interface";
import { RootState } from "../../store/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface TodoListProps {
  allTodos: Todo[],
  styles: Styles,
  todoSlice: number
};

function TodoList({ allTodos, styles, todoSlice }: TodoListProps): JSX.Element {
  let loading = useSelector((state: RootState) => state.todo.loading);
  let todos = allTodos.slice(todoSlice);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (todos.length == 0) {
    return (
      <h3 style={{ textAlign: "center", fontSize: "23px", color: "#2196f3" }}>No todo!</h3>
    );
  } else {
    return (
      <ul style={styles.ul}>
        {todos.map(todo => {
          return (
            <li key={todo.id} style={styles.li}>
              <Card className="todo" variant="outlined" style={styles.card}>
                <CardContent style={styles.cardContent}>
                  <Link href={`todo/${todo.id}`}>
                    <a>
                      <h3 className={todo.completed ? "todo__title todo__title_comp" : "todo__title"} style={styles.title}>
                        {todo.title}
                      </h3>
                    </a>
                  </Link>
                  <div className={todo.completed ? "todo__status todo__status_comp" : "todo__status"}>
                    Status: {todo.completed ? "Completed" : "Not completed"}
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