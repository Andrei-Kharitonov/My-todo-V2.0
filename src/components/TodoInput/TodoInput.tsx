import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

interface TodoInputProps {
  initialState: {
    title: string,
    text: string,
    id?: string,
    completed: boolean
  },
  clearInput: boolean,
  btnText?: string,
  todoDispatch: any
};

export default function TodoInput({ initialState, clearInput, btnText, todoDispatch }: TodoInputProps): JSX.Element {
  let [title, setTitle] = useState(initialState.title);
  let [text, setText] = useState(initialState.text);
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();

  function formHandler(event: any) {
    event.preventDefault();

    if (!title) {
      alert("Input title");
      return null;
    }

    setLoading(true);

    dispatch(todoDispatch(
      {
        title,
        text,
        id: initialState.id,
        completed: initialState.completed
      }
    ))
      .then(() => setLoading(false));

    if (clearInput) {
      setTitle("");
      setText("");
    }
  }

  return (
    <Card variant="outlined" style={{ width: "100%" }}>
      <form onSubmit={formHandler}>
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              className="todoInput-title"
              variant="standard"
              placeholder="Title"
              style={{ color: initialState.completed ? "#00a152" : "#000" }}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
            <TextField
              className="todoInput-text"
              variant="standard"
              placeholder="Text"
              style={{ color: initialState.completed ? "#00a152" : "#000" }}
              value={text}
              onChange={event => setText(event.target.value)}
            />
          </div>
        </CardContent>
        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            id="newTodoBtn"
            style={{ whiteSpace: "nowrap" }}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
          >
            {btnText ?? "Create todo"}
          </LoadingButton>
        </CardActions>
      </form>
    </Card>
  );
}