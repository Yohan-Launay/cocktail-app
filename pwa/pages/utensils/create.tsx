import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/utensil/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Utensil</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
