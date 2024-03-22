import React, { useCallback, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { UserContext } from "../Hooks/AuthContext";

import Lottie from "lottie-react";
import "../animation.css";
import Loader from "../Loader.json";

export default function DoctorProfile() {
  const [Profile, setProfile] = useState([]);
  const { userEmail } = useContext(UserContext);
  //update Patient
  const [editPatient, setEditPatient] = useState(false);
  const [errorsMessage, seterrorsMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [updateEmail, setUpdateEmail] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [updatepassowrd, setUpdatepassword] = useState("");
  const [updateNewpassowrd, setUpdateNewpassword] = useState("");

  const [updatephoneNo, setUpdatephoneNo] = useState("");
  const [updategender, setUpdategender] = useState("");
  const [updateMH, setUpdateMH] = useState("");

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = (email) => {
    setIsOpen(true);
    setUpdateEmail(email);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleSubmitt = (event) => {
    console.log("inside handle submit function");
    event.preventDefault();
    // Call the function to send the data to the backend

    editPat();
  };

  const editPat = () => {
    axios
      .patch("http://localhost:8080/doctor/updatePorfile", {
        name: updatename,
        oldpassword: updatepassowrd,
        newPass: updateNewpassowrd,
        email: userEmail,
        phoneNumber: updatephoneNo,
        gender: updategender,
        LN: updateMH,
      })
      .then(function (response) {
        console.log(response);
        if (response.data) {
          // Check if response.data exists
          setEditPatient(true);
          setUpdatename("");
          setUpdatepassword("");
          setUpdateNewpassword("");
          setUpdategender("");
          setUpdatephoneNo("");
          setUpdateMH("");
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

  const searchDoctor = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctor/getProfile/${userEmail}`
      );

      console.log(response.data);
      setProfile(response.data);
    } catch (error) {
      seterrorsMessage(error.response.data.mesg);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  }, []);

  useEffect(() => {
    // Simulate a 2-second loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    searchDoctor(); // Call the function here after it's defined
  }, [searchDoctor]);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="lottie-container">
            <Lottie animationData={Loader} />
          </div>
        ) : (
          <div>
            <div className="mt-10">
              <div className="flex">
                {isOpen && (
                  <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto  ">
                    <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

                    <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
                      <div className="modal-content px-6 py-4 text-left">
                        {/* Modal header */}
                        <div className="flex items-center justify-between pb-3">
                          <p className="ml-80 text-2xl font-bold">
                            Edit Profile
                          </p>
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
                              <strong className="font-bold">
                                {errorsMessage}
                              </strong>
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
                                    value={userEmail}
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

                            <div className="mb-5 flex">
                              <div>
                                <div className="">
                                  <label
                                    htmlFor="password"
                                    className="mb-2 ml-24 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Enter Phone Number
                                  </label>
                                  <div className="relative ">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                      <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="ml-24 h-20 w-5 text-gray-500 dark:text-gray-400"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M1.885.511a1.745 1.745 0 012.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 00.178.643l2.457 2.457a.678.678 0 00.644.178l2.189-.547a1.745 1.745 0 011.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 01-7.01-4.42 18.634 18.634 0 01-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 01.5.5V3h1.5a.5.5 0 010 1H13v1.5a.5.5 0 01-1 0V4h-1.5a.5.5 0 010-1H12V1.5a.5.5 0 01.5-.5z"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      type="text"
                                      value={updatephoneNo}
                                      required
                                      onChange={(e) => {
                                        setUpdatephoneNo(e.target.value);
                                      }}
                                      className="ml-24 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                      placeholder="•••••••••"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <div className="">
                                    <label
                                      htmlFor="password"
                                      className=" mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Enter Medical License No.
                                    </label>
                                    
                                    <input
                                      type="text"
                                      value={updateMH}
                                      required
                                      onChange={(e) => {
                                        setUpdateMH(e.target.value);
                                      }}
                                      className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                      placeholder="Enter License No."
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div>
                                <div className="mb-6">
                                  <label
                                    htmlFor="password"
                                    className="mb-2 ml-24  mt-2 block text-sm font-medium text-gray-900 dark:text-white"
                                  >
                                    Gender
                                  </label>
                                  <div className="relative mb-6">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                      <svg
                                        viewBox="0 0 320 512"
                                        fill="currentColor"
                                        className="ml-24 h-12 w-4 text-gray-500 dark:text-gray-400"
                                      >
                                        <path d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm-56 304v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9l-28.6 47.6c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352h-16z" />
                                      </svg>
                                    </div>
                                    <input
                                      type="Text"
                                      value={updategender}
                                      required
                                      onChange={(e) => {
                                        setUpdategender(e.target.value);
                                      }}
                                      className="ml-24 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                      placeholder="Male"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end ">
                            <button
                              className="mb-1   mt-5 flex rounded bg-button px-4  py-2 font-bold text-white hover:bg-primary"
                              type="submit"
                            >
                              Confirm
                              <svg
                                viewBox="0 0 512 512"
                                fill="currentColor"
                                className="ml-1 mt-1.5 h-4 w-5"
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
              </div>

              <div class="my-20 ml-32 max-w-2xl rounded-lg bg-slate-50 px-8 py-4 shadow-lg">
                <div class="-mt-16 flex justify-center md:justify-end">
                  <img
                    class="h-20 w-20 rounded-full border-2 border-violet-600 object-cover"
                    src={require("../images/profile.png")}
                  />
                </div>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-[500px] h-6 w-6"
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
                <div>
                  <h2 class="text-3xl font-semibold text-gray-800">
                    My Profile
                  </h2>
                  <div className="flex">
                    <p className="mt-5 font-bold">Name:</p>
                    <p className="ml-5 mt-5">{Profile.name}</p>
                    <p className="ml-20 mt-5 font-bold">Email:</p>
                    <p className="ml-5 mt-5">{Profile.email}</p>
                  </div>
                  <div className="flex">
                    <p className="mt-5 font-bold">Phone No:</p>
                    <p className=" ml-5 mt-5">{Profile.phoneNumber}</p>
                    <p className="ml-[40px] mt-5 font-bold">License Number:</p>
                    <p className="ml-5 mt-5">{Profile.medicalLicenseNo}</p>
                  </div>
                  <div className="flex">
                    <p className="mt-5 font-bold">Gender:</p>
                    <p className=" ml-5 mt-5">{Profile.gender}</p>
                    <p className="ml-[118px] mt-5 font-bold">Ratings:</p>
                    <p className=" ml-5 mt-5">{Profile.rating}</p>
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      className=" mt-2.5 h-4 w-4  !fill-yellow-500 transition-colors duration-200  group-hover:fill-yellow-600 dark:fill-gray-600"
                    >
                      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
