import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function PatientHome() {
  const navigate = useNavigate();
  const activeClass =
    " bg-active flex rounded-lg border-l-2 border-l-slate-200 ";
  const inActiveClass = "";
  useEffect(() => {
    navigate("BA");
  }, []);
  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class=" h-full overflow-y-auto bg-primary px-3 py-4 dark:bg-gray-800 ">
          <ul class="mt-5 space-y-2 font-medium">
            <li>
              <img
                src={require("../../src/images/Blogo.png")}
                className="mx-4 my-5 w-40"
                alt="Logo"
              />
            </li>

            <NavLink
              to="BA"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <div
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-96 55.2C54 332.9 0 401.3 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1c-6-.6-12.1-.9-18.3-.9h-91.4c-6.2 0-12.3.3-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7v-59.1zM144 448c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" />
                  </svg>
                  <span class="ml-3">Available Doctors</span>
                </div>
              </li>
            </NavLink>

            <li>
              <NavLink
                to="Appiontment"
                className={(navDate) => {
                  return navDate.isActive ? activeClass : inActiveClass;
                }}
              >
                <div
                  href="#"
                  className="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 15 15"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path
                      stroke="currentColor"
                      d="M3.5 0v5m8-5v5M3 7.5h3m6 0H9m-6 3h3m3 0h3m-10.5-8h12a1 1 0 011 1v10a1 1 0 01-1 1h-12a1 1 0 01-1-1v-10a1 1 0 011-1z"
                    />
                  </svg>
                  <span className="ml-3"> Appointment</span>
                </div>
              </NavLink>
            </li>

            <NavLink
              to="UCT"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352h128c0 35.3 28.7 64 64 64s64-28.7 64-64h128c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64v-32c0-35.3 28.7-64 64-64zm368 104c13.3 0 24-10.7 24-24s-10.7-24-24-24-24 10.7-24 24 10.7 24 24 24z" />
                  </svg>
                  <span class="ml-3">Upload CT Scan</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="VC"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                    <path d="M5 6 H13 A2 2 0 0 1 15 8 V16 A2 2 0 0 1 13 18 H5 A2 2 0 0 1 3 16 V8 A2 2 0 0 1 5 6 z" />
                  </svg>
                  <span class="ml-3">Video Call</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="MR"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-1 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className=" w-7"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <path d="M11 3 H13 A2 2 0 0 1 15 5 V5 A2 2 0 0 1 13 7 H11 A2 2 0 0 1 9 5 V5 A2 2 0 0 1 11 3 z" />
                    <path d="M10 14h4M12 12v4" />
                  </svg>
                  <span class="ml-3"> Reports</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="FB"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-1 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className=" w-7">
                    <path d="M19 8h-1V5a3 3 0 00-3-3H5a3 3 0 00-3 3v12a1 1 0 00.62.92A.84.84 0 003 18a1 1 0 00.71-.29l2.81-2.82H8v1.44a3 3 0 003 3h6.92l2.37 2.38A1 1 0 0021 22a.84.84 0 00.38-.08A1 1 0 0022 21V11a3 3 0 00-3-3zM8 11v1.89H6.11a1 1 0 00-.71.29L4 14.59V5a1 1 0 011-1h10a1 1 0 011 1v3h-5a3 3 0 00-3 3zm12 7.59l-1-1a1 1 0 00-.71-.3H11a1 1 0 01-1-1V11a1 1 0 011-1h8a1 1 0 011 1z" />
                  </svg>

                  <span class="ml-3">Feedbacks</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="PS"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1.5em"
                    width="1.5em"
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
                  <span class="ml-3">Prescriptions</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="SComplaint"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-1 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className=" w-7">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6.455 19L2 22.5V4a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z" />
                  </svg>
                  <span class="ml-3">Complaint</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="pProfile"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-1 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
                >
                  <svg fill="none" viewBox="0 0 24 24" className="w-7">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span class="ml-3">Profile</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="/pLogin"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 100-12H4a9.985 9.985 0 018-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 01-8-4z" />
                  </svg>
                  <span class="ml-3">Logout</span>
                </a>
              </li>
            </NavLink>
          </ul>
        </div>
      </aside>
      <div className="ml-79">
        <Outlet />
      </div>
    </>
  );
}
