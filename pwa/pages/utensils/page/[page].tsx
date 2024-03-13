import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getUtensils,
  getUtensilsPath,
} from "../../../components/utensil/PageList";
import { PagedCollection } from "../../../types/collection";
import { Utensil } from "../../../types/Utensil";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getUtensilsPath(page), getUtensils(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Utensil>>("/utensils");
  const paths = await getCollectionPaths(
    response,
    "utensils",
    "/utensils/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
