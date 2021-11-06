import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TodoInputCard from "./TodoInputCard";

function TodoInput({ initialState, todoDispatch }) {
  let [inpValueTitle, setInpValueTitle] = useState(initialState.title);
  let [inpValueText, setInpValueText] = useState(initialState.text);
  let [loading, setLoading] = useState(false);
  let [alignment, setAlignment] = useState("title");
  let dispatch = useDispatch();

  function formHandler(event) {
    event.preventDefault();
    setLoading(true);

    dispatch(todoDispatch({ title: inpValueTitle, text: inpValueText, id: initialState.id, completed: initialState.completed })).then(() => setLoading(false));

    setInpValueTitle("");
    setInpValueText("");
  }

  function handleButtonChange(_event, newAlignment) {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  let inputType = () => {
    switch (alignment) {
      case "title":
        return (
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Title.."
            id="InpTodoTitle"
            value={inpValueTitle}
            onChange={event => setInpValueTitle(event.target.value)}
          />
        );

      case "text":
        return (
          <TextField
            multiline
            rows={3}
            fullWidth
            label="Text.."
            id="InpTodoText"
            value={inpValueText}
            onChange={event => setInpValueText(event.target.value)}
          />
        );
    }
  };

  return (
    <div className="container">
      <form onSubmit={formHandler}>
        {inputType()}
        <div className="buttons">
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            id="newTodoBtn"
            style={{ marginRight: "6px", whiteSpace: "nowrap" }}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
          >
            Create todo
          </LoadingButton>
          <ToggleButtonGroup
            className="btn-group"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleButtonChange}
          >
            <ToggleButton value="title">Title</ToggleButton>
            <ToggleButton value="text">Text</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </form>
      <TodoInputCard
        title={inpValueTitle}
        text={inpValueText}
      />
    </div>
  );
}

TodoInput.propTypes = {
  initialState: PropTypes.object,
  todoDispatch: PropTypes.func
};

export default TodoInput;