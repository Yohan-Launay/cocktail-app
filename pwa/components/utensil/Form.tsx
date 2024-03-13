import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Utensil } from "../../types/Utensil";

interface Props {
  utensil?: Utensil;
}

interface SaveParams {
  values: Utensil;
}

interface DeleteParams {
  id: string;
}

const saveUtensil = async ({ values }: SaveParams) =>
  await fetch<Utensil>(!values["@id"] ? "/utensils" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteUtensil = async (id: string) =>
  await fetch<Utensil>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ utensil }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Utensil> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveUtensil(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Utensil> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteUtensil(id), {
    onSuccess: () => {
      router.push("/utensils");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!utensil || !utensil["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: utensil["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/utensils"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {utensil ? `Edit Utensil ${utensil["@id"]}` : `Create Utensil`}
      </h1>
      <Formik
        initialValues={
          utensil
            ? {
                ...utensil,
              }
            : new Utensil()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/utensils");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="shadow-md p-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="utensil_name"
              >
                name
              </label>
              <input
                name="name"
                id="utensil_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.name && touched.name ? "border-red-500" : ""
                }`}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="name"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="utensil_imgPath"
              >
                imgPath
              </label>
              <input
                name="imgPath"
                id="utensil_imgPath"
                value={values.imgPath ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.imgPath && touched.imgPath ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.imgPath && touched.imgPath ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="imgPath"
              />
            </div>
            {status && status.msg && (
              <div
                className={`border px-4 py-3 my-4 rounded ${
                  status.isValid
                    ? "text-cyan-700 border-cyan-500 bg-cyan-200/50"
                    : "text-red-700 border-red-400 bg-red-100"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-700 text-sm text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {utensil && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
