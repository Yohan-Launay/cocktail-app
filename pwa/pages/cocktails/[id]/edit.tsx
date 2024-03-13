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

import { Form } from "../../../components/cocktail/Form";
import { PagedCollection } from "../../../types/collection";
import { Cocktail } from "../../../types/Cocktail";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getCocktail = async (id: string | string[] | undefined) =>
  id ? await fetch<Cocktail>(`/cocktails/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: cocktail } = {} } = useQuery<
    FetchResponse<Cocktail> | undefined
  >(["cocktail", id], () => getCocktail(id));

  if (!cocktail) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{cocktail && `Edit Cocktail ${cocktail["@id"]}`}</title>
        </Head>
      </div>
      <Form cocktail={cocktail} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["cocktail", id], () => getCocktail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Cocktail>>("/cocktails");
  const paths = await getItemPaths(
    response,
    "cocktails",
    "/cocktails/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
