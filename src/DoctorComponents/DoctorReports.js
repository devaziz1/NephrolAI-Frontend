import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";
import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

export default function DoctorReports() {
  const { userEmail } = useContext(UserContext);

  const [pdfReports, setPdfReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fecthAllPdfReports = useCallback(async () => {
    axios
      .get(`http://localhost:8080/doctor/getreports/${userEmail}`)
      .then((response) => {
        setPdfReports(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userEmail]);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthAllPdfReports(); // Call the function here after it's defined
  }, [fecthAllPdfReports]);

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


  return (
    <div>
      <>
        <div>
          {isLoading ? (
            <div className="lottie-container">
              <Lottie animationData={Loader} />
            </div>
          ) : (
            <div>
              <h2 className="mb-4 ml-80 mt-10 text-2xl font-bold dark:text-white">
                Patient Reports
              </h2>

              {pdfReports.length > 0 ? (
                <div class="relative ml-10 mr-16  overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="p-4">
                          <div class="flex items-center">S/N</div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Patient's Email
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
                            {report.patientEmail}
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
    </div>
  );
}
