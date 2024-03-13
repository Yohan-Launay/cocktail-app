import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Cocktail } from "../../types/Cocktail";

interface Props {
  cocktail?: Cocktail;
}

interface SaveParams {
  values: Cocktail;
}

interface DeleteParams {
  id: string;
}

const saveCocktail = async ({ values }: SaveParams) =>
  await fetch<Cocktail>(!values["@id"] ? "/cocktails" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteCocktail = async (id: string) =>
  await fetch<Cocktail>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ cocktail }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Cocktail> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveCocktail(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Cocktail> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteCocktail(id), {
    onSuccess: () => {
      router.push("/cocktails");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!cocktail || !cocktail["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: cocktail["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/cocktails"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {cocktail ? `Edit Cocktail ${cocktail["@id"]}` : `Create Cocktail`}
      </h1>
      <Formik
        initialValues={
          cocktail
            ? {
                ...cocktail,
                reviews:
                  cocktail["reviews"]?.map((emb: any) => emb["@id"]) ?? [],
                utensils:
                  cocktail["utensils"]?.map((emb: any) => emb["@id"]) ?? [],
                ingredients:
                  cocktail["ingredients"]?.map((emb: any) => emb["@id"]) ?? [],
                categories:
                  cocktail["categories"]?.map((emb: any) => emb["@id"]) ?? [],
                steps: cocktail["steps"]?.map((emb: any) => emb["@id"]) ?? [],
                user: cocktail["user"]?.map((emb: any) => emb["@id"]) ?? [],
              }
            : new Cocktail()
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
                router.push("/cocktails");
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
                htmlFor="cocktail_name"
              >
                name
              </label>
              <input
                name="name"
                id="cocktail_name"
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
                htmlFor="cocktail_resume"
              >
                resume
              </label>
              <input
                name="resume"
                id="cocktail_resume"
                value={values.resume ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.resume && touched.resume ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.resume && touched.resume ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="resume"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="cocktail_imgPath"
              >
                imgPath
              </label>
              <input
                name="imgPath"
                id="cocktail_imgPath"
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
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="cocktail_etat"
              >
                etat
              </label>
              {/*<input*/}
              {/*  name="etat"*/}
              {/*  id="cocktail_etat"*/}
              {/*  value={values.etat ?? ""}*/}
              {/*  type="checkbox"*/}
              {/*  placeholder=""*/}
              {/*  className={`mt-1 block w-full ${*/}
              {/*    errors.etat && touched.etat ? "border-red-500" : ""*/}
              {/*  }`}*/}
              {/*  aria-invalid={errors.etat && touched.etat ? "true" : undefined}*/}
              {/*  onChange={handleChange}*/}
              {/*  onBlur={handleBlur}*/}
              {/*/>*/}
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="etat"
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">
                reviews
              </div>
              <FieldArray
                name="reviews"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_reviews">
                    {values.reviews && values.reviews.length > 0 ? (
                      values.reviews.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`reviews.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">
                utensils
              </div>
              <FieldArray
                name="utensils"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_utensils">
                    {values.utensils && values.utensils.length > 0 ? (
                      values.utensils.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`utensils.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">
                ingredients
              </div>
              <FieldArray
                name="ingredients"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_ingredients">
                    {values.ingredients && values.ingredients.length > 0 ? (
                      values.ingredients.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`ingredients.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">
                categories
              </div>
              <FieldArray
                name="categories"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_categories">
                    {values.categories && values.categories.length > 0 ? (
                      values.categories.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`categories.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">steps</div>
              <FieldArray
                name="steps"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_steps">
                    {values.steps && values.steps.length > 0 ? (
                      values.steps.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`steps.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-2">
              <div className="text-gray-700 block text-sm font-bold">user</div>
              <FieldArray
                name="user"
                render={(arrayHelpers) => (
                  <div className="mb-2" id="cocktail_user">
                    {values.user && values.user.length > 0 ? (
                      values.user.map((item: any, index: number) => (
                        <div key={index}>
                          <Field name={`user.${index}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add
                      </button>
                    )}
                  </div>
                )}
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
        {cocktail && (
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
