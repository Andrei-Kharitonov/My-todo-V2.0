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
        {/* <fieldset style={{ padding: "13px" }}>
          <legend><h2>Create todo</h2></legend> */}
        <TodoInput initialState={{ title: "", text: "", completed: false }} todoDispatch={fetchAddTodo} />
        {/* </fieldset> */}
      </Box>
    </>
  );
}