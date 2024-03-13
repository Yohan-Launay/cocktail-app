import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Step } from "../../types/Step";

interface Props {
  step?: Step;
}

interface SaveParams {
  values: Step;
}

interface DeleteParams {
  id: string;
}

const saveStep = async ({ values }: SaveParams) =>
  await fetch<Step>(!values["@id"] ? "/steps" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteStep = async (id: string) =>
  await fetch<Step>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ step }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Step> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveStep(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Step> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteStep(id), {
    onSuccess: () => {
      router.push("/steps");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!step || !step["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: step["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/steps"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {step ? `Edit Step ${step["@id"]}` : `Create Step`}
      </h1>
      <Formik
        initialValues={
          step
            ? {
                ...step,
              }
            : new Step()
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
                router.push("/steps");
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
                htmlFor="step_sequence"
              >
                sequence
              </label>
              <input
                name="sequence"
                id="step_sequence"
                value={values.sequence ?? ""}
                type="number"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.sequence && touched.sequence ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.sequence && touched.sequence ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="sequence"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="step_resume"
              >
                resume
              </label>
              <input
                name="resume"
                id="step_resume"
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
        {step && (
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
