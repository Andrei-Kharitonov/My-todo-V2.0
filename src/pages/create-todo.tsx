import Head from "next/head";
import Box from "@mui/material/Box";
import { fetchAddTodo } from "../store/reducers/todoMiddleware";
import TodoInput from "../components/TodoInput/TodoInput";

export default function CreateTodo(): JSX.Element {
  return (
    <>
      <Head>
        <title>My todo | Create todo</title>
      </Head>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <TodoInput
          initialState={{ title: "", text: "", completed: false }}
          clearInput={true}
          todoDispatch={fetchAddTodo}
        />
      </Box>
    </>
  );
}