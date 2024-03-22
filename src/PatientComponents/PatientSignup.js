import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../Hooks/AuthContext";



const PatientSignup = () => {
  const { setpatientEmail } = useContext(UserContext);
  const { setPatientName } = useContext(UserContext);
  const [addPatient, setAddPatient] = useState(false);
  const navigate = useNavigate();
  const [errorsMessage, seterrorsMessage] = useState();

  const ResetHandler = () => {
    resetField("Name");
    resetField("Password");
    resetField("email");
    resetField("medical_history");
    resetField("Number");
    resetField("doctorID");
    resetField("gender");
  };

  const signUpUser = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8080/patient/signup", {
        name: data.Name,
        password: data.Password,
        email: data.email,
        medical_history: data.medical_history,
        phoneNumber: data.Number,
        gender: data.gender,
      })
      .then(function (response) {
        console.log(response);
        setAddPatient(true);
        resetField("Name");
        resetField("Password");
        resetField("email");
        resetField("Number");
        resetField("gender");
        resetField("medical_history");
        seterrorsMessage("");
        setpatientEmail(response.data.email);
        setPatientName(response.data.name);
        setTimeout(() => {
          setAddPatient(false);
        }, 2000);
        navigate("/pHome");
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

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  return (
    <>
      <section className="h-screen">
        <div className="text-center">
          <img
            src={require("../images/fontlogo.png")}
            className="mx-auto w-40 text-3xl mt-7"
            alt="Logo"
          />
        </div>
        {errorsMessage && (
          <>
            <div
              className=" relative ml-[480px] mt-4 w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert"
            >
              <strong className="font-bold">{errorsMessage}</strong>
            </div>
          </>
        )}
        {addPatient && (
          <>
            <div
              className="ml-[500px] w-64  animate-jump-in rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
              role="alert"
            >
              <strong className="font-bold">
                Account Created Successfully
              </strong>
            </div>
          </>
        )}
        <div className=" ml-36 flex-col space-x-20">
          <h2 className="ml-96 mt-5  text-3xl font-bold dark:text-white">
            Create an account
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
                      <span className="font-medium">
                        {errors.email.message}
                      </span>
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
                          value: 30,
                          message: "Name must be at most 30 characters long",
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
                      <span className="font-medium">
                        {errors.Number.message}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 ml-24 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Medical History
                  </label>
                  <textarea
                    {...register("medical_history", {
                      required: "History is required",
                      maxLength: {
                        value: 20,
                        message: "Provide Disease Name only",
                      },
                    })}
                    id="message"
                    rows="1"
                    className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Hypertension"
                  ></textarea>
                  {errors.medical_history && (
                    <p
                      id="filled_error_help"
                      className="mx-24 mt-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-medium">
                        {errors.medical_history.message}
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <svg
                        viewBox="0 0 320 512"
                        fill="currentColor"
                        className="ml-16 h-12 w-4 text-gray-500 dark:text-gray-400"
                      >
                        <path d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm-56 304v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9l-28.6 47.6c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352h-16z" />
                      </svg>
                    </div>
                    <input
                      type="Text"
                      {...register("gender", {
                        required: "Gender is required",
                        pattern: {
                          value: /^(Male|Female)$/i,
                          message: "Gender must be 'Male' or 'Female'",
                        },
                      })}
                      id="input-group-6"
                      className="ml-16 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Male"
                    />
                  </div>

                  {errors.gender && (
                    <p
                      id="filled_error_help"
                      className="mx-16 mt-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-medium">
                        {errors.gender.message}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="mx-16 mt-8 flex">
                  <div>
                    <div>
                      <button
                        type="button"
                        onClick={ResetHandler}
                        className="ml-96 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          height="1.5em"
                          width="2em"
                        >
                          <path d="M0 3a2 2 0 012-2h7.08a2 2 0 011.519.698l4.843 5.651a1 1 0 010 1.302L10.6 14.3a2 2 0 01-1.52.7H2a2 2 0 01-2-2V3zm9.854 2.854a.5.5 0 00-.708-.708L7 7.293 4.854 5.146a.5.5 0 10-.708.708L6.293 8l-2.147 2.146a.5.5 0 00.708.708L7 8.707l2.146 2.147a.5.5 0 00.708-.708L7.707 8l2.147-2.146z" />
                        </svg>
                        RESET
                      </button>
                    </div>
                  </div>
                  <div>
                    <div>
                      <button
                        type="submit"
                        className=" ml-6 mr-2  inline-flex items-center rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default PatientSignup;
