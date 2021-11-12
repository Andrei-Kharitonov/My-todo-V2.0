import { useState, useEffect } from "react";
import { fetchGetTodos } from "../store/reducers/todoMiddleware";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

interface LayoutChildren {
  children: JSX.Element
}

export default function MainLayout({ children }: LayoutChildren) {
  let [page, setPage] = useState(0);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTodos());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setPage(0);
        break;

      case "/create-todo":
        setPage(1);
        break;

      case "/todo-list":
        setPage(2);
        break;

      default:
        setPage(2);
        break;
    }
  });

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          style={{
            borderRadius: "0 0 12px 12px",
            padding: "0 10px",
            width: "auto",
            left: "3px",
            right: "3px"
          }}>
          <Tabs value={page} centered>
            <Link href="/" passHref>
              <Tab component="a" label="Main" style={{ opacity: "1" }} />
            </Link>
            <Link href="/create-todo" passHref>
              <Tab component="a" label="New todo" style={{ opacity: "1" }} />
            </Link>
            <Link href="/todo-list" passHref>
              <Tab component="a" label="Todo list" style={{ opacity: "1" }} />
            </Link>
          </Tabs>
        </AppBar>
      </Box>
      <main>
        {children}
      </main>
    </>
  );
}