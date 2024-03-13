import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Cocktail } from "../../types/Cocktail";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getCocktailsPath = (page?: string | string[] | undefined) =>
  `/cocktails${typeof page === "string" ? `?page=${page}` : ""}`;
export const getCocktails =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Cocktail>>(getCocktailsPath(page));
const getPagePath = (path: string) =>
  `/cocktails/page/${parsePage("cocktails", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: cocktails, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Cocktail>> | undefined
  >(getCocktailsPath(page), getCocktails(page));
  const collection = useMercure(cocktails, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Cocktail List</title>
        </Head>
      </div>
      <List cocktails={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
