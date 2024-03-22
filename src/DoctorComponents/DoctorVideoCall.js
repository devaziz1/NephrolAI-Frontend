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

export default function DoctorVideoCall() {
  const EMAIL_SERVICE_ID = "service_c1p21lp";
  const EMAIL_TEMPLATE_ID = "template_so11enf";
  emailjs.init("Io4FrOK7WdMTO_sS3");
  const [appointments, setAppointments] = useState([]);

  const { userEmail } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [filesend, setfilesend] = useState(false);
  const [patient, setPatient] = useState();
  const [link, setlink] = useState();

  //send link to patient
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpenFac = (email) => {
    setModalOpen(true);
    setPatient(email);
  };

  const modalCloseFac = () => {
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Add one day to the current date
    dateObject.setDate(dateObject.getDate() + 1);

    const formattedDate = dateObject.toISOString().split("T")[0]; // Format: "2023-07-25"
    return formattedDate;
  };

  function sendEmailToSeller() {
    console.log("Inside email.js ");
    const templateParams = {
      patient_email: `${patient}`,
      link: `${link}`,
    };

    console.log("Email Params:", templateParams);

    emailjs
      .send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setfilesend(true);
        setTimeout(() => {
          setfilesend(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }

  const fetchDoctorAppointments = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctor/onlineAppointments/${userEmail}`
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
            <h2 className="mx-80 mb-3 mt-10 text-3xl font-bold dark:text-white">
              Online Appointments
            </h2>
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
                        src={require("../images/video-call.png")}
                        className="mx-auto h-32 w-32  text-3xl "
                        alt="Logo"
                      />
                    </div>
                  </div>
                  <p className="ml-24 mt-3 text-2xl font-semibold">
                    Send Meeting Link To Patient
                  </p>
                  {filesend && (
                    <>
                      <div
                        className="ml-32 w-64 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 animate-ease-in-out"
                        role="alert"
                      >
                        <strong className="font-bold">
                          Link Send Successfully
                        </strong>
                      </div>
                    </>
                  )}

                  <input
                    type="text"
                    id="input-group-1"
                    onChange={(e) => setlink(e.target.value)}
                    className="mb-5 ml-24 mt-6 block w-80 rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Meeting Link"
                  />
                  <button
                    onClick={sendEmailToSeller}
                    className="mb-6 ml-80 mr-28 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
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
                </div>
              </div>
            )}
            <div class="relative mr-5 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
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

                    <th scope="col" class="px-6 py-3">
                      Date
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

                      <td class="px-6 py-4">{formatDate(data.createdAt)}</td>

                      <td class="flex items-center space-x-3 px-6 py-4">
                        <div onClick={() => modalOpenFac(data.email)}>
                          <svg
                            viewBox="0 0 24 24"
                            fill="green"
                            className="h-10 w-10"
                          >
                            <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                            <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a1 1 0 00-.086-1.391l-4.064-3.696z" />
                          </svg>
                        </div>
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
