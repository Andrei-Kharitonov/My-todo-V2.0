import Head from "next/head";
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
import TodoList from "../components/TodoList/TodoList";
import { Todo } from "../interface/Todo-interface";
import { Styles } from "../interface/Styles-interface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchIcon from "@mui/icons-material/Search";

let styles: Styles = {
  ul: {
    listStyleType: "none",
    padding: 0
  },
  li: {},
  card: {},
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    paddingBottom: "15px"
  },
  title: {},
};

export default function TodoListPage(): JSX.Element {
  let [value, setValue] = useState(0);
  let [search, setSearch] = useState("");
  let allTodos: Todo[] = useSelector((state: RootState) => state.todo.todos);
  let completedTodos: Todo[] = allTodos.filter(todo => todo.completed === true);
  let notCompletedTodos: Todo[] = allTodos.filter(todo => todo.completed === false);
  let [selectTodos, setSelectTodos] = useState(allTodos);
  let [searchedTodos, setSearchedTodo] = useState(selectTodos);

  useEffect(() => {
    if (value == 0) {
      setSelectTodos(allTodos);
      setSearchedTodo(filterTodo(allTodos));
    } else if (value == 1) {
      setSelectTodos(completedTodos);
      setSearchedTodo(filterTodo(completedTodos));
    } else if (value == 2) {
      setSelectTodos(notCompletedTodos);
      setSearchedTodo(filterTodo(notCompletedTodos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, search, allTodos]);


  function filterTodo(todos: Todo[]): Todo[] {
    return (todos.filter((todo: Todo) => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
  }

  return (
    <>
      <Head>
        <title>My todo | Todo list</title>
      </Head>
      <div>
        <div style={{ marginBottom: "80px" }}>
          <FormControl component="fieldset" style={{ display: "block", width: "100%" }}>
            <TextField
              id="search"
              label={<><SearchIcon style={{ marginBottom: "-8px" }} /><span>search todo</span></>}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "15px" }}
              value={search}
              onInput={(event: any) => {
                setSearch(event.target.value);
                setSearchedTodo(selectTodos);
              }}
            />
          </FormControl>
          <hr />
          <TodoList allTodos={searchedTodos} styles={styles} todoSlice={0} />
        </div>
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => setValue(newValue)}
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
          style={{ position: "fixed", right: "20px", bottom: "65px" }}
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