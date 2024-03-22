import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment,
  useRef,
} from "react";
import Lottie from "lottie-react";
import emailjs from "emailjs-com";
import "../animation.css";
import Loader from "../Loader.json";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";
import { useForm } from "react-hook-form";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Appointments() {
  const EMAIL_SERVICE_ID = "service_nst4kmc";
  const EMAIL_TEMPLATE_ID = "template_b6gkzkf";
  emailjs.init("tF4UWaKKuRiTnbWRv");
  const { patientEmail } = useContext(UserContext);
  const data = ["All", "Completed", "Pending"];

  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [appiontment, setAppointment] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesend, setfilesend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Add one day to the current date
    dateObject.setDate(dateObject.getDate() + 1);
  
    const formattedDate = dateObject.toISOString().split("T")[0]; // Format: "2023-07-25"
    return formattedDate;
  };

  
  function sendEmailToSeller(doctorEmail,appDate,patientemail,slot) {
    console.log("Inside email.js ");
    const templateParams = {
      doctor_Email: `${doctorEmail}`,
      app_Date: `${appDate}`,
      patient_Email: `${patientemail}`,
      app_slot: `${slot}`
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

  const uploadPDF = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("patientEmail", patientEmail);
    formData.append("doctorEmail", selectedDoctor);
    formData.append("pdfFile", selectedFile);

    console.log(formData.get("patientEmail")); // Check if patientEmail is being sent
    console.log(formData.get("pdfFile"));
    try {
      const response = await axios.post(
        "http://localhost:8080/patient/UploadReport",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        setfilesend(true);

        setTimeout(() => {
          setfilesend(false);
        }, 5000);
      }
      console.log(response.data.message);
    } catch (error) {
      console.error("Error uploading patient information and PDF:", error);
    }
  };

  const deleteApp = useCallback(async (id) => {
    
    try {
      const response = await axios.delete(
        `http://localhost:8080/patient/deleteApp/${id}`
      );
      console.log(response);
      fecthDoctorAppointments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cancelApp = useCallback(async (id) => {
   
    try {
      console.log("Inside cancel appointment");
      const response = await axios.post(
        `http://localhost:8080/patient/cancelApp/${id}`,
      );
      console.log(response);
      fecthDoctorAppointments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeAppStatus = (status, id, demail, appdate, slot) => {
    // Display a confirmation prompt
    const isConfirmed = window.confirm("Are you sure to cancel the appointment?");
  
    // If the user confirms, proceed with the appointment cancellation
    if (isConfirmed) {
      console.log("Inside change appointment status");
      console.log(demail);
      console.log(status);
      const appdatee = formatDate(appdate);
      sendEmailToSeller(demail, appdatee, patientEmail, slot);
  
      if (status === "Pending") {
        cancelApp(id);
      } else {
        deleteApp(id);
      }
    } else {
      // If the user cancels, do nothing or handle it as needed
      console.log("Appointment cancellation was cancelled by the user.");
    }
  };
  

  const fecthDoctorAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/appiontments/${patientEmail}`
      );
      console.log(response.data);
      setAppointment(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [patientEmail]);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthDoctorAppointments(); // Call the function here after it's defined
  }, [fecthDoctorAppointments]);

  //Upload PDF
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpenFac = (email) => {
    setModalOpen(true);
    setSelectedDoctor(email);
  };

  const modalCloseFac = () => {
    setModalOpen(false);
  };

  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Process the file as needed, e.g., upload it, store it, etc.
    console.log(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
   
    setSelectedFile(file);
  };

  const filterAppointments = () => {
    let filteredAppointments = appiontment;

    if (selectedStatus !== "All") {
      filteredAppointments = filteredAppointments.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }

    if (searchInput.trim() !== "") {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        appointment.doctorEmail
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    }

    return filteredAppointments;
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
    <div>
      {isLoading ? (
        <div className="lottie-container">
          <Lottie animationData={Loader} />
        </div>
      ) : (
        <>
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
                      placeholder="Search Doctor By Email"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {appiontment.length > 0 ? (
            <div class="relative mr-5 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="p-4">
                      <div class="flex items-center">S/N</div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Doctor's Email
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
                      File
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterAppointments().map((data, index) => (
                    <tr
                      key={data._id}
                      class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <td class="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        class="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.doctorEmail}
                      </th>
                      <td class="px-2 py-2">{data.DoctorName}</td>
                      <td class="px-4 py-4">{data.slot}</td>
                      <td class="px-4 py-4">
                        <a
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md ${
                            data.status === "Pending"
                              ? "bg-yellow-200  text-yellow-400"
                              : "bg-green-200  text-green-400"
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
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md  px-2 py-1 text-sm font-medium leading-6  shadow-sm `}
                          data-rounded="rounded-md"
                          data-primary="blue-600"
                          data-primary-reset="{}"
                        >
                          {data.type}
                        </a>
                      </td>
                      <td class="px-6 py-4">
                        <svg
                          onClick={() => modalOpenFac(data.doctorEmail)}
                          fill="none"
                          viewBox="0 0 24 24"
                          className="h-6 w-6 cursor-pointer"
                        >
                          <path
                            fill="currentColor"
                            d="M14 0a5 5 0 015 5v12a7 7 0 11-14 0V9h2v8a5 5 0 0010 0V5a3 3 0 10-6 0v12a1 1 0 102 0V6h2v11a3 3 0 11-6 0V5a5 5 0 015-5z"
                          />
                        </svg>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".png,.jpg,.jpeg,.gif,.svg"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                        />
                      </td>
                      <td class="flex items-center space-x-3 px-6 py-4">
                        <a
                          onClick={()=> changeAppStatus(data.status, data._id,data.doctorEmail,data.createdAt,data.slot)}
                          className={`whitespace-no-wrap inline-flex items-center justify-center rounded-md ${
                            data.status === "Pending"
                              ? " bg-red-600"
                              : "bg-gradient-to-r from-rose-700 to-pink-600"
                          } cursor-pointer px-2 py-0.5 text-sm font-medium leading-6 text-white shadow-sm`}
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
          ) : (
            <div
              className="ml-72 w-72 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
              role="alert"
            >
              <strong className="font-bold">No Appiontment Yet</strong>
            </div>
          )}

          {modalOpen && (
            <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto ">
              <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

              <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
                <div className="modal-content px-6 py-4 text-left">
                  {/* Modal header */}
                  <div className="flex flex-row-reverse items-center pb-3">
                    <button
                      onClick={modalCloseFac}
                      className="modal-close z-50 cursor-pointer"
                    >
                      <svg
                        className="fill-current text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path
                          d="M1.39 1.393a1 1 0 011.414 0L9 7.586l6.197-6.193a1 1 0 111.414 1.414L10.414 9l6.197 6.197a1 1 0 11-1.414 1.414L9 10.414l-6.197 6.197a1 1 0 01-1.414-1.414L7.586 9 1.39 2.803a1 1 0 010-1.41z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <img
                      src={require("../images/Report.png")}
                      className="mx-auto h-28 w-32  text-3xl "
                      alt="Logo"
                    />
                  </div>
                </div>
                <p className="ml-32 text-2xl font-semibold">
                  Send Report to Doctor
                </p>
                {filesend && (
                  <>
                    <div
                      className="ml-32 w-64 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
                      role="alert"
                    >
                      <strong className="font-bold">
                        Report Send Successfully
                      </strong>
                    </div>
                  </>
                )}

                <form action="">
                  <div class="bg-grey-lighter ml-24 mr-10 mt-8 flex">
                    <label class="hover: flex w-80 cursor-pointer flex-col items-center rounded-lg border border-button bg-white px-4 py-6 uppercase tracking-wide text-button shadow-lg">
                      <svg
                        class="h-8 w-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span class="mt-2 text-base leading-normal">
                        {selectedFile ? selectedFile.name : "Select PDF Report"}
                      </span>
                      <input
                        type="file"
                        class="hidden"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                      />
                    </label>
                  </div>
                  <button
                    className="mb-6 ml-80 mr-28 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                    type="submit"
                    onClick={uploadPDF}
                  >
                    Send
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="ml-1 mt-1 h-4 w-5 cursor-pointer"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
