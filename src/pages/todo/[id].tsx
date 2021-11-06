import { useRouter } from "next/dist/client/router";

function TodoPage(): JSX.Element {
  let router = useRouter();

  return (
    <h2>
      todo {router.query.id}
    </h2>
  );
}

export default TodoPage;