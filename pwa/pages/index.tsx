import Head from "next/head";
import React from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Welcome = () => (
  <div className="w-full overflow-x-hidden">
    <Head>
      <title>Cocktail app</title>
    </Head>
    <h1>Hello world !</h1>
  </div>
);
export default Welcome;

