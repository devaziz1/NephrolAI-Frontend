import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";

import Lottie from "lottie-react";
import "../animation.css";
import emailjs from "emailjs-com";

import Loader from "../Loader.json";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function DoctorAppointments() {
  const EMAIL_SERVICE_ID = "service_nst4kmc";
  const EMAIL_TEMPLATE_ID = "template_7t6rcge";
  emailjs.init("tF4UWaKKuRiTnbWRv");
  const [appointments, setAppointments] = useState([]);
  const data = ["All", "Completed", "Pending"];

  const { userEmail } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Add one day to the current date
    dateObject.setDate(dateObject.getDate() + 1);
  
    const formattedDate = dateObject.toISOString().split("T")[0]; // Format: "2023-07-25"
    return formattedDate;
  };
  
  const deleteApp = useCallback(async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/patient/deleteApp/${id}`
      );
      console.log(response);
      fetchDoctorAppointments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cancelApp = useCallback(async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/patient/cancelApp/${id}`
      );
      console.log(response);
      fetchDoctorAppointments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeAppStatus = (status, id, pemail, appdate, slot) => {
    console.log("Inside change appointment status");
    console.log(pemail);
    console.log(appdate);
    console.log(slot);
    const appdatee = formatDate(appdate);
    sendEmailToSeller(pemail,appdatee,slot);
    if (status === "Pending") {
      cancelApp(id);
    } else {
      deleteApp(id);
    }
  };

  function sendEmailToSeller(pEmail, appDate, slot) {
    console.log("Inside email.js ");
    const templateParams = {
      doctor_Email: `${userEmail}`,
      app_date: `${appDate}`,
      patient_Email: `${pEmail}`,
      app_slot: `${slot}`,
    };

    console.log("Email Params:", templateParams);

    emailjs
      .send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }



  const fetchDoctorAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctor/appiontments/${userEmail}`
      );
      setAppointments(response.data);
      console.log("Appoitments data: " + response.data);
    } catch (error) {
      console.log(error);
    }
  }, [userEmail]);

  const filterAppointments = () => {
    let filteredAppointments = appointments;

    if (selectedStatus !== "All") {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }

    if (searchInput.trim() !== "") {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        appointment.email.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filteredAppointments;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    fetchDoctorAppointments();
  }, [fetchDoctorAppointments]);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="lottie-container">
            <Lottie animationData={Loader} />
          </div>
        ) : (
          <div>
            <h2 className="mx-80 mb-3 mt-5 text-3xl font-bold dark:text-white">
              My Appointments
            </h2>
            <div className="mr-3 grid grid-cols-12 p-3 ">
              <div className="xs:flex-col col-span-12 flex md:flex-row md:items-center md:justify-between ">
                <div className="col-span-6">
                  <label
                    htmlFor="status"
                    className="font-inter mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>

                  <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                    {({ open }) => (
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full min-w-[120px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="block truncate">
                              {selectedStatus}
                            </span>
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
                            onChange={(e) => setSelectedStatus(e.target.value)}
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
                                      selectedStatus === val ? "text-white" : ""
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
                <div className="xs:mt-3 col-span-6 sm:mt-0">
                  <form>
                    <label
                      htmlFor="default-search"
                      className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="mt-5 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Search Patient By Email"
                        required
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="relative mr-5 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      <div class="flex items-center">S/N</div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Patient's Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Slot
                    </th>
                    <th scope="col" class="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterAppointments().map((data, index) => (
                    <tr
                      key={data.id}
                      class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td class="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.email}
                      </th>
                      <td class="px-6 py-4">{data.name}</td>
                      <td class="px-4 py-4">{data.slot}</td>
                      <td class="px-4 py-4">
                        <a
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md ${
                            data.status === "Pending"
                              ? " bg-yellow-200 text-yellow-400"
                              : "bg-green-200 text-green-400"
                          } px-2 py-0.5 text-sm font-medium leading-6  shadow-sm`}
                          data-rounded="rounded-md"
                          data-primary="blue-600"
                          data-primary-reset="{}"
                        >
                          {data.status}
                        </a>
                      </td>
                      <td class="px-6 py-4">{formatDate(data.createdAt)}</td>
                      <td class="px-6 py-4">
                        <a
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium leading-6 shadow-sm `}
                          data-rounded="rounded-md"
                          data-primary="blue-600"
                          data-primary-reset="{}"
                        >
                          {data.type}
                        </a>
                      </td>

                      <td class="flex items-center space-x-3 px-6 py-4">
                        <a
                          onClick={() => changeAppStatus(data.status, data._id,data.email,data.createdAt,data.slot)}
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md ${
                            data.status === "Pending"
                              ? " bg-red-200 text-red-500 "
                              : "bg-red-200 text-red-400"
                          } cursor-pointer px-2 py-0.5 text-sm font-medium leading-6 shadow-sm`}
                          data-rounded="rounded-md"
                          data-primary="blue-600"
                          data-primary-reset="{}"
                        >
                          {data.status === "Pending" ? "Cancel" : "Delete"}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
