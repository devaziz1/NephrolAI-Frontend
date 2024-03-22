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

import { useForm } from "react-hook-form";

import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";

export default function PatientFeedback() {
  const { patientEmail } = useContext(UserContext);
  const [dEmail, setDoctorEmail] = useState("");
  const [errorsMessage, seterrorsMessage] = useState("");
  const [stars, setStars] = useState(5);
  const [comments, setcomments] = useState();
  const [submitDone, setSubmitDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const signUpUser = (event) => {
    event.preventDefault();
    setcomments("");
    setDoctorEmail("");
    setStars(5);

    axios
      .post("http://localhost:8080/patient/submitFeedback", {
        doctorEmail: dEmail,
        rating: stars,
      })
      .then(function (response) {
        console.log(response);
        setSubmitDone(true);
        setTimeout(() => {
          setSubmitDone(false);
        }, 3000);
        seterrorsMessage("");
      })
      .catch(function (error) {
        console.log(error);
        seterrorsMessage(error.response.data.mesg);
        setTimeout(() => {
          seterrorsMessage("");
        }, 3000);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
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

  return (
    <>
      <div>
        {isLoading ? (
          <div className="lottie-container">
            <Lottie animationData={Loader} />
          </div>
        ) : (
          <div>
            <div>
              <div className="mt-5 ">
                <img
                  src={require("../images/PDoctorFeedback3.png")}
                  className="mx-96 w-32 text-3xl "
                  alt="Logo"
                />
                <h2 className="mb-4 ml-96 mt-5 text-2xl font-bold">
                  Feedback Form
                </h2>

                {submitDone && (
                  <>
                    <div
                      className="mx-80 w-96  animate-jump-in rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
                      role="alert"
                    >
                      <strong className="font-bold">
                        Your Feedback Submitted Successfully
                      </strong>
                    </div>
                  </>
                )}

                {errorsMessage && (
                  <>
                    <div
                      className=" relative mx-80 w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                      role="alert"
                    >
                      <strong className="font-bold">{errorsMessage}</strong>
                    </div>
                  </>
                )}

                <p
                  for="message"
                  class=" ml-44 block text-base font-semibold text-gray-900 dark:text-white"
                >
                  Instructions
                </p>

                <p className="mb-4 ml-44 mr-64 mt-5 text-sm font-semibold">
                  Please use the form below to submit your feedback regarding
                  the doctor's services.
                </p>
                <form onSubmit={signUpUser}>
                  <div className="flex">
                    <div>
                      <label
                        htmlFor="input-group-1"
                        className="mb-2 ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter doctor's Email
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
                          onChange={(e) => {
                            setDoctorEmail(e.target.value);
                          }}
                          value={dEmail}
                          required
                          id="input-group-1"
                          className="ml-44 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="name@gmail.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="website-admin"
                        className="mb-2 ml-10 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Ratings
                      </label>
                      <div className="relative ">
                        <div className="rating ml-10 mt-2">
                          <input
                            type="radio"
                            name="rating"
                            value="1"
                            onChange={() => setStars(1)}
                            className="mask mask-star-2 bg-green-400"
                          />

                          <input
                            type="radio"
                            value="2"
                            name="rating"
                            onChange={() => setStars(2)}
                            className="mask mask-star-2 bg-green-400"
                          />
                          <input
                            type="radio"
                            value="3"
                            name="rating"
                            onChange={() => setStars(3)}
                            className="mask mask-star-2 bg-green-400"
                          />
                          <input
                            type="radio"
                            name="rating"
                            value="4"
                            onChange={() => setStars(4)}
                            className="mask mask-star-2 bg-green-400"
                          />

                          <input
                            type="radio"
                            name="rating"
                            value="5"
                            onChange={() => setStars(5)}
                            className="mask mask-star-2 bg-green-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <label
                    for="message"
                    class="mb-2 ml-44 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    onChange={(e) => {
                      setcomments(e.target.value);
                    }}
                    value={comments}
                    required
                    rows="4"
                    class="ml-44 block w-100 rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
                    placeholder="Write Your Feedback  Here..."
                  ></textarea>

                  <button
                    type="submit"
                    className=" focus:ring-parimary ml-99 mt-5 rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-primary focus:outline-none focus:ring-4 dark:bg-button dark:hover:bg-primary dark:focus:ring-button sm:w-auto lg:w-32"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
