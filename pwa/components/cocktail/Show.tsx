import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getItemPath } from "../../utils/dataAccess";
import { Cocktail } from "../../types/Cocktail";

interface Props {
  cocktail: Cocktail;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ cocktail, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!cocktail["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(cocktail["@id"], { method: "DELETE" });
      router.push("/cocktails");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Show Cocktail ${cocktail["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/cocktails"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Back to list"}
      </Link>
      <h1 className="text-3xl mb-2">{`Show Cocktail ${cocktail["@id"]}`}</h1>
      <table
        cellPadding={10}
        className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
      >
        <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          <tr>
            <th scope="row">name</th>
            <td>{cocktail["name"]}</td>
          </tr>
          <tr>
            <th scope="row">resume</th>
            <td>{cocktail["resume"]}</td>
          </tr>
          <tr>
            <th scope="row">imgPath</th>
            <td>{cocktail["imgPath"]}</td>
          </tr>
          <tr>
            <th scope="row">etat</th>
            <td>{cocktail["etat"]}</td>
          </tr>
          <tr>
            <th scope="row">reviews</th>
            <td>
              <ReferenceLinks
                items={cocktail["reviews"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/reviews/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">utensils</th>
            <td>
              <ReferenceLinks
                items={cocktail["utensils"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/utensils/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">ingredients</th>
            <td>
              <ReferenceLinks
                items={cocktail["ingredients"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/ingredients/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">categories</th>
            <td>
              <ReferenceLinks
                items={cocktail["categories"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/categorys/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">steps</th>
            <td>
              <ReferenceLinks
                items={cocktail["steps"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/steps/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">user</th>
            <td>
              <ReferenceLinks
                items={cocktail["user"].map((emb: any) => ({
                  href: getItemPath(emb["@id"], "/users/[id]"),
                  name: emb["@id"],
                }))}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div
          className="border px-4 py-3 my-4 rounded text-red-700 border-red-400 bg-red-100"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex space-x-2 mt-4 items-center justify-end">
        <Link
          href={getItemPath(cocktail["@id"], "/cocktails/[id]/edit")}
          className="inline-block mt-2 border-2 border-cyan-500 bg-cyan-500 hover:border-cyan-700 hover:bg-cyan-700 text-xs text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
        <button
          className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-xs text-red-400 font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
