import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "./Header";
export default function AddDoctorView() {
  const [errorsMessage, seterrorsMessage] = useState("");
  const [addDoc, setAddDoc] = useState(false);

  const ResetHandler = () => {
    resetField("Name");
    resetField("Password");
    resetField("email");
    resetField("LN");
    resetField("Number");
    resetField("gender");
  };

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const signUpUser = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8080/admin/doctor/signup", {
        name: data.Name,
        password: data.Password,
        email: data.email,
        medicalLicenseNo: data.LN,
        phoneNumber: data.Number,
        gender: data.gender,
        specialization: data.specialization,
      })
      .then(function (response) {
        console.log(response);
        setAddDoc(true);
        resetField("Name");
        resetField("Password");
        resetField("email");
        resetField("LN");
        resetField("Number");
        resetField("gender");
        resetField("specialization");

        seterrorsMessage("");
        setTimeout(() => {
          setAddDoc(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
        seterrorsMessage(error.response.data.mesg);
        setTimeout(() => {
          seterrorsMessage("");
        }, 5000);
      });
    console.log(data);
  };

  return (
    <div>
      <nav className="w-full bg-gray-800">
        <Header />
      </nav>

      {addDoc && (
        <>
          <div
            className="ml-[520px] mt-5 w-64 animate-jump-in rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
            role="alert"
          >
            <strong className="font-bold">Doctor Created Successfully</strong>
          </div>
        </>
      )}

      {errorsMessage && (
        <>
          <div
            className=" relative ml-[530px] w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">{errorsMessage}</strong>
          </div>
        </>
      )}

      <div className=" ml-48 flex-col space-x-20">
        <h2 className="ml-96  mt-3 text-3xl font-bold dark:text-white">
          Add Doctor
        </h2>

        <form onSubmit={handleSubmit(signUpUser)}>
          <div className="mt-5">
            <div className="flex">
              <div>
                <label
                  htmlFor="input-group-1"
                  className="mb-2 ml-24 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Email
                </label>
                <div className="relative mb-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg
                      className="ml-24 h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                      maxLength: {
                        value: 25,
                        message: "Email must be at most 25 characters long",
                      },
                    })}
                    id="input-group-1"
                    className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@gmail.com"
                  />
                </div>
                {errors.email && (
                  <p
                    id="filled_error_help"
                    className="mx-24 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.email.message}</span>
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="website-admin"
                  className="mb-2 ml-16 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Name
                </label>
                <div className="relative mb-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg
                      className="ml-16 h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    {...register("Name", {
                      required: "Name is required",
                      maxLength: {
                        value: 25,
                        message: "Name must be at most 25 characters long",
                      },
                    })}
                    id="input-group-2"
                    className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                </div>
                {errors.Name && (
                  <p
                    id="filled_error_help"
                    className="mx-16 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.Name.message}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="mb-2 ml-24 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Password
                  </label>
                  <div className="relative mb-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="ml-24 h-24 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path d="M3.5 11.5a3.5 3.5 0 113.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 01-3.163 2zM2.5 9a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      {...register("Password", {
                        required: "Password is required",
                        maxLength: {
                          value: 30,
                          message: "Pass Must be 30 characters long",
                        },
                        minLength: {
                          value: 4,
                          message: "Password is too short",
                        },
                      })}
                      id="input-group-3"
                      className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="•••••••••"
                    />
                  </div>
                </div>
                {errors.Password && (
                  <p
                    id="filled_error_help"
                    className="mx-24 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">
                      {errors.Password.message}
                    </span>
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Phone Number
                  </label>
                  <div className="relative mb-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="ml-16 h-20 w-5 text-gray-500 dark:text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 01.5.5V3h1.5a.5.5 0 010 1H13v1.5a.5.5 0 01-1 0V4h-1.5a.5.5 0 010-1H12V1.5a.5.5 0 01.5-.5z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      {...register("Number", {
                        required: "Phone No. is required",
                        maxLength: {
                          value: 11,
                          message:
                            "Phone No. must be at most 11 characters long",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Please enter numbers only",
                        },
                      })}
                      id="input-group-4"
                      className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="•••••••••"
                    />
                  </div>
                </div>
                {errors.Number && (
                  <p
                    id="filled_error_help"
                    className="mx-16 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.Number.message}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex">
              <div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="mb-2 ml-24 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Medical License No.
                  </label>
                  <div className="relative mb-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-24 h-24 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path d="M9 10a3.04 3.04 0 013-3 3.04 3.04 0 013 3 3.04 3.04 0 01-3 3 3.04 3.04 0 01-3-3m3 9l4 1v-3.08A7.54 7.54 0 0112 18a7.54 7.54 0 01-4-1.08V20m4-16a5.78 5.78 0 00-4.24 1.74A5.78 5.78 0 006 10a5.78 5.78 0 001.76 4.23A5.78 5.78 0 0012 16a5.78 5.78 0 004.24-1.77A5.78 5.78 0 0018 10a5.78 5.78 0 00-1.76-4.26A5.78 5.78 0 0012 4m8 6a8.04 8.04 0 01-.57 2.8A7.84 7.84 0 0118 15.28V23l-6-2-6 2v-7.72A7.9 7.9 0 014 10a7.68 7.68 0 012.33-5.64A7.73 7.73 0 0112 2a7.73 7.73 0 015.67 2.36A7.68 7.68 0 0120 10z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      {...register("LN", {
                        required: "Required",
                      })}
                      id="input-group-5"
                      className="ml-24 block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="•••••••••"
                    />
                  </div>
                </div>
                {errors.LN && (
                  <p
                    id="filled_error_help"
                    className="mx-24 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.LN.message}</span>
                  </p>
                )}
              </div>

              <div>
                <div>
                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="mb-2 ml-4 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          viewBox="0 0 320 512"
                          fill="currentColor"
                          className="ml-2 h-12 w-4 text-gray-500 dark:text-gray-400"
                        >
                          <path d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm-56 304v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9l-28.6 47.6c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352h-16z" />
                        </svg>
                      </div>
                      <input
                        type="Text"
                        {...register("gender", {
                          required: "Required",
                          pattern: {
                            value: /^(Male|Female)$/i,
                            message: "Male or Female",
                          },
                        })}
                        id="input-group-6"
                        className="ml-2 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Male"
                      />
                    </div>
                  </div>
                  {errors.gender && (
                    <p
                      id="filled_error_help"
                      className="mx-4 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-medium">
                        {errors.gender.message}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <div className="mb-2">
                    <label
                      htmlFor="password"
                      className="mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Specialization
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          viewBox="0 0 640 512"
                          fill="currentColor"
                          className="ml-16 h-24 w-6 text-gray-500 dark:text-gray-400"
                        >
                          <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9V320c0 28.4-10.8 57.7-22.3 80.8-6.5 13-13.9 25.8-22.5 37.6-3.2 4.3-4.1 9.9-2.3 15s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7.3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7-3.2-14.2-7.5-28.7-13.5-42v-24.6c0-30.2 10.2-58.7 27.9-81.5 12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5.8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1l280.6-101c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1c-7.6-2.7-15.6-4.1-23.7-4.1zM128 408c0 35.3 86 72 192 72s192-36.7 192-72l-15.3-145.4L354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6l-142.2-51.4L128 408z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        {...register("specialization", {
                          required: "specialization is required",
                          maxLength: {
                            value: 13,
                            message: "Provide Nephrologist Only",
                          },
                        })}
                        id="input-group-3"
                        className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Nephrologist"
                      />
                    </div>
                  </div>
                  {errors.specialization && (
                    <p
                      id="filled_error_help"
                      className="mx-16 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-medium">
                        {errors.specialization.message}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="mx-16 mt-5 flex">
                <div>
                  <div>
                    <button
                      type="button"
                      onClick={ResetHandler}
                      className="ml-96 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      <svg
                        viewBox="0 0 470 1000"
                        fill="currentColor"
                        height="1.5em"
                        width="2em"
                      >
                        <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
                      </svg>
                      RESET
                    </button>
                  </div>
                </div>
                <div>
                  <div>
                    <button
                      type="submit"
                      className=" ml-12 mr-2  inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="mr-1 h-6 w-4"
                        x-tooltip="tooltip"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.25 1a.75.75 0 01.75.75V4h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V5.5h-2.25a.75.75 0 010-1.5h2.25V1.75a.75.75 0 01.75-.75zM9 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4 9.5a5 5 0 117.916 4.062 7.973 7.973 0 015.018 7.166.75.75 0 11-1.499.044 6.469 6.469 0 00-12.932 0 .75.75 0 01-1.499-.044 7.973 7.973 0 015.059-7.181A4.993 4.993 0 014 9.5z"
                        />
                      </svg>
                      Add Doctor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
