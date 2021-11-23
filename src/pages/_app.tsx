import "../styles/globals.scss";
import "../styles/Todo.style.scss";
import "../styles/TodoInput.style.scss";
import "../styles/TodoList.style.scss";
import "../styles/Todo.style.scss";
import "../styles/Statistics.style.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation";
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
      </Provider>
    </>
  );
}

export default MyApp;