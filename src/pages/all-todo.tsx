import Head from "next/head";
import { useState, useEffect } from "react";
import { Todo } from "../interface/Todo-interface";
import { Styles } from "../interface/Styles-interface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoList from "../components/TodoList/TodoList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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

export default function AllTodo(): JSX.Element {
  let [sort, setSort] = useState("all");
  let [search, setSearch] = useState("");
  let allTodos: Todo[] = useSelector((state: RootState) => state.todo.todos);
  let completeTodo: Todo[] = allTodos.filter(todo => todo.completed === true);
  let notCompleteTodo: Todo[] = allTodos.filter(todo => todo.completed === false);
  let [selectTodos, setSelectTodos] = useState(allTodos);
  let [searchedTodo, setSearchedTodo] = useState(selectTodos);

  useEffect(() => {
    if (sort == "all") {
      setSelectTodos(allTodos);
      setSearchedTodo(filterTodo(allTodos));
    } else if (sort == "completed") {
      setSelectTodos(allTodos.filter(todo => todo.completed === true));
      setSearchedTodo(filterTodo(completeTodo));
    } else if (sort == "notCompleted") {
      setSelectTodos(allTodos.filter(todo => todo.completed === false));
      setSearchedTodo(filterTodo(notCompleteTodo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, allTodos]);

  function filterTodo(todos: Todo[]): Todo[] {
    return (todos.filter((todo: Todo) => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
  }

  function handleSortChange(event: any) {
    setSort(event.target.value);
  };

  function searchTodo(todos: Todo[], search: string) {
    setSearchedTodo(todos.filter(todo => todo.title.toLowerCase().indexOf(search.toLowerCase(), 0) > -1));
  }

  return (
    <>
      <Head>
        <title>My todo | All todos</title>
      </Head>
      <fieldset className="sort">
        <legend><h2>Sort todo</h2></legend>
        <FormControl component="fieldset" style={{ display: "block", width: "100%" }}>
          <RadioGroup
            className="sort-todo"
            row
            style={{ marginBottom: "15px" }}
            aria-label="sort todo"
            name="row-radio-buttons-group"
            value={sort}
            onChange={handleSortChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All todo" />
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="notCompleted" control={<Radio />} label="Not completed" />
          </RadioGroup>
          <TextField
            id="search"
            label="search todo"
            variant="outlined"
            fullWidth
            value={search}
            onInput={(event: any) => {
              setSearch(event.target.value);
              searchTodo(selectTodos, event.target.value);
            }}
          />
        </FormControl>
      </fieldset>
      <TodoList allTodos={searchedTodo} styles={styles} todoSlice={0} />
      <Fab
        style={{ position: "fixed", right: "20px", bottom: "30px" }}
        color="primary"
        aria-label="expand"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpwardIcon />
      </Fab>
    </>
  );
}