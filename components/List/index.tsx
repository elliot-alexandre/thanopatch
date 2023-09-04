import { Infer } from "garph";
import { request, gql } from "graphql-request";

import { TodoGQL } from "../../server/gql/schema";
import ListItem from "../ListItem";
import { removeTodo } from "./actions";

const query = gql`
  query getTodos {
    getTodos {
      id
      title
    }
  }
`;

interface QueryData {
  getTodos: Array<Infer<typeof TodoGQL>>;
}

export default async function List() {
  const endpoint = process.env.GRAPHQL_ENDPOINT as string;

  const { getTodos } = await request<QueryData>(endpoint, query);

  return (
    <ul className="space-y-4">
      {getTodos?.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            title={todo.title}
            todoId={todo.id}
            removeItem={removeTodo}
          />
        );
      })}
    </ul>
  );
}
