import React, { useState,useContext,useCallback } from "react";
import axios from "axios";


import Lottie from "lottie-react";
import { UserContext } from "../Hooks/AuthContext";

import "../animation.css";
import Loader from "../Loader.json";
import { jsPDF } from "jspdf";
import logo from "../images/Blogo.png";


export default function UploadCT() {
  const { patientEmail } = useContext(UserContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [errorsMessage, seterrorsMessage] = useState("");
  const [predictedPercentage, setPredictedPercentage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [otherClassPercentages, setOtherClassPercentages] = useState({});

  const [Profile, setProfile] = useState([]);

  const generatePDF = () => {
    console.log("Inside genertae PDF fucntion");
    console.log(otherClassPercentages);
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font size and style for headings
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold"); // Set the font style here

    doc.addImage(logo, "PNG", 70, 5, 70, 15); // Adjust the coordinates and dimensions

    const lineY = 25; // Adjust the y-coordinate to be just under the image
    doc.line(5, lineY, doc.internal.pageSize.width - 15, lineY);

    // Add heading in the center just under the line
    const headingText = "Patient Information";
    const headingWidth =
      (doc.getStringUnitWidth(headingText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const headingX = (doc.internal.pageSize.width - headingWidth) / 2;
    const headingY = lineY + 10; // Adjust the vertical position as needed
    doc.text(headingText, headingX, headingY);

    // Change the font style for additional text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Add additional text under the heading in plain style
    const nameText = `Name: ${Profile.name}`;
    const emailText = `Email: ${Profile.email}`;
    const gender = `Gender: ${Profile.gender}`;
    const phoneNo = `Phone Number: ${Profile.phoneNumber}`;
    const history = `History: ${Profile.medical_history}`;

    const textY = headingY + 10; // Adjust the vertical position for additional text

    // Add "Name" and "Email" on the same line with increased spacing
    doc.text(`${nameText}`, 40, textY);

    const textYY = headingY + 20;

    doc.text(`${emailText}`, 40, textYY); // Adjust the spacing as needed

    const textYYY = headingY + 30;

    // Add "Gender" and "Phone Number" on the same line with increased spacing
    doc.text(`${gender}`, 40, textYYY);

    const textYYYY = headingY + 40;

    doc.text(`${phoneNo}`, 40, textYYYY); // Adjust the spacing as needed

    const textYYYYY = headingY + 50;
    doc.text(history, 40, textYYYYY);

    const lineYY = textYYYYY + 10; // Adjust the y-coordinate to be just under the image
    doc.line(5, lineYY, doc.internal.pageSize.width - 15, lineYY);

    // Set font size and style for headings
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold"); // Set the font style here
    // Add heading in the center just under the line
    const headingTextt = "Report Details";
    const headingWidthh = (doc.getStringUnitWidth(headingTextt) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const headingXx = (doc.internal.pageSize.width - headingWidthh) / 2;
    const headingYy = lineYY + 10; // Adjust the vertical position as needed
    doc.text(headingTextt, headingXx, headingYy);

    // Change the font style for additional text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    const diseasenameY = headingYy + 10; // Adjust the vertical position for additional text

    const name = `Disease Name: Kidney ${prediction}`;
    const diseasePredictionP = `Disease Percentage: ${predictedPercentage}%`;
    // Iterate over otherClassPercentages object and add key-value pairs to the PDF
    const properties = Object.keys(otherClassPercentages);
    let yPos = headingYy + 30; // Initial vertical position

    properties.forEach((property) => {
      const text = `Kidney ${property}: ${otherClassPercentages[property].toFixed(2)}%`;
      doc.text(text, 40, yPos);
      yPos += 10; // Increase the vertical position for the next line
    });

    const diseasePredictionPY = diseasenameY + 10;

    doc.text(`${name}`, 40, diseasenameY);
    doc.text(`${diseasePredictionP}`, 40, diseasePredictionPY);

    



    

    // Save the PDF
    doc.save(`${Profile.name} NephrolAI Report.pdf`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && isJpgFile(file)) {
      setSelectedFile(file);
    } else {
      seterrorsMessage("Please select .jpg Image Only");

      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }

    setPrediction(null);
    setPredictedPercentage(null);
    
  };

  //Modal states
  const [isOpen, setIsOpen] = useState(false);
  const handleModalClose = () => {
    setIsOpen(false);
  };

  
  const searchPatient = useCallback(async () => {
    try {
      console.log("Inside patient email");
      const response = await axios.get(
        `http://localhost:8080/patient/getProfile/${patientEmail}`
      );

      console.log(response.data);
     setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [patientEmail]);

  const isJpgFile = (file) => {
    const allowedExtensions = ["jpg", "jpeg"];
    const fileNameParts = file.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  const handlePredict = async () => {
    if (!patientEmail) {
      alert("Please enter patient email.");
      return;
    }
    if (!selectedFile) {
      alert("Please upload an image.");
      return;
    }

    setIsLoading(true);

    console.log("Patient email upload " + patientEmail);

    await searchPatient();

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { predicted_class, predicted_percentage, other_classes } =
        response.data;

      setPrediction(predicted_class);
      setPredictedPercentage(predicted_percentage.toFixed(2));
      setOtherClassPercentages(other_classes);
    } catch (error) {
      console.error("Error predicting:", error);
    } finally {
      setIsLoading(false); // Stop the loader animation
      setTimeout(() => {}, 2000);
      setIsOpen(true);
    }
  };

 

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
              <div>
                <div className="mt-8 flex space-x-20 ">
                  <h2 className=" mx-80 text-3xl font-bold dark:text-white">
                    Upload CT Scan
                  </h2>
                </div>

                {errorsMessage && (
                  <>
                    <div
                      className="relative ml-80 mt-5 w-60 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                      role="alert"
                    >
                      <strong className="font-bold">{errorsMessage}</strong>

                      <span className="absolute bottom-0 right-0 top-0 px-4 py-3"></span>
                    </div>
                  </>
                )}

                <div>
                  <h2 className="ml-79 mt-5 text-2xl font-bold dark:text-white">
                    Instruction For Uploading
                  </h2>
                  <ul className="mt-6 list-decimal">
                    <li className="ml-80 text-base">
                      The File Formate Must Be .jpg
                    </li>
                    <li className="ml-80 text-base">
                      Please Upload CT Scan Image Of Kideny Only
                    </li>
                    <li className="ml-80 text-base">
                      For Good Results Uplaod High Quality Image
                    </li>
                  </ul>
                </div>

                <div class="bg-grey-lighter ml-72 mt-10 flex">
                  <label class="hover: flex w-80 cursor-pointer flex-col items-center rounded-lg border border-primary bg-white px-4 py-6 uppercase tracking-wide text-primary shadow-lg">
                    <svg
                      class="h-8 w-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">
                      {selectedFile ? selectedFile.name : "Select Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg"
                      className="hidden"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  onClick={handlePredict}
                  className=" focus:ring-parimary ml-96 mt-5 rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium  text-white hover:bg-primary focus:outline-none focus:ring-4 dark:bg-button dark:hover:bg-primary dark:focus:ring-button sm:w-auto lg:w-32"
                >
                  Predict
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto ">
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
                    src={require("../images/Report.png")}
                    className="mx-auto h-28 w-32  text-3xl "
                    alt="Logo"
                  />
                </div>
              </div>
              {prediction !== "" && (
                <div className="ml-8 flex">
                  <p className="mb-2 mt-5 text-lg font-black text-gray-900 dark:text-white">
                    Prediction:
                  </p>
                  <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                    {prediction}
                  </h4>
                </div>
              )}
              {predictedPercentage !== "" && (
                <div className="ml-8 flex">
                  <p className="mb-4 mt-5 text-lg font-black text-gray-900 dark:text-white">
                    Predicted Percentage:
                  </p>
                  <h4 className="ml-4 mt-1 text-lg font-medium text-gray-900 dark:text-white">
                    {predictedPercentage}%
                  </h4>
                </div>
              )}

              <button
                className="mb-6 ml-24 mr-28 mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                onClick={generatePDF}
              >
                Download Report
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
        )}
      </div>
    </>
  );
}
