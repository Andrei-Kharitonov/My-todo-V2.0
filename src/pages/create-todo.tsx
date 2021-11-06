import Head from "next/head";
import Box from "@mui/material/Box";
import NewTodo from "../components/TodoInput/NewTodo";

export default function CreateTodo(): JSX.Element {
  return (
    <>
      <Head>
        <title>My todo | Create todo</title>
      </Head>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <NewTodo />
      </Box>
    </>
  );
}