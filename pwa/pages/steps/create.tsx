import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/step/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Step</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
