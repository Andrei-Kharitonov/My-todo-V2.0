import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddTodo } from "../../store/reducers/todoMiddleware";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export default function NewTodo(): JSX.Element {
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  function formHandler(event: any) {
    event.preventDefault();
    setLoading(true);

    dispatch(fetchAddTodo({ title, text, completed: false }))
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