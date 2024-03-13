import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/step/Show";
import { PagedCollection } from "../../../types/collection";
import { Step } from "../../../types/Step";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getStep = async (id: string | string[] | undefined) =>
  id ? await fetch<Step>(`/steps/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: step, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Step> | undefined>(["step", id], () => getStep(id));
  const stepData = useMercure(step, hubURL);

  if (!stepData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Step ${stepData["@id"]}`}</title>
        </Head>
      </div>
      <Show step={stepData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["step", id], () => getStep(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Step>>("/steps");
  const paths = await getItemPaths(response, "steps", "/steps/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
