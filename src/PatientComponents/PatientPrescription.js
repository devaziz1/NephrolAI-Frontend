import React, { useCallback, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

export default function PatientPrescription() {
  const [prescribtions, setPrescriptions] = useState([]);
  const { patientEmail } = useContext(UserContext);

  const [selectedPrescription, setSelectedPresction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 400]);

    // Content text
    const yOffset = 300; // Vertical offset for text blocks
    const lineHeight = 28; // Line height for each text block

    // Add background watermark
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const watermarkText = "NephrolAI ";
    const textWidth = font.widthOfTextAtSize(watermarkText, 60);
    const textHeight = 60;
    page.drawText(watermarkText, {
      x: (350 - textWidth) / 2, // Centered horizontally
      y: (750 - textHeight) / 2, // Centered vertically
      size: 50,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
      opacity: 0.2, // Adjust opacity as needed
    });

    page.drawText(watermarkText, {
      x: (350 - textWidth) / 2, // Centered horizontally
      y: (600 - textHeight) / 2, // Centered vertically
      size: 50,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
      opacity: 0.2, // Adjust opacity as needed
    });

    page.drawText(watermarkText, {
      x: (350 - textWidth) / 2, // Centered horizontally
      y: (450 - textHeight) / 2, // Centered vertically
      size: 50,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
      opacity: 0.2, // Adjust opacity as needed
    });

    page.drawText(watermarkText, {
      x: (350 - textWidth) / 2, // Centered horizontally
      y: (300 - textHeight) / 2, // Centered vertically
      size: 50,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
      opacity: 0.2, // Adjust opacity as needed
    });

    page.drawText(watermarkText, {
      x: (350 - textWidth) / 2, // Centered horizontally
      y: (150 - textHeight) / 2, // Centered vertically
      size: 50,
      font: font,
      color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
      opacity: 0.2, // Adjust opacity as needed
    });

    page.drawText("NephrolAI", {
      x: 50,
      y: 450, // Adjust the y-coordinate for vertical positioning
      size: 24, // Increase the font size
      color: rgb(0, 0, 0),
    });

    page.drawText(`Medicine Name: ${selectedPrescription.medicineName}`, {
      x: 50,
      y: yOffset,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Dosage: ${selectedPrescription.dosage}`, {
      x: 50,
      y: yOffset - lineHeight,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Start Date: ${formatDate(selectedPrescription.startDate)}`, {
      x: 50,
      y: yOffset - 2 * lineHeight,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText(`End Date: ${formatDate(selectedPrescription.endDate)}`, {
      x: 50,
      y: yOffset - 3 * lineHeight,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Instructions: ${selectedPrescription.description}`, {
      x: 50,
      y: yOffset - 4 * lineHeight,
      size: 16,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Create a Blob from the PDF data and trigger a download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Prescription_Details.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedPresc = useCallback(async (id) => {
    console.log("Inside selected Precsription");
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/getPrescriptionsById/${id}`
      );
      console.log(response.data);
      setSelectedPresction(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const fecthPatientPrescriptions = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/patient/getPrescriptions/${patientEmail}`
      );

      console.log(response.data);
      setPrescriptions(response.data);
      console.log("Timess");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deletePresc = useCallback(async (id) => {
    console.log("Inside delete complaint");
    try {
      const response = await axios.delete(
        `http://localhost:8080/patient/deletePrescription/${id}`
      );
      console.log(response);
      fecthPatientPrescriptions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    fecthPatientPrescriptions(); // Call the function here after it's defined
  }, [fecthPatientPrescriptions]);

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
              <h2 className=" mx-80 mb-3 mt-6 text-3xl font-bold dark:text-white">
                My Prescriptions
              </h2>
            </div>

            {prescribtions.length > 0 ? (
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

                      <th scope="col" class="px-4 py-3">
                        Created AT
                      </th>

                      <th scope="col" class="px-4 py-3">
                        Details
                      </th>

                      <th scope="col" class="px-6 py-3">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescribtions.map((data, index) => (
                      <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <td class="px-6 py-4"> {index + 1}</td>
                        <th
                          scope="row"
                          class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {data.doctorEmail}
                        </th>

                        <td class="px-6 py-4">{formatDate(data.createdAt)}</td>
                        <td class="px-6 py-4">
                          <svg
                            onClick={() => {
                              selectedPresc(data._id);
                              handleModalOpen(true);
                            }}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="h-6 w-6 cursor-pointer"
                          >
                            <path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
                          </svg>
                        </td>

                        {isOpen && (
                          <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto">
                            <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

                            <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
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
                                    src={require("../images/prescriptionDetails.png")}
                                    className="mx-auto h-28 w-32  text-3xl "
                                    alt="Logo"
                                  />
                                </div>

                                <div>
                                  <h2 className="mb-4 mt-5 text-center text-2xl font-black text-gray-900 dark:text-white ">
                                    Prescription Details:
                                  </h2>
                                  <div className="flex">
                                    <h4 className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                                      Medicine Name:
                                    </h4>
                                    <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                      {selectedPrescription.medicineName}
                                    </h4>
                                  </div>

                                  <div className="flex">
                                    <h4 className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                                      Dosage:
                                    </h4>
                                    <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                      {selectedPrescription.dosage}
                                    </h4>
                                  </div>

                                  <div className="flex">
                                    <h4 className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                                      Start Date:
                                    </h4>
                                    <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                      {formatDate(
                                        selectedPrescription.startDate
                                      )}
                                    </h4>
                                  </div>

                                  <div className="flex">
                                    <h4 className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                                      End Date:
                                    </h4>
                                    <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                      {formatDate(selectedPrescription.endDate)}
                                    </h4>
                                  </div>

                                  <div className="flex">
                                    <h4 className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                                      Instructions:
                                    </h4>
                                    <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                                      {selectedPrescription.description}
                                    </h4>
                                  </div>
                                </div>
                                <button
                                  className="ml-36 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                                  onClick={generatePDF}
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
                              </div>
                            </div>
                          </div>
                        )}

                        <td class="flex items-center space-x-3 px-6 py-4">
                          <button onClick={() => deletePresc(data._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="red"
                              className="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
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
                <strong className="font-bold">No Prescription Yet</strong>
              </div>
            )}

            <style>
              {`
          .flex {
            display: flex;
          }
          .justify-center {
            justify-content: center;
          }
          .items-center {
            align-items: center;
          }
          .h-screen {
            height: 100vh;
          }
          .bg-blue-500 {
            background-color: #3490dc;
          }
          .text-white {
            color: #fff;
          }
          .font-semibold {
            font-weight: 600;
          }
          .py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .rounded {
            border-radius: 0.25rem;
          }
          .hover\:bg-blue-600:hover {
            background-color: #2779bd;
          }
          .transition {
            transition-property: background-color;
          }
          .duration-300 {
            transition-duration: 0.3s;
          }
          .ease-in-out {
            transition-timing-function: ease-in-out;
          }
        `}
            </style>
          </div>
        )}
      </div>
    </>
  );
}
