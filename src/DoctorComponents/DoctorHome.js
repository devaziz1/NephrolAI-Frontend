import React, { useEffect } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function DoctorHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("dAppointments");
  }, []);

  const activeClass =
    "mt-5 bg-active flex rounded-lg border-l-2 border-l-slate-200 ";
  const inActiveClass = "";

  
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

            <li>
              <NavLink
                to="dAppointments"
                className={(navDate) => {
                  return navDate.isActive ? activeClass : inActiveClass;
                }}
              >
                <div
                  href="#"
                  className="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary"
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
                  <span className="ml-3">My Appointment</span>
                </div>
              </NavLink>
            </li>

            <NavLink
              to="dSchedule"
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
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M928 224H768v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H548v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H328v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56H96c-17.7 0-32 14.3-32 32v576c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V256c0-17.7-14.3-32-32-32zm-40 568H136V296h120v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h148v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56h120v496zM416 496H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 136H232c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm308.2-177.4L620.6 598.3l-52.8-73.1c-3-4.2-7.8-6.6-12.9-6.6H500c-6.5 0-10.3 7.4-6.5 12.7l114.1 158.2a15.9 15.9 0 0025.8 0l165-228.7c3.8-5.3 0-12.7-6.5-12.7H737c-5-.1-9.8 2.4-12.8 6.5z" />
                  </svg>
                  <span class="ml-3">My Schedule</span>
                </div>
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
                  <span class="ml-3">Reports</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="dVC"
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
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6.455 19L2 22.5V4a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z" />
                  </svg>
                  <span class="ml-3">Feedbacks</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="dPS"
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
              to="dComplaint"
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
                    <path d="M5 2c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5zm14 14h-4.414L12 18.586 9.414 16H5V4h14v12z" />
                    <path d="M11 6h2v6h-2zm0 7h2v2h-2z" />
                  </svg>
                  <span class="ml-3">Complaints</span>
                </a>
              </li>
            </NavLink>

            <NavLink
              to="dProfile"
              className={(navDate) => {
                return navDate.isActive ? activeClass : inActiveClass;
              }}
            >
              <li>
                <a
                  href="#"
                  class="group mt-5 flex items-center rounded-lg p-2 text-ofWhite hover:bg-secondary dark:text-white dark:hover:bg-secondary  "
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
              to="/dLogin"
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
