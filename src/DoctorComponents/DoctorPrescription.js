import React, {
  useCallback,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

import DatePicker from "react-datepicker";

import { useForm } from "react-hook-form";

import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";

export default function DoctorPrescription() {
  const { userEmail } = useContext(UserContext);

  const [startDate, setstartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [submitDone, setSubmitDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorsMessage, seterrorsMessage] = useState("");


  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const handleStartDate = (date) => {
    setstartDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const submitPrescription = async (data) => {

    try {
      const response = await axios.post(
        "http://localhost:8080/doctor/createPrescription",
        {
          doctorEmail: userEmail,
          patientEmail: data.email,
          description: data.instructions,
          dosage: data.dosage,
          medicineName: data.MN,
          startDate: startDate,
          endDate: endDate,
        }
      );
      if (response) {
        setSubmitDone(true);
        resetField("email");
        resetField("instructions");
        resetField("dosage");
        resetField("MN");
        setstartDate();
        setEndDate();
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

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

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
                src={require("../images/dprescription.png")}
                className="mx-auto w-32 text-3xl "
                alt="Logo"
              />
              <h2 className="mb-4 ml-96 mt-5 text-2xl font-bold">
                Prescription Form
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
                      Prescription Submitted Successfully
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
                      Enter Medicine Name
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="ml-10 h-4 w-4 text-gray-500 dark:text-gray-400"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.828 8.9L8.9 1.827a4 4 0 115.657 5.657l-7.07 7.071A4 4 0 111.827 8.9zm9.128.771l2.893-2.893a3 3 0 10-4.243-4.242L6.713 5.429l4.243 4.242z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        {...register("MN", {
                          required: "Please Provide Valid Email",
                        })}
                        required
                        onInput={(e) => {
                          if (e.target.value.length > 30) {
                            e.target.value = e.target.value.slice(0, 30);
                          }
                        }}
                        id="input-group-1"
                        className="ml-10 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Medicine Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-2 flex-col">
                    <label
                      htmlFor="input-group-1"
                      className=" ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Start Date
                    </label>
                    <div className="ml-44  mt-2 flex justify-center">
                      <DatePicker
                        selected={startDate}
                        onChange={handleStartDate}
                        minDate={today}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                        className="w-36 rounded border-2  px-4 py-2  transition-colors duration-300 ease-in-out  hover:shadow focus:border-blue-300 focus:outline-none focus:ring"
                        // Additional styles
                        calendarClassName="bg-ofWhite shadow-lg rounded-lg mt-2"
                        popperPlacement="bottom-start"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex-col">
                    <label
                      htmlFor="input-group-1"
                      className=" ml-5 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Start Date
                    </label>
                    <div className="ml-5  mt-2 flex justify-center">
                      <DatePicker
                        selected={endDate}
                        onChange={handleEndDate}
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                        className="w-36 rounded border-2  px-4 py-2 text-gray-700 transition-colors duration-300 ease-in-out  hover:shadow focus:border-blue-300 focus:outline-none focus:ring"
                        // Additional styles
                        calendarClassName="bg-ofWhite shadow-lg rounded-lg mt-2"
                        popperPlacement="bottom-start"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="input-group-1"
                      className="mb-2 ml-10 mt-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Medicine Dosage
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          viewBox="0 0 640 512"
                          fill="currentColor"
                          className="ml-10 h-5 w-5 text-gray-500 dark:text-gray-400"
                        >
                          <path d="M184 48h144c4.4 0 8 3.6 8 8v40H176V56c0-4.4 3.6-8 8-8zm-56 8v40H64c-35.3 0-64 28.7-64 64v96h360.2c32.3-39.1 81.1-64 135.8-64 5.4 0 10.7.2 16 .7V160c0-35.3-28.7-64-64-64h-64V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zm192 296h-96c-17.7 0-32-14.3-32-32v-32H0v128c0 35.3 28.7 64 64 64h296.2c-25.1-30.4-40.2-69.5-40.2-112 0-5.4.2-10.7.7-16h-.7zm320 16c0-79.5-64.5-144-144-144s-144 64.5-144 144 64.5 144 144 144 144-64.5 144-144zm-144-80c8.8 0 16 7.2 16 16v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        pattern="[0-9]-[0-9]-[0-9]"
                        {...register("dosage", {
                          required: "Please Provide Valid Email",
                          maxLength: {
                            value: 5,
                            message: "Dosage Quantity range from 1 to 9",
                          },

                        })}
                        required
                        id="input-group-1"
                        className="ml-10 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="1-1-1"
                      />
                    </div>
                  </div>
                  {errors.dosage && (
                  <p
                    id="filled_error_help"
                    className="mx-24 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">{errors.email.message}</span>
                  </p>
                )}
                </div>
                <label
                  for="message"
                  class="mb-2 ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Instructions
                </label>
                <textarea
                  {...register("instructions", {
                    required: "Please Provide Valid Email",
                  })}
                  id="message"
                  required
                  onInput={(e) => {
                    if (e.target.value.length > 40) {
                      e.target.value = e.target.value.slice(0, 40);
                    }
                  }}
                  rows="3"
                  class="ml-44 block w-101 rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  placeholder="Write Your Instructions  Here..."
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
