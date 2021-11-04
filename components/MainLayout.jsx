import React, { useState, useEffect } from "react";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

export default function MainLayout({ children }) {
  let [value, setValue] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setValue(0);
        break;

      case "/create-todo":
        setValue(1);
        break;

      case "/all-todo":
        setValue(2);
        break;

      default:
        setValue(0);
        break;
    }
  });

  return (
    <>
      <Box>
        <AppBar position="fixed" style={{ borderRadius: "0 0 12px 12px", padding: "0 10px", width: "auto", left: "3px", right: "3px" }}>
          <Tabs value={value} centered>
            <Link href="/" passHref>
              <Tab component="a" label="Main" style={{ opacity: "1" }} />
            </Link>
            <Link href="/create-todo" passHref>
              <Tab component="a" label="New todo" style={{ opacity: "1" }} />
            </Link>
            <Link href="/all-todo" passHref>
              <Tab component="a" label="All todo" style={{ opacity: "1" }} />
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