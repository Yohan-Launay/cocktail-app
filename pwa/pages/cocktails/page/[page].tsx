import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getCocktails,
  getCocktailsPath,
} from "../../../components/cocktail/PageList";
import { PagedCollection } from "../../../types/collection";
import { Cocktail } from "../../../types/Cocktail";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCocktailsPath(page), getCocktails(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Cocktail>>("/cocktails");
  const paths = await getCollectionPaths(
    response,
    "cocktails",
    "/cocktails/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
