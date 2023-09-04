"use server";

import { revalidatePath } from "next/cache";
import { GraphQLClient, gql } from "graphql-request";

const mutation = gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

export async function removeTodo(id: number) {
  const endpoint = process.env.GRAPHQL_ENDPOINT as string;
  const graphQLClient = new GraphQLClient(endpoint);
  await graphQLClient.request(mutation, { id });
  revalidatePath("/");
}
