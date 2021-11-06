import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

interface TodoInputProps {
  initialState: {
    title: string,
    text: string,
    id?: string,
    completed: boolean
  },
  todoDispatch: any
};

export default function TodoInput({ initialState, todoDispatch }: TodoInputProps): JSX.Element {
  let [title, setTitle] = useState(initialState.title);
  let [text, setText] = useState(initialState.text);
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  function formHandler(event: any) {
    event.preventDefault();
    setLoading(true);

    dispatch(todoDispatch({ title, text, id: initialState.id, completed: initialState.completed }))
      .then(() => setLoading(false));

    setTitle("");
    setText("");
  }

  return (
    <fieldset style={{ padding: "13px" }}>
      <legend><h2>Create todo</h2></legend>
      <form onSubmit={formHandler}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            className="todoInput-title"
            variant="standard"
            placeholder="Title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            className="todoInput-text"
            variant="standard"
            placeholder="Text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          id="newTodoBtn"
          style={{ marginTop: "16px", whiteSpace: "nowrap" }}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
        >
          Create todo
        </LoadingButton>
      </form>
    </fieldset>
  );
}