// @ts-ignore
import * as React from "react";
// @ts-ignore
import { render } from "react-dom";

import GraphiQL from "graphiql";

import "graphiql/graphiql.min.css";

import "./index.css";

const URL =
    "https://hqyqdsg4mfcu5d5wwndqhnicjy.appsync-api.us-west-2.amazonaws.com/graphql";

function graphQLFetcher(graphQLParams: any) {
  return fetch(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "da2-nzngq54ryngopi6pdwxourex6a"
    },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

const container = document.getElementById("graphiql");

const defaultQuery = `
 query{
  loadUserDetails(id: "xxx")
 }
`;

render(
    <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />,
    container
);
