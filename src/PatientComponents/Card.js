import React from "react";

import { useNavigate } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex bg-gray-100 p-8">
        <div
          class="ml-5 max-w-sm cursor-pointer rounded-lg border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className="ml-32 h-16 w-16 "
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M17 12a5 5 0 10-5 5M12 7V3m-1 0h2M15.536 8.464l2.828-2.828m-.707-.707l1.414 1.414M17 12h4m0-1v2M12 17v4m1 0h-2M8.464 15.536l-2.828 2.828m.707.707L4.93 17.657M7 12H3m0 1v-2M8.464 8.464L5.636 5.636m-.707.707L6.343 4.93" />
            <path d="M20 17.5 A2.5 2.5 0 0 1 17.5 20 A2.5 2.5 0 0 1 15 17.5 A2.5 2.5 0 0 1 20 17.5 z" />
            <path d="M19.5 19.5L22 22" />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Kidney Diseases Detection
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Empowering early kidney cyst, tumor & stone detection through CT
            Scan Images
          </p>
        </div>

        <div
          class="ml-6 max-w-sm cursor-pointer  rounded-lg border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg fill="none" viewBox="0 0 15 15" className="ml-32 h-16 w-16">
            <path
              stroke="currentColor"
              d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
            />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Appointments
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Experience seamless and hassle-free appointment booking with your
            doctor
          </p>
        </div>

        <div
          class="ml-6 max-w-sm rounded-lg cursor-pointer  border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            className="ml-32 h-16 w-16"
          >
            <path d="M8 9.05a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path d="M2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 01-1-1V4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1h-1.202z" />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Online Consultation
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Easily connect with your doctor with our secure online video
            consultations feature
          </p>
        </div>
      </div>

      <div className="flex bg-gray-100 p-8">
        <div
          class="ml-5 max-w-sm rounded-lg cursor-pointer  border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            className="ml-32 h-16 w-16"
          >
            <path
              fillRule="evenodd"
              d="M5.5 6a.5.5 0 00-.5.5v4a.5.5 0 001 0V9h.293l2 2-1.147 1.146a.5.5 0 00.708.708L9 11.707l1.146 1.147a.5.5 0 00.708-.708L9.707 11l1.147-1.146a.5.5 0 00-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 007.5 6h-2zM6 7v1h1.5a.5.5 0 000-1H6z"
            />
            <path
              fillRule="evenodd"
              d="M2 1a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1v10.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 14.5V4a1 1 0 01-1-1V1zm2 3h8v10.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5V4zM3 3V1h10v2H3z"
            />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Doctors' Prescription
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Empowering early kidney cyst, tumor & stone detection through CT
            Scan Images
          </p>
        </div>

        <div
          class="ml-6 max-w-sm rounded-lg cursor-pointer  border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ml-32 h-16 w-16"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M11 2l7.298 2.28a1 1 0 01.702.955V7h2a1 1 0 011 1v2H9V8a1 1 0 011-1h7V5.97l-6-1.876L5 5.97v7.404a4 4 0 001.558 3.169l.189.136L11 19.58 14.782 17H10a1 1 0 01-1-1v-4h13v4a1 1 0 01-1 1l-3.22.001c-.387.51-.857.96-1.4 1.33L11 22l-5.38-3.668A6 6 0 013 13.374V5.235a1 1 0 01.702-.954L11 2z" />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Online Payments
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Experience seamless and hassle-free appointment booking with your
            doctor
          </p>
        </div>

        <div
          class="ml-6 max-w-sm rounded-lg cursor-pointer  border border-primary bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
          onClick={() => {
            navigate("/pLogin");
          }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            className="ml-32 h-16 w-16"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
            <path d="M10 14h4M12 12v4" />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ">
              Doctors' Feedback
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Easily connect with your doctor with our secure online video
            consultations feature
          </p>
        </div>
      </div>
    </>
  );
}
