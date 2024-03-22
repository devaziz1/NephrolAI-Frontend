import React, { useState, useContext } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import DoctorView from "./DoctorView";
import ComplaintView from "./ComplaintView";
import PatientView from "./PatientView";
import UploadCTView from "./UploadCTView";
import ProfileView from "./ProfileView";
import AddDoctorView from "./AddDoctorView";
import AddPatient from "./AddPatientView";
// import Token from "./Components/Token";
import LoginPage from "./LoginPage";
import Analytics from "./Analytics";

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handlelogout = () => {
    localStorage.removeItem("token");
    setToken(" ");
  };

  const activeClass =
    " w-full px-2 ml-1 p-0.5 flex border-l-2 bg-lightBlack dark:text-white border-l-slate-200 items-center gap-x-1.5 group select-none text-white mt-1";
  const inActiveClass =
    "w-full px-2 ml-2 flex p-0.5  border-l-slate-200 items-center gap-x-1.5 group select-none mt-1 hover:bg-lightBlack dark:text-white";

  return (
    <div>
      <div className="flex w-full">
        <aside className="fixed flex  h-screen min-h-full w-56 flex-col items-center space-y-7 bg-[#1c212c] pb-2 pt-5">
          <div className="flex  w-full flex-col gap-y-1 fill-gray-500 pr-3 text-sm text-gray-500">
            <div className="font-QuicksandMedium mt-5 pl-4 text-2xl  uppercase text-gray-400/60">
              DASHBOARD
            </div>

            <NavLink
              to="/adminboard/"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                height="1em"
                width="1em"
              >
                <path
                  fillRule="evenodd"
                  d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4.9l-3.613 4.417a.5.5 0 01-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 01-.808-.588l4-5.5a.5.5 0 01.758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 01-.5-.5z"
                />
              </svg>

              <span className="font-QuicksandMedium text-xl">Analytics</span>
            </NavLink>

            <NavLink
              to="/adminboard/doctor"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 448 512"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-96 55.2C54 332.9 0 401.3 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1c-6-.6-12.1-.9-18.3-.9h-91.4c-6.2 0-12.3.3-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7v-59.1zM144 448c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">Doctors</span>
            </NavLink>

            <NavLink
              to="/adminboard/addDoc"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
              >
                <path d="M106 304v-54h54v-36h-54v-54H70v54H16v36h54v54h36z" />
                <path d="M400 144 A112 112 0 0 1 288 256 A112 112 0 0 1 176 144 A112 112 0 0 1 400 144 z" />
                <path d="M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">Add Doctors</span>
            </NavLink>
            <NavLink
              to="/adminboard/patient"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 576 512"
                fill="currentColor"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
              >
                <path d="M48 0C21.5 0 0 21.5 0 48v208h144c8.8 0 16 7.2 16 16s-7.2 16-16 16H0v64h144c8.8 0 16 7.2 16 16s-7.2 16-16 16H0v80c0 26.5 21.5 48 48 48h217.9c-6.3-10.2-9.9-22.2-9.9-35.1 0-46.9 25.8-87.8 64-109.2V48c0-26.5-21.5-48-48-48H48zm104 64h16c8.8 0 16 7.2 16 16v24h24c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-24v24c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-24h-24c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h24V80c0-8.8 7.2-16 16-16zm360 208c0-44.2-35.8-80-80-80s-80 35.8-80 80 35.8 80 80 80 80-35.8 80-80zM288 477.1c0 19.3 15.6 34.9 34.9 34.9h218.2c19.3 0 34.9-15.6 34.9-34.9 0-51.4-41.7-93.1-93.1-93.1H381.1c-51.4 0-93.1 41.7-93.1 93.1z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">Patients</span>
            </NavLink>
            <NavLink
              to="/adminboard/addPatient"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
              >
                <path d="M106 304v-54h54v-36h-54v-54H70v54H16v36h54v54h36z" />
                <path d="M400 144 A112 112 0 0 1 288 256 A112 112 0 0 1 176 144 A112 112 0 0 1 400 144 z" />
                <path d="M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128z" />
              </svg>

              <span className="font-QuicksandMedium text-xl">Add Patients</span>
            </NavLink>

            <NavLink
              to="/adminboard/uploadct"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
              >
                <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352h128c0 35.3 28.7 64 64 64s64-28.7 64-64h128c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v-32c0-35.3 28.7-64 64-64zm368 104c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">
                Upload CT Scan
              </span>
            </NavLink>

            <NavLink
              to="/adminboard/complain"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
              >
                <path d="M18 8l-8 5-8-5V6l8 5 8-5m0-2H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m6 3h-2v6h2V7m0 8h-2v2h2v-2z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">Complaints</span>
            </NavLink>
            <div className="font-QuicksandMedium mt-3 pl-4 text-xl  uppercase text-gray-400/60">
              Profile
            </div>
            <NavLink
              to="/adminboard/profile"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                className="h-5 w-5 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
              >
                <path
                  className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                  clipRule="evenodd"
                />
                <path
                  className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-QuicksandMedium text-lg">Profile</span>
            </NavLink>

            <NavLink
              to="/login"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <svg
                className="h-5 w-5 !fill-blue-500 transition-colors duration-200  group-hover:fill-blue-600 dark:fill-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                onClick={handlelogout}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 011-1h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" />
              </svg>
              <span className="font-QuicksandMedium text-xl">Logout</span>
            </NavLink>
          </div>
        </aside>
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Analytics />} />
            <Route path="/doctor" element={<DoctorView />} />
            <Route path="/patient" element={<PatientView />} />
            <Route path="/uploadct" element={<UploadCTView />} />
            <Route path="/complain" element={<ComplaintView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/addDoc" element={<AddDoctorView />} />
            <Route path="addPatient" element={<AddPatient />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
