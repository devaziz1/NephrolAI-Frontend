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
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserContext } from "../Hooks/AuthContext";

export default function DoctorComplaint() {
  const { userEmail } = useContext(UserContext);

  const [complaint, setComplaint] = useState();
  const [submitDone, setSubmitDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const submitComplaint = useCallback(
    async (event) => {
      event.preventDefault();
      const compainner = "Doctor";

      console.log("Inside Complainner function");
      console.log(userEmail);
      console.log(compainner);
      console.log(complaint);
      try {
        const response = await axios.post(
          "http://localhost:8080/patient/submitComplaint",
          {
            email: userEmail,
            complainer: compainner,
            description: complaint,
          }
        );
        if (response) {
          setComplaint("");
          setSubmitDone(true);
          setTimeout(() => {
            setSubmitDone(false);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [complaint]
  );

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
            <div className="mt-10 ">
              <img
                src={require("../images/Customercomplain.png")}
                className="mx-auto w-32 text-3xl "
                alt="Logo"
              />
              <h2 className="mb-4 ml-96 mt-5 text-2xl font-bold">
                Compaint Form
              </h2>

              {submitDone && (
                <>
                  <div
                    className="ml-72 w-96  rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                    role="alert"
                  >
                    <strong className="font-bold">
                      Your Compaint Submitted Successfully
                    </strong>
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
                Please use the form below to submit your complaint. Be specific
                and provide as much detail as possible to help us address your
                concerns effectively
              </p>

              <label
                for="message"
                class="mb-2 ml-44 block text-base font-semibold text-gray-900 dark:text-white"
              >
                Your message
              </label>

              <form onSubmit={submitComplaint}>
                <textarea
                  id="message"
                  value={complaint}
                  onChange={(e) => {
                    if (e.target.value.length <= 130) {
                      setComplaint(e.target.value);
                    }
                  }}
                  rows="4"
                  required
                  class="ml-44 block w-100 rounded-lg  border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
                  placeholder="Write Your Complaint  Here..."
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
        )}
      </div>
    </>
  );
}
