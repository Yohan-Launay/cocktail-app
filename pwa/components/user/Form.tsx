import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { User } from "../../types/User";

interface Props {
  user?: User;
}

interface SaveParams {
  values: User;
}

interface DeleteParams {
  id: string;
}

const saveUser = async ({ values }: SaveParams) =>
  await fetch<User>(!values["@id"] ? "/users" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteUser = async (id: string) =>
  await fetch<User>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ user }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<User> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveUser(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<User> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteUser(id), {
    onSuccess: () => {
      router.push("/users");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!user || !user["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: user["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/users"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {user ? `Edit User ${user["@id"]}` : `Create User`}
      </h1>
      <Formik
        initialValues={
          user
            ? {
                ...user,
              }
            : new User()
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
                router.push("/users");
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
                htmlFor="user_email"
              >
                email
              </label>
              <input
                name="email"
                id="user_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.email && touched.email ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="email"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_password"
              >
                password
              </label>
              <input
                name="password"
                id="user_password"
                value={values.password ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.password && touched.password ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="password"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_username"
              >
                username
              </label>
              <input
                name="username"
                id="user_username"
                value={values.username ?? ""}
                type="text"
                placeholder=""
                required={true}
                className={`mt-1 block w-full ${
                  errors.username && touched.username ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.username && touched.username ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="username"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_firstName"
              >
                firstName
              </label>
              <input
                name="firstName"
                id="user_firstName"
                value={values.firstName ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.firstName && touched.firstName ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.firstName && touched.firstName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="firstName"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_lastName"
              >
                lastName
              </label>
              <input
                name="lastName"
                id="user_lastName"
                value={values.lastName ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.lastName && touched.lastName ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.lastName && touched.lastName ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="lastName"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_city"
              >
                city
              </label>
              <input
                name="city"
                id="user_city"
                value={values.city ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.city && touched.city ? "border-red-500" : ""
                }`}
                aria-invalid={errors.city && touched.city ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="city"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_country"
              >
                country
              </label>
              <input
                name="country"
                id="user_country"
                value={values.country ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.country && touched.country ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.country && touched.country ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="country"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_nameBar"
              >
                nameBar
              </label>
              <input
                name="nameBar"
                id="user_nameBar"
                value={values.nameBar ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.nameBar && touched.nameBar ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.nameBar && touched.nameBar ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="nameBar"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_bio"
              >
                bio
              </label>
              <input
                name="bio"
                id="user_bio"
                value={values.bio ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.bio && touched.bio ? "border-red-500" : ""
                }`}
                aria-invalid={errors.bio && touched.bio ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="bio"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_dateBirthday"
              >
                dateBirthday
              </label>
              <input
                name="dateBirthday"
                id="user_dateBirthday"
                value={values.dateBirthday?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.dateBirthday && touched.dateBirthday
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.dateBirthday && touched.dateBirthday
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="dateBirthday"
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
        {user && (
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
