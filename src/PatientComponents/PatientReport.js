import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

export default function PatientReport() {
  const [screen1, setScreen1] = useState(true);
  const [screen2, setScreen2] = useState(false);
  const [screen3, setScreen3] = useState(false);
  const [pdfReports, setPdfReports] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [seletedFeedback, setselectedFeedback] = useState("");
  const { patientEmail } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllPdfReports = useCallback(async () => {
    axios
      .get(`http://localhost:8080/patient/getreports/${patientEmail}`)
      .then((response) => {
        setPdfReports(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthAllPdfReports(); // Call the function here after it's defined
  }, [fecthAllPdfReports]);

  const fecthAllFeedback = useCallback(async () => {
    axios
      .get(`http://localhost:8080/patient/getfeedback/${patientEmail}`)
      .then((response) => {
        setFeedback(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthAllFeedback(); // Call the function here after it's defined
  }, [fecthAllFeedback]);

  const getselectedFeedback = useCallback(async (ID) => {
    axios
      .get(`http://localhost:8080/patient/getFeedbackbyID/${ID}`)
      .then((response) => {
        setselectedFeedback(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDownload = async (reportId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/downloadreport/${reportId}`,
        {
          responseType: "blob", // Important for downloading binary data
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Report_${reportId}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {screen1 ? (
        <>
          <div className="mt-32 flex">
            <div className="ml-10">
              <div class="max-w-sm rounded-lg border  border-primary  bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800 ">
                <img
                  src={require("../images/MRFiles.png")}
                  className="mx-auto h-32 w-32  text-3xl "
                  alt="Logo"
                />
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Get Your Medical Report
                  </h5>
                </a>

                <p class="mb-1 text-xl text-gray-900 dark:text-white">
                  Instructions: Reports available within an hour of submission
                  to administration.{" "}
                </p>

                <button
                  className="mb-1  mr-28 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                  onClick={() => {
                    setScreen1(false);
                    setScreen2(true);
                    fecthAllPdfReports();
                  }}
                >
                  Get Report
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="ml-1 mt-1 h-4 w-5"
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
            <div className="ml-20">
              <div class="max-w-sm rounded-lg border  border-primary bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <img
                  src={require("../images/MRFeedback.png")}
                  className="mx-auto h-32 w-32  text-3xl "
                  alt="Logo"
                />
                <a href="#">
                  <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Get Feedback On Report
                  </h5>
                </a>

                <p class="mb-1 text-xl text-gray-900 dark:text-white">
                  Instructions: Feedback on reports available after scheduled
                  doctor's appointment.{" "}
                </p>

                <button
                  className="mb-1  mr-28 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                  type="submit"
                  onClick={() => {
                    setScreen3(true);
                    setScreen1(false);
                    fecthAllFeedback();
                  }}
                >
                  Get Feedback
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="ml-1 mt-1 h-4 w-5"
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
          </div>
        </>
      ) : screen2 ? (
        <>
          <div>
            {isLoading ? (
              <div className="lottie-container">
                <Lottie animationData={Loader} />
              </div>
            ) : (
              <div>
                <div className="mt-20 flex">
                  <div>
                    <button
                      onClick={() => {
                        setScreen1(true);
                        setScreen2(false);
                      }}
                      className="text-blue ml-10 inline-flex items-center rounded-lg py-2.5 text-center text-lg font-bold  "
                    >
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className=" h-6 w-6"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeMiterlimit={10}
                          strokeWidth={48}
                          d="M328 112L184 256l144 144"
                        />
                      </svg>
                      back
                    </button>
                  </div>

                  <h2 className="mb-4 ml-72 text-2xl font-bold dark:text-white">
                    My Reports
                  </h2>
                </div>

                {pdfReports.length > 0 ? (
                  <div class="relative ml-10 mr-16  overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="p-4">
                            <div class="flex items-center">S/N</div>
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Admin's Email
                          </th>

                          <th scope="col" class="px-4 py-3">
                            Created AT
                          </th>

                          <th scope="col" class="px-4 py-3">
                            Report
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdfReports.map((report, index) => (
                          <tr
                            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                            key={report._id}
                          >
                            <td class="px-6 py-4">{index + 1}</td>
                            <th
                              scope="row"
                              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              NephroAI@gmail.com
                            </th>

                            <td class="px-6 py-4">
                              {new Date(report.CreatedAt).toLocaleDateString()}
                            </td>
                            <td class=" px-6 py-4">
                              <button
                                className=" mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                                onClick={() => handleDownload(report._id)}
                              >
                                Download
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  height="1em"
                                  width="1em"
                                  className="ml-2 mt-0.5"
                                >
                                  <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z" />
                                  <path d="M7.646 11.854a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V1.5a.5.5 0 00-1 0v8.793L5.354 8.146a.5.5 0 10-.708.708l3 3z" />
                                </svg>
                              </button>
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
                    <strong className="font-bold">No Reports Yet</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : screen3 ? (
        <>
          <div>
            {isLoading ? (
              <div className="lottie-container">
                <Lottie animationData={Loader} />
              </div>
            ) : (
              <div>
                <div className="mt-20 flex">
                  <div>
                    <button
                      onClick={() => {
                        setScreen1(true);
                        setScreen2(false);
                      }}
                      className="text-blue ml-10 inline-flex items-center rounded-lg py-2.5 text-center text-lg font-bold  "
                    >
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className=" h-6 w-6"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="square"
                          strokeMiterlimit={10}
                          strokeWidth={48}
                          d="M328 112L184 256l144 144"
                        />
                      </svg>
                      back
                    </button>
                  </div>

                  <h2 className="mb-4 ml-72 text-2xl font-bold dark:text-white">
                    Feedback
                  </h2>
                </div>

                {feedback.length > 0 ? (
                  <div class="relative ml-10 mr-16  overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="p-4">
                            <div class="flex items-center">S/N</div>
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Report ID
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Doctor's Email
                          </th>

                          <th scope="col" class="px-4 py-3">
                            Created AT
                          </th>

                          <th scope="col" class="px-4 py-3">
                            Report
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.map((feedbackk, index) => (
                          <tr
                            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                            key={feedbackk._id}
                          >
                            <td class="px-6 py-4">{index + 1}</td>
                            <td class="px-6 py-4">{feedbackk.reportID}</td>
                            <th
                              scope="row"
                              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {feedbackk.DoctorEmail}
                            </th>

                            <td class="px-6 py-4">
                              {new Date(
                                feedbackk.CreatedAt
                              ).toLocaleDateString()}
                            </td>
                            <td class=" px-6 py-4">
                              <button
                                onClick={() => {
                                  handleModalOpen();
                                  getselectedFeedback(feedbackk._id);
                                }}
                              >
                                <svg
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  className="h-6 w-6"
                                >
                                  <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {isOpen && (
                          <div className="fixed inset-0 z-50 flex animate-jump-in  items-center  justify-center overflow-auto">
                            <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

                            <div className="modal-container z-50  rounded bg-white shadow-lg ">
                              <div className="modal-content px-6 py-4 text-left">
                                {/* Modal header */}
                                <div className="flex flex-row-reverse items-center pb-3">
                                  <button
                                    onClick={handleModalClose}
                                    className="modal-close z-50 cursor-pointer"
                                  >
                                    <svg
                                      className="fill-current text-black"
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
                                    src={require("../images/MRFeedback.png")}
                                    className="mx-auto h-28 w-32  text-3xl "
                                    alt="Logo"
                                  />
                                </div>

                                <div>
                                  <p className="text-lg font-bold ">
                                    FeedBack:
                                  </p>
                                  <p className="text-base font-medium ">
                                    {seletedFeedback}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div
                    className="ml-72 w-72 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700"
                    role="alert"
                  >
                    <strong className="font-bold">No Feedback Yet</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
