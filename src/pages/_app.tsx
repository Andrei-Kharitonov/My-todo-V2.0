import "../styles/globals.scss";
import "../styles/Todo.style.scss";
import type { AppProps } from "next/app";
import MainLayout from "../components/MainLayout";
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