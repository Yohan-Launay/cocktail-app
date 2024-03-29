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

import { Form } from "../../../components/step/Form";
import { PagedCollection } from "../../../types/collection";
import { Step } from "../../../types/Step";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getStep = async (id: string | string[] | undefined) =>
  id ? await fetch<Step>(`/steps/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: step } = {} } = useQuery<
    FetchResponse<Step> | undefined
  >(["step", id], () => getStep(id));

  if (!step) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{step && `Edit Step ${step["@id"]}`}</title>
        </Head>
      </div>
      <Form step={step} />
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
  const paths = await getItemPaths(response, "steps", "/steps/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
