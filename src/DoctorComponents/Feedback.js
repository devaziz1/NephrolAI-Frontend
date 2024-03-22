import React, { useState, useContext, useEffect } from "react";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

import { useForm } from "react-hook-form";

import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";

export default function Feedback() {
  const { userEmail } = useContext(UserContext);
  const [submitDone, setSubmitDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorsMessage, seterrorsMessage] = useState("");


  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const submitPrescription = async (data) => {
    console.log(data);
    console.log(userEmail);

    try {
      const response = await axios.post(
        "http://localhost:8080/doctor/provideFeedback",
        {
          doctorEmail: userEmail,
          patientEmail: data.email,
          description: data.instructions,
          reportID: data.RI,
        }
      );
      if (response) {
        setSubmitDone(true);
        resetField("email");
        resetField("instructions");
        resetField("RI");
        setTimeout(() => {
          setSubmitDone(false);
        }, 5000);
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
      seterrorsMessage(error.response.data.mesg);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <div className="lottie-container">
            <Lottie animationData={Loader} />
          </div>
        ) : (
          <div>
            <div className="mt-8 ">
              <img
                src={require("../images/chat.png")}
                className="mx-auto w-32 text-3xl "
                alt="Logo"
              />
              <h2 className="mb-4 ml-[420px] mt-5 text-2xl font-bold">
                Feedback Form
              </h2>
              
              {errorsMessage && (
                  <>
                    <div
                      className="bg-red-100 animate-jump-in animate-ease-in-out mx-80 w-96 border border-red-400 text-red-700 px-4 py-3 rounded relative w-70"
                      role="alert"
                    >
                      <strong className="font-bold">{errorsMessage}</strong>
                      
                      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        
                      </span>
                    </div>
                  </>
                )}

              {submitDone && (
                <>
                  <div
                    className="mx-80 w-96  animate-jump-in rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
                    role="alert"
                  >
                    <strong className="font-bold">
                      Feedback Submitted Successfully
                    </strong>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit(submitPrescription)}>
                <div className="flex">
                  <div>
                    <label
                      htmlFor="input-group-1"
                      className="mb-2 ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Patient's Email
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          className="ml-44 h-4 w-4 text-gray-500 dark:text-gray-400"
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
                          required: "Please Provide Valid Email",
                        })}
                        required
                        id="input-group-1"
                        className="ml-44 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="name@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="input-group-1"
                      className="mb-2 ml-10 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Report ID
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          viewBox="0 0 21 21"
                          fill="currentColor"
                          className="ml-9 h-7 w-7 text-gray-500 dark:text-gray-400"
                        >
                          <g fill="none" fillRule="evenodd">
                            <g
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15.5 10.5h-7M15.5 14.5h-7M15.5 6.5h-7" />
                            </g>
                            <path
                              fill="currentColor"
                              d="M5.88 8V5.828h-.037l-.68.459V5.67l.717-.488h.717V8zM4.9 10.068c0-.572.45-.963 1.109-.963.652 0 1.04.354 1.04.836 0 .334-.148.555-.597.961l-.555.502v.037h1.186V12H4.94v-.479l1.008-.912c.348-.318.406-.44.406-.605 0-.195-.136-.358-.382-.358-.262 0-.416.178-.416.422zm.712 4.73v-.484h.362c.238 0 .392-.138.392-.341 0-.192-.146-.332-.388-.332-.254 0-.409.134-.42.363h-.653c.01-.541.438-.899 1.108-.899.66 0 1.021.346 1.02.766 0 .34-.22.565-.528.637v.037c.406.057.64.309.64.68 0 .504-.48.851-1.158.851-.67 0-1.125-.361-1.15-.916h.684c.01.217.185.352.457.352.261 0 .439-.143.439-.356 0-.222-.168-.357-.443-.357z"
                            />
                          </g>
                        </svg>
                      </div>
                      <input
                        type="number"
                        {...register("RI", {
                          required: "Please Provide Valid Email",
                        })}
                        required
                        id="input-group-1"
                        className="ml-10 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Report ID"
                      />
                    </div>
                  </div>
                </div>

                <label
                  for="message"
                  class="mb-2 ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Feedback
                </label>
                <textarea
                  {...register("instructions", {
                    required: "Please Provide Valid Email",
                  })}
                  id="message"
                  required
                  rows="4"
                  class="ml-44 block w-101 rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Write Your Feedback Here..."
                ></textarea>
                <button
                  type="submit"
                  className=" focus:ring-parimary ml-101 mt-5 rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-primary focus:outline-none focus:ring-4 dark:bg-button dark:hover:bg-primary dark:focus:ring-button sm:w-auto lg:w-32"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
