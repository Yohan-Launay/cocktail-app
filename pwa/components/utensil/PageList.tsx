import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Utensil } from "../../types/Utensil";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getUtensilsPath = (page?: string | string[] | undefined) =>
  `/utensils${typeof page === "string" ? `?page=${page}` : ""}`;
export const getUtensils = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Utensil>>(getUtensilsPath(page));
const getPagePath = (path: string) =>
  `/utensils/page/${parsePage("utensils", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: utensils, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Utensil>> | undefined
  >(getUtensilsPath(page), getUtensils(page));
  const collection = useMercure(utensils, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Utensil List</title>
        </Head>
      </div>
      <List utensils={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
