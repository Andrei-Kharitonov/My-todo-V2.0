import Head from "next/head";
import Statistics from "../components/Statistics";

export default function Main(): JSX.Element {
  return (
    <>
      <Head>
        <title>My todo | Main</title>
      </Head>
      <h2 className="title">Welcome to My todo</h2>
      <div className="home-page">
        <fieldset className="statistic">
          <legend><h2>Statistics</h2></legend>
          <Statistics />
        </fieldset>
      </div>
    </>
  );
}