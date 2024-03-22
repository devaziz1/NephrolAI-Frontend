import React, {
  useCallback,
  Fragment,
  useState,
  useEffect,
  useContext,
} from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "../calender.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "../Hooks/AuthContext";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import "react-datepicker/dist/react-datepicker.css";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

export default function BookAppointment() {
  const [page1, showPage1] = useState(1);
  const [appDoc, setAppDoc] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);

  //set Context for Appiotment

  const { setappoitmentDoctor } = useContext(UserContext);
  const { setselectedSlot } = useContext(UserContext);
  const { setselecteddDate } = useContext(UserContext);

  const { selecteddDate } = useContext(UserContext);

  const data = ["Physical", "Online"];

  //Show Doctor Functions
  const [regdoctors, setregDoctors] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Physical");
  const [appType, setappType] = useState("Physical");

  // Stripe API States

  function getDayNameFromString(dateString) {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  const [cardnumber, setcardnumber] = useState();
  const [expireDate, setexpireDate] = useState();
  const [securityCode, setsecurityCode] = useState();



  const handletoken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:8080/patient/payment", {
        token: token.id,
        amount: totalAmount,
      });
      console.log("Inside payment method");
      confirmAppiontment();

    } catch (error) {
      console.log(error);
    }
  };

  const tokenHandle = (token) => {
    handletoken(100, token);
    console.log("Inside token handle function ");
  };
  const setDocEmail = (email) => {
    localStorage.setItem("doctorApp", email);

    setAppDoc(email);
    setappoitmentDoctor(email);
    showPage1(2);
  };

  const fecthRegisterPatients = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/patient/getAllDoctor/655e5dcba812c44f8a7f2a3f"
      );
      setregDoctors(response.data);

      console.log(response.data);
      console.log("Timess");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthRegisterPatients(); // Call the function here after it's defined
  }, [fecthRegisterPatients]);

  // Confirm Appointment Functions

  const [stateSlots, setslots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fecthDoctorSchedule = useCallback(async () => {
    try {
      const selectedDoc = localStorage.getItem("doctorApp");

      const day = localStorage.getItem("day");

      const response = await axios.get(
        `http://localhost:8080/doctor/myslots?email=${selectedDoc}&day=${day}`
      );
      console.log("Response from backend: " + response.data.slots);
      const Available = response.data.slots.map((item) => item);
      setslots(Available);
    } catch (error) {
      console.log(error);
      setslots([]);
    }
  }, [appDoc, selecteddDate, selectedDate]);

  const handleDateChange = (date) => {
    
    localStorage.setItem("day", getDayNameFromString(date));
    localStorage.setItem("date", date);
    setSelectedDate(date);
    setselecteddDate(date);
    fecthDoctorSchedule();
  };
  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const currentDate = new Date();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 7);

  const confirmAppHandler = (slot) => {
    localStorage.setItem("appType", appType);
    localStorage.setItem("slot", slot);
    if (appType === "Online") {
      showPage1(3);
      return;
    }else{
      setselectedSlot(slot);
      const formattedDate = formatDate(selectedDate);
      console.log(formattedDate);
      setselecteddDate(formattedDate);
      setappoitmentDoctor(appDoc);
  
      confirmAppiontment();
    }
  };

  const confirmAppiontment = useCallback(async () => {
    try {
      const doctoremail = localStorage.getItem("doctorApp");
      const patientemail = localStorage.getItem("patientEmail");
      const sslot = localStorage.getItem("slot");
      const appointmentType = localStorage.getItem("appType");
      const date = localStorage.getItem("date");
      const day = localStorage.getItem("day");

      console.log("Inside confirm appointment date is :- " + date);
      const response = await axios.post(
        "http://localhost:8080/patient/createAppointment",
        {
          email: patientemail,
          doctorEmail: doctoremail,
          slot: sslot,
          type: appointmentType,
          createdAt: date,
          day: day,
        }
      );

      if (response) {
        localStorage.removeItem("doctorApp");
        localStorage.removeItem("slot");
        localStorage.removeItem("appType");
        localStorage.removeItem("date");

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        showPage1(1);
      }
    } catch (error) {
      console.log("Confirm Appointment Error: ");
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
            {page1 === 2 ? (
              <>
                <div className="mt-5 flex-col">
                  <h2 className=" text-center text-xl font-bold">
                    Select Appointment Type
                  </h2>
                  <div className="mt-2 flex justify-center">
                    <Listbox value={appType} onChange={setappType}>
                      {({ open }) => (
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full min-w-[120px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="block truncate">{appType}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              onChange={(e) =>
                                setSelectedStatus(e.target.value)
                              }
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {data.map((val, index) => (
                                <Listbox.Option
                                  key={val}
                                  className={`${
                                    selectedStatus === val
                                      ? "bg-violet-500 font-bold"
                                      : "text-gray-900"
                                  } w-full px-1 py-1`}
                                  value={val}
                                >
                                  <div className="flex w-full items-center justify-between">
                                    <span
                                      className={
                                        selectedStatus === val
                                          ? "text-white"
                                          : ""
                                      }
                                    >
                                      {val}
                                    </span>
                                    {selectedStatus === val ? (
                                      <span>
                                        <CheckIcon
                                          className="h-5 w-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      )}
                    </Listbox>
                  </div>
                </div>
                <div className="mt-5 flex-col">
                  <h2 className="mb-4 text-center text-xl font-bold">
                    Select Appointment Date
                  </h2>
                  <div className="mt-2  flex justify-center">
                    <Calendar
                      className="custom-calendar"
                      onChange={handleDateChange}
                      value={selectedDate}
                      minDate={currentDate}
                      maxDate={maxDate}
                    />
                  </div>
                </div>

                <div></div>

                <div className="mt-5 flex-col">
                  <h2 className="mb-4 text-center text-xl font-bold">
                    Availale Slots:{" "}
                  </h2>
                  {stateSlots.length > 0 ? (
                    <div className="mr-7 mt-4 grid grid-cols-5 justify-center gap-4 ">
                      {stateSlots.map((data, index) => (
                        <button
                          key={index}
                          onClick={() => confirmAppHandler(data)}
                          class="group relative animate-fade-up overflow-hidden rounded bg-button px-5 py-2.5 text-white transition-all duration-300 ease-out  animate-delay-200 animate-duration-1000 hover:ring-2 hover:ring-offset-2"
                        >
                          <span class="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform "></span>
                          <span class="relative ">{data}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {selectedDate && (
                        <div
                          className="ml-96 w-60 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
                          role="alert"
                        >
                          <strong className="font-bold">
                            No Slot Available
                          </strong>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : page1 === 1 ? (
              <>
                <div>
                  <h2 className=" mx-80 mb-3 mt-6 text-3xl font-bold dark:text-white">
                    Available Doctors
                  </h2>
                </div>

                <div class="relative mb-10 mr-5 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 ">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="p-4">
                          <div class="flex items-center">S/N</div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Phone No.
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Specialization
                        </th>

                        <th scope="col" class="px-4 py-3">
                          Ratings
                        </th>

                        <th scope="col" class="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {regdoctors.map((data, index) => (
                        <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                          <td class="px-6 py-4">{index + 1}</td>
                          <th
                            scope="row"
                            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {data.email}
                          </th>
                          <td class="px-6 py-4">{data.name}</td>
                          <td class="px-4 py-4">{data.phoneNumber}</td>

                          <td class="px-6 py-4">{data.specialization}</td>
                          <td class="px-6 py-4">
                            <div className="flex">
                              {data.rating}
                              <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className=" ml-1 mt-0.5 h-4 w-4  !fill-yellow-500 transition-colors duration-200  group-hover:fill-yellow-600 dark:fill-gray-600"
                              >
                                <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                              </svg>
                            </div>
                          </td>

                          <td class="px- flex items-center space-x-2 py-1">
                            <a
                              class="whitespace-no-wrap inline-flex cursor-pointer items-center justify-center rounded-md border border-green-700 bg-green-600 px-2 py-1 text-sm font-medium leading-6 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                              data-rounded="rounded-md"
                              data-primary="blue-600"
                              data-primary-reset="{}"
                              onClick={() => {
                                setDocEmail(data.email);
                              }}
                            >
                              Book Appointment
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : page1 === 3 ? (
              <>
                <div className="ml-44">
                  <div className="mt-10">
                    <img
                      src={require("../../src/images/OnlinePayment.PNG")}
                      className="mx-40 h-28 w-40 text-3xl "
                      alt="Logo"
                    />
                    <h2 className="mb-4 ml-40 mt-5 text-2xl font-bold">
                      Payment Details
                    </h2>

                   

                    <div>
                      <label
                        htmlFor="input-group-1"
                        className="mb-2 ml-24 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Card Number
                      </label>
                      <div className="relative mb-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <svg
                            className="ml-24 h-5 w-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1H2zm13 4H1v5a1 1 0 001 1h12a1 1 0 001-1V7z" />
                            <path d="M2 10a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          onChange={(e) => setcardnumber(e.target.value)}
                          id="input-group-1"
                          className="ml-24 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="Card Number"
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <div>
                        <label
                          htmlFor="input-group-1"
                          className="mb-2 ml-24 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Expiration Date
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
                            onChange={(e) => setexpireDate(e.target.value)}
                            id="input-group-1"
                            className="ml-24 block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="dd/mm/yyyy"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="input-group-1"
                          className="mb-2 ml-5 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter Security Code
                        </label>
                        <div className="relative mb-2">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <svg
                              className="ml-5 h-5 w-5 text-gray-500 dark:text-gray-400"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setsecurityCode(e.target.value)}
                            id="input-group-1"
                            className="ml-5 block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Security Code"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <h1 className="text-black text-lg font-semibold ml-24 ">
                        Total amount
                      </h1>
                      <div className="ml-44 text-black text-lg font-semibold mt-5">
                        10$
                      </div>
                    </div>

                    <div
                    
                      className=" ml-24 mt-1"
                    >
                       <Stripe
                      stripeKey="pk_test_51OFeIXAjIv746725reMuQwc4e7qWqq9RB5mW8jTwrPuUwLaPhxdCYbta9oMiSOBYHh7g8YfbKGcIm6XngqAOj7tI00OPF71SID"
                      token={tokenHandle}
                    />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <h2>page 3</h2>
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
