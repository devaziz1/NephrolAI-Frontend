import axios from "axios";
import { useForm } from "react-hook-form";

import Header from "./Header";

import React, { useCallback, useState, useEffect, useRef } from "react";

export default function ComplaintView() {
  const [searchComplaint, setSearchCompaint] = useState([]);
  const [errorsMessage, seterrorsMessage] = useState();
  const [regCompaints, setRegCompaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [allCompaints, setAllCompaints] = useState(true);
  const [dcoComplaint, setDocComplaints] = useState(false);

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const clearSearchHanlder = () => {
    setAllCompaints(true);
    resetField("SearchData");
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split("T")[0]; // Format: "2023-07-24"
    return formattedDate;
  };

  const searchDoctor = useCallback(async (emaill) => {
    console.log("Inside search function");
    console.log(emaill.SearchData);
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/searchCom/${emaill.SearchData}`
      );
      setSearchCompaint(response.data);
      console.log(response.data);
      setAllCompaints(false);
    } catch (error) {
      console.log(error.response.data.error);
      seterrorsMessage(error.response.data.error);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  }, []);

  const selectedComp = useCallback(async (id) => {
    console.log("Inside selected complaint");
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/getComplaintBody/${id}`
      );
      setSelectedComplaint(response.data.complaint.description);
      console.log(response.data.complaint.description);
    } catch (error) {
      seterrorsMessage(error.response.data.mesg);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  }, []);

  const deleteComp = useCallback(async (id) => {
    console.log("Inside delete complaint");
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/deleteComplaint/${id}`
      );
      console.log(response);
      fecthAllCompaints();
    } catch (error) {
      seterrorsMessage(error.response.data.mesg);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  }, []);

  const fecthAllCompaints = useCallback(async () => {
    console.log("Inside compaint");
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getAllCompaint"
      );

      console.log(response.data);
      setRegCompaints(response.data);
      console.log("Timess");

      console.log("reg compaints are:  " + regCompaints);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fecthAllCompaints();
  }, [fecthAllCompaints]);

  return (
    <div>
      <nav className="w-full bg-gray-800">
        <Header />
      </nav>

      <div className="ml-40 flex">
        <div>
          <form onSubmit={handleSubmit(searchDoctor)}>
            <label
              htmlFor="default-search"
              className="sr-only  mb-2 text-sm font-medium text-gray-900 dark:text-white"
            ></label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="ml-72 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                {...register("SearchData", {
                  required: "Please Provide Valid Email",
                })}
                id="default-search"
                className="ml-72 mt-5 block w-96 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search Compaint By Email"
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 right-2.5 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div>
          <button
            type="button"
            onClick={clearSearchHanlder}
            className="ml-5  mt-3 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
          >
            Clear
          </button>
        </div>
      </div>

      {errorsMessage && (
        <>
          <div
            className=" relative ml-96 mt-5 w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">{errorsMessage}</strong>
          </div>
        </>
      )}

      <div className="mt-10 flex  space-x-20">
        <h2 className="ml-64 text-2xl font-bold dark:text-white">
          All Compaints
        </h2>
      </div>
      <div className="mt-30 mx-5 ml-60 ">
        <div class="relative mr-7 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-600 dark:bg-gray-600 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-4 py-3">
                  S/N
                </th>
                <th scope="col" class="px-4 py-1">
                  Email
                </th>
                <th scope="col" class="px-3 py-1">
                  complainer
                </th>
                <th scope="col" class="px-3 py-1">
                  Date
                </th>
                <th scope="col" class="px-3 py-1">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {allCompaints
                ? regCompaints.map((data, index) => (
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">{index + 1}</div>
                      </td>
                      <th scope="row" class="px-4 py-2 font-normal">
                        {data.email}
                      </th>
                      <th scope="row" class="px-4 py-2 font-normal">
                        {data.complainer}
                      </th>
                      <th scope="row" class="px-4 py-2 font-normal">
                        {formatDate(data.date)}
                      </th>

                      <th scope="row" class="px-4 py-2">
                        <div className="flex justify-start gap-4">
                          <button onClick={() => deleteComp(data._id)}>
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
                                      src={require("../images/CompaintBody.png")}
                                      className="mx-auto h-28 w-32  text-3xl "
                                      alt="Logo"
                                    />
                                  </div>

                                  <div>
                                    <p
                                      for="message"
                                      class=" mt-5 block text-base font-semibold text-gray-900 dark:text-white"
                                    >
                                      Compaint Body:
                                    </p>
                                    <p className="mb-4  mt-5 text-sm font-semibold">
                                      {selectedComplaint}
                                    </p>
                                  </div>

                                  {/* Modal body */}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              selectedComp(data._id);
                              handleModalOpen(true);
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
                        </div>
                      </th>
                    </tr>
                  ))
                : searchComplaint.map((data, index) => (
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">{index + 1}</div>
                      </td>
                      <th scope="row" class="px-4 py-2">
                        {data.email}
                      </th>
                      <th scope="row" class="px-4 py-2">
                        Doctor
                      </th>
                      <th scope="row" class="px-4 py-2">
                        {formatDate(data.date)}
                      </th>

                      <th scope="row" class="px-4 py-2">
                        <div className="flex justify-start gap-4">
                          <button onClick={() => deleteComp(data._id)}>
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

                          {isOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
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
                                    <p>{selectedComplaint}</p>
                                  </div>

                                  {/* Modal body */}
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              selectedComp(data._id);
                              handleModalOpen(true);
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
                        </div>
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
