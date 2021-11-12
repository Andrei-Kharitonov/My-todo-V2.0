import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { Todo } from "../interface/Todo-interface";
import Statistics from "../components/Statistics";

export const getStaticProps = async () => {
  let todos: Todo[] = await fetch("https://react-todo-list-15fdb-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
    .then(response => response.json())
    .then(response => {
      if (response) {
        return Object.keys(response).map(key => ({ ...response[key], id: key }));
      } else return [];
    })
    .catch(error => {
      alert(error.message);
      return [];
    });

  return { props: { todos } };
};

export default function Main({ todos }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>My todo | Main</title>
      </Head>
      <h2 className="title">Welcome to My todo</h2>
      <div>
        <fieldset>
          <legend><h2>Statistics</h2></legend>
          <Statistics todos={todos} />
        </fieldset>
      </div>
    </>
  );
}