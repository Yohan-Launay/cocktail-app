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

import { Form } from "../../../components/utensil/Form";
import { PagedCollection } from "../../../types/collection";
import { Utensil } from "../../../types/Utensil";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getUtensil = async (id: string | string[] | undefined) =>
  id ? await fetch<Utensil>(`/utensils/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: utensil } = {} } = useQuery<
    FetchResponse<Utensil> | undefined
  >(["utensil", id], () => getUtensil(id));

  if (!utensil) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{utensil && `Edit Utensil ${utensil["@id"]}`}</title>
        </Head>
      </div>
      <Form utensil={utensil} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["utensil", id], () => getUtensil(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Utensil>>("/utensils");
  const paths = await getItemPaths(response, "utensils", "/utensils/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
