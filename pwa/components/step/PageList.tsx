import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Step } from "../../types/Step";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getStepsPath = (page?: string | string[] | undefined) =>
  `/steps${typeof page === "string" ? `?page=${page}` : ""}`;
export const getSteps = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Step>>(getStepsPath(page));
const getPagePath = (path: string) => `/steps/page/${parsePage("steps", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: steps, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Step>> | undefined
  >(getStepsPath(page), getSteps(page));
  const collection = useMercure(steps, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Step List</title>
        </Head>
      </div>
      <List steps={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
