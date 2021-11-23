import Head from "next/head";
import Box from "@mui/material/Box";
import { addTodo } from "../store/reducers/todoMiddleware";
import TodoInput from "../components/TodoInput";

export default function CreateTodo(): JSX.Element {
  return (
    <>
      <Head>
        <title>My todo | Create todo</title>
      </Head>
      <Box>
        <TodoInput
          initialState={{ title: "", text: "", completed: false }}
          clearInput={true}
          todoDispatch={addTodo}
        />
      </Box>
    </>
  );
}