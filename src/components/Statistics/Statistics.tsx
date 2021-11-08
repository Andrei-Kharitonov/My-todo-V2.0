import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestoreIcon from "@mui/icons-material/Restore";
import TodoList from "../TodoList/TodoList";
import { RootState } from "../../store/store";

function Statistics() {
  let todos = useSelector((state: RootState) => state.todo.todos);
  let loading = useSelector((state: RootState) => state.todo.loading);

  let total = todos.length;
  let completed = todos.filter(todo => todo.completed !== false).length;
  let uncompleted = todos.filter(todo => todo.completed !== true).length;

  if (loading) {
    return (
      <div className="statistics__loading">
        <CircularProgress size={60} />
      </div>
    );
  } else {
    return (
      <div className="statistics">
        <h3 className="statistics__stats">
          <AssignmentOutlinedIcon className="statistics__icon" />&nbsp;
          Total todo:&nbsp;{total}
        </h3>
        <h3 className="statistics__stats">
          <DoneOutlineIcon className="statistics__icon" />&nbsp;
          Completed:&nbsp;{completed}
        </h3>
        <h3 className="statistics__stats">
          <AccessTimeIcon className="statistics__icon" />&nbsp;
          Not completed:&nbsp;{uncompleted}
        </h3>
        <h3 className="statistics__stats">
          <RestoreIcon style={{ marginBottom: "-7px", fontSize: "27px" }} />&nbsp;
          Last todo:&nbsp;{total ? "" : "No todos"}
        </h3>
        {total ? <TodoList allTodos={todos} todoSlice={-1} /> : ""}
      </div>
    );
  }
}

export default Statistics;