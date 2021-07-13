import * as React from "react";
import { render } from "react-dom";

import GraphiQL from "graphiql";

import "graphiql/graphiql.min.css";

import "./index.css";

const URL =
    "https://hkp4axvzendcpndr7ny5fx3nvm.appsync-api.us-west-2.amazonaws.com/graphql";

function graphQLFetcher(graphQLParams: any) {
  return fetch(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "da2-t4ws57vd5fa6per7yzwobmpesy"
    },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

const container = document.getElementById("graphiql");

const defaultQuery = `
 query{
  getLatestStats {
    number_of_members
    number_of_events
    number_of_groups
  }
 }
`;

render(
    <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />,
    container
);
