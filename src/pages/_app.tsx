import "../styles/globals.scss";
import "../styles/Todo.style.scss";
import "../styles/TodoInput.style.scss";
import "../styles/TodoListPage.style.scss";
import "../styles/TodoList.style.scss";
import "../styles/Todo.style.scss";
import "../styles/Statistics.style.scss";
import type { AppProps } from "next/app";
import MainLayout from "../components/Layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;