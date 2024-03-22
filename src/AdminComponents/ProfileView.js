import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function ProfileView() {
  const [data, setdata] = useState([]);

  const [editPatient, setEditPatient] = useState(false);
  const [errorsMessage, seterrorsMessage] = useState();

  const [updatename, setUpdatename] = useState("");
  const [updatepassowrd, setUpdatepassword] = useState("");
  const [updateNewpassowrd, setUpdateNewpassword] = useState("");

  const handleSubmitt = (event) => {
    console.log("inside handle submit function");
    event.preventDefault();
    // Call the function to send the data to the backend

    editPat();
  };

  const editPat = () => {
    axios
      .patch("http://localhost:8080/admin/updateProfile", {
        name: updatename,
        oldpassword: updatepassowrd,
        newPass: updateNewpassowrd,
      })
      .then(function (response) {
        console.log(response);
        if (response.data) {
          // Check if response.data exists
          setEditPatient(true);
          setUpdatename("");
          setUpdatepassword("");
          setUpdateNewpassword("");
          setTimeout(() => {
            setEditPatient(false);
          }, 3000);
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.error);
        seterrorsMessage(error.response.data.error);
        setTimeout(() => {
          seterrorsMessage("");
        }, 5000);
      });
  };

  const fecthProfileData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/profile/NephrolAI@gmail.com"
      );
      setdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fecthProfileData();
  }, [fecthProfileData]);

  return (
    <>
      <nav className="w-full bg-gray-800">
        <Header />
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto  ">
          <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

          <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
            <div className="modal-content px-6 py-4 text-left">
              {/* Modal header */}
              <div className="flex items-center justify-between pb-3">
                <p className="ml-80 text-2xl font-bold">Edit Profile</p>
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

              {errorsMessage && (
                <>
                  <div
                    className=" relative ml-72 mt-5 w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                    role="alert"
                  >
                    <strong className="font-bold">{errorsMessage}</strong>
                  </div>
                </>
              )}

              {editPatient && (
                <>
                  <div
                    className="ml-72  w-64 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                    role="alert"
                  >
                    <strong className="font-bold">
                      Profile Updated Successfully
                    </strong>
                  </div>
                </>
              )}

              {/* Modal body */}

              <form onSubmit={handleSubmitt}>
                <div className="mb-4">
                  <div className="flex">
                    <div>
                      <label
                        htmlFor="input-group-1"
                        className="mb-2 ml-24 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Email
                      </label>
                      <div className="relative mb-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <svg
                            className="ml-24 h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 16"
                          >
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          value="NephrolAI@gmail.com"
                          required
                          readOnly
                          className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="website-admin"
                        className="mb-2 ml-16 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Name
                      </label>
                      <div className="relative mb-6">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <svg
                            className="ml-16 h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={updatename}
                          required
                          onChange={(e) => {
                            setUpdatename(e.target.value);
                          }}
                          className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="password"
                          className="mb-2 ml-24 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter Old Password
                        </label>
                        <div className="relative mb-6">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="ml-24 h-24 w-6 text-gray-500 dark:text-gray-400"
                            >
                              <path d="M3.5 11.5a3.5 3.5 0 113.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 01-3.163 2zM2.5 9a1 1 0 100-2 1 1 0 000 2z" />
                            </svg>
                          </div>
                          <input
                            type="password"
                            value={updatepassowrd}
                            required
                            onChange={(e) => {
                              setUpdatepassword(e.target.value);
                            }}
                            className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="•••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="password"
                          className="mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter New Password
                        </label>
                        <div className="relative mb-6">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                            <svg
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="ml-16 h-24 w-6 text-gray-500 dark:text-gray-400"
                            >
                              <path d="M3.5 11.5a3.5 3.5 0 113.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 01-3.163 2zM2.5 9a1 1 0 100-2 1 1 0 000 2z" />
                            </svg>
                          </div>
                          <input
                            type="password"
                            value={updateNewpassowrd}
                            required
                            onChange={(e) => {
                              setUpdateNewpassword(e.target.value);
                            }}
                            className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="•••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end ">
                  <button
                    className="mb-2 mr-28 flex rounded bg-slate-700 px-4  py-2 font-bold text-white hover:bg-slate-900"
                    type="submit"
                  >
                    Confirm
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
              </form>
            </div>
          </div>
        </div>
      )}

      <div class="flex h-screen w-full  items-center justify-center bg-gray-200 font-sans ">
        <div class="card mx-auto mb-60 w-96  bg-white shadow-xl hover:shadow ">
          <img
            class="mx-auto  w-32 rounded-full border-8 border-white"
            src={require("../../src/images/AdminPNG.png")}
          />
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="ml-32 h-6 w-6"
              x-tooltip="tooltip"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <a onClick={handleModalOpen} className="cursor-pointer ">
              {" "}
              Edit Profile
            </a>
          </div>
          <div class="mt-2 text-center text-3xl font-medium">{data.name}</div>
          <div class="text-center text-lg font-normal">{data.email}</div>

          <div class="mt-2 px-6 text-center text-sm font-light"></div>
        </div>
      </div>
    </>
  );
}
