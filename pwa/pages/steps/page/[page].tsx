import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getSteps,
  getStepsPath,
} from "../../../components/step/PageList";
import { PagedCollection } from "../../../types/collection";
import { Step } from "../../../types/Step";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getStepsPath(page), getSteps(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Step>>("/steps");
  const paths = await getCollectionPaths(
    response,
    "steps",
    "/steps/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
