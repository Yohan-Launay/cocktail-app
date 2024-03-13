import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Welcome = () => (
  <div className="w-full overflow-x-hidden">
    <Head>
      <title>Cocktail app</title>
    </Head>
    <header>
      <nav>
        <h1>Cocktails Recipes</h1>
      </nav>
    </header>
    <section className="w-full bg-spider-cover relative">

    </section>
    <section className="bg-white py-8">
    </section>
  </div>
);
export default Welcome;

const Card = ({
  image,
  url,
  title,
}: {
  image: string;
  url: string;
  title: string;
}) => (
  <div className="w-full max-w-xs p-2 | sm:w-1/2 | lg:w-full lg:p-0">
  <a
    href={url}
    className="w-full flex items-center flex-col justify-center shadow-card p-3 min-h-24 transition-colors text-cyan-500 border-4 border-transparent hover:border-cyan-200 hover:text-cyan-700 | sm:flex-row sm:justify-start sm:px-5"
  >
    <Image src={image} width="50" height="50" alt="" />
    <h3 className="text-center text-base uppercase font-semibold leading-tight pt-3 | sm:text-left sm:pt-0 sm:pl-5">
      {title}
    </h3>
  </a>
  </div>
);

const HelpButton = ({
  children,
  url,
  title,
}: {
  url: string;
  title: string;
  children: React.ReactNode;
}) => (
  (<Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 p-2.5 rounded-full border-2 border-gray-100 justify-center transition-colors hover:border-cyan-200 hover:bg-cyan-200/50 m-2 inline-flex items-center | md:p-1 md:w-9 md:h-9 md:flex md:mx-auto md:m-0"
    title={title}>

    {children}

  </Link>)
);
