import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TodoList from "../components/TodoList";
import { Todo } from "../interface/Todo-interface";
import SearchIcon from "@mui/icons-material/Search";

export const getStaticProps = async () => {
  let allTodos: Todo[] = await fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
    .then(response => response.json())
    .then(response => {
      if (response) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      } else return [];
    })
    .catch(error => {
      alert(error.message);
      return [];
    });

  return { props: { allTodos } };
};

export default function TodoListPage({ allTodos }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  let [sort, setSort] = useState(0);
  let [search, setSearch] = useState("");
  //let allTodos: Todo[] = useSelector((state: RootState) => state.todo.todos);
  let completedTodos: Todo[] = allTodos.filter(todo => todo.completed === true);
  let notCompletedTodos: Todo[] = allTodos.filter(todo => todo.completed === false);
  let [selectTodos, setSelectTodos] = useState(allTodos);
  let [searchedTodos, setSearchedTodo] = useState(selectTodos);

  useEffect(() => {
    if (sort == 0) {
      setSelectTodos(allTodos);
      setSearchedTodo(filterTodo(allTodos));
    } else if (sort == 1) {
      setSelectTodos(completedTodos);
      setSearchedTodo(filterTodo(completedTodos));
    } else if (sort == 2) {
      setSelectTodos(notCompletedTodos);
      setSearchedTodo(filterTodo(notCompletedTodos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, search, allTodos]);


  function filterTodo(todos: Todo[]): Todo[] {
    return (todos.filter((todo: Todo) => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
  }

  return (
    <>
      <Head>
        <title>My todo | Todo list</title>
      </Head>
      <div>
        <div style={{ marginBottom: "120px" }}>
          <FormControl style={{ display: "block", width: "100%" }} component="fieldset">
            <TextField
              style={{ marginBottom: "15px" }}
              label={<><SearchIcon style={{ marginBottom: "-8px" }} /><span>search todo</span></>}
              variant="outlined"
              fullWidth
              value={search}
              onInput={(event: any) => {
                setSearch(event.target.value);
                setSearchedTodo(selectTodos);
              }}
            />
          </FormControl>
          <hr />
          <TodoList todos={searchedTodos} />
        </div>
        <Paper style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0"
        }} elevation={3}>
          <BottomNavigation
            showLabels
            value={sort}
            onChange={(_event, newValue) => setSort(newValue)}
          >
            <BottomNavigationAction
              label="All todo"
              icon={<AssignmentOutlinedIcon />}
            />
            <BottomNavigationAction
              label="Completed"
              icon={<DoneOutlineIcon />}
            />
            <BottomNavigationAction
              label="Not completed"
              icon={<AccessTimeIcon />}
              style={{ whiteSpace: "nowrap" }}
            />
          </BottomNavigation>
        </Paper>
        <Fab
          // className="todoListPage__btnUp"
          style={{
            position: "fixed",
            right: "20px",
            bottom: "65px"
          }}
          size="medium"
          color="primary"
          aria-label="expand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpwardIcon />
        </Fab>
      </div>
    </>
  );
}