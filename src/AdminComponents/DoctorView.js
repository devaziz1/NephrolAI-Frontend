import { useForm } from "react-hook-form";
import axios from "axios";

import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";

import AddDoctor from "./AddDoctorView";

import React, { useCallback, useState, useEffect } from "react";
import Header from "./Header";
import AddDoctorView from "./AddDoctorView";
export default function PatientView() {
  const [errorsMessage, seterrorsMessage] = useState("");
  const [regdoctors, setregDoctors] = useState([]);
  const [allDoc, setAllDoc] = useState(true);
  const [searchDoc, setSearchDoc] = useState([]);
  const [editDoctor, setEditDoctor] = useState(false);
  const [deleteDoctor, setdeleteDoctor] = useState(false);

  //Update Doctor

  const [updateEmail, setUpdateEmail] = useState("");
  const [updatename, setUpdatename] = useState("");
  const [updatepassowrd, setUpdatepassword] = useState("");
  const [updatephoneNo, setUpdatephoneNo] = useState("");
  const [updateLN, setUpdateLN] = useState("");
  const [updategender, setUpdategender] = useState("");
  const [updateSP, setUpdateSP] = useState("");

  const handleSubmitt = (event) => {
    console.log("inside handle submit function");
    event.preventDefault();
    // Call the function to send the data to the backend

    editDoc();
  };

  //Modal states
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = (email) => {
    setIsOpen(true);
    setUpdateEmail(email);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const ResetHandler = () => {
    resetField("Name");
    resetField("Password");
    resetField("email");
    resetField("LN");
    resetField("Number");
    resetField("gender");
  };

  const editDoc = () => {
    console.log("Inside edit doctor function");
    axios
      .patch("http://localhost:8080/admin/doctor/update", {
        name: updatename,
        password: updatepassowrd,
        email: updateEmail,
        medicalLicenseNo: updateLN,
        phoneNumber: updatephoneNo,
        gender: updategender,
        specialization: updateSP,
      })
      .then(function (response) {
        console.log(response);
        setEditDoctor(true);
        setUpdatename("");
        setUpdatepassword("");
        setUpdategender("");
        setUpdateSP("");
        setUpdateLN("");
        setUpdatephoneNo("");
        setTimeout(() => {
          setEditDoctor(false);
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
        seterrorsMessage(error.response.data.mesg);
        setTimeout(() => {
          seterrorsMessage("");
        }, 5000);
      });
  };

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const searchDoctor = useCallback(async (emaill) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/doctor/search/${emaill.SearchData}`
      );
      setSearchDoc(response.data);
      console.log(response.data);
      setAllDoc(false);
    } catch (error) {
      seterrorsMessage(error.response.data.mesg);
      setTimeout(() => {
        seterrorsMessage("");
      }, 5000);
    }
  }, []);

  const fecthRegisterPatients = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getAllDoctor/655e5dcba812c44f8a7f2a3f",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setregDoctors(response.data);
      setAllDoc(true);
      console.log(response.data);
      console.log("Timess");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDelete = (email) => {
    axios
      .delete(`http://localhost:8080/admin/doctor/delete/${email}`)
      .then(() => {
        fecthRegisterPatients();
        setdeleteDoctor(true);
        setTimeout(() => {
          setdeleteDoctor(false);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearSearchHanlder = () => {
    setAllDoc(true);
    resetField("SearchData");
  };

  useEffect(() => {
    fecthRegisterPatients();
  }, [fecthRegisterPatients]);
  return (
    <>
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
                placeholder="Search Doctor By Email"
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
            className=" relative ml-[550px] mt-5 w-72 animate-jump-in animate-ease-in-out rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
            role="alert"
          >
            <strong className="font-bold">{errorsMessage}</strong>
          </div>
        </>
      )}
      {deleteDoctor && (
        <>
          <div
            className="ml-[550px] mt-3 animate-jump-in animate-ease-in-out w-64 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
            role="alert"
          >
            <strong className="font-bold">Doctor Deleted Successfully</strong>
          </div>
        </>
      )}

      <div className="mt-10 flex  space-x-20 ">
        <h2 className="ml-60 text-2xl font-bold dark:text-white">
          Registered Doctors
        </h2>
      </div>

      <div className="mt-30 mx-5 ml-56">
        <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Specialization
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  License Number
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            {allDoc ? (
              regdoctors.map((data, index) => (
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="font-medium text-gray-700">
                        {data.name}
                      </div>
                    </th>
                    <td className="px-6 py-4"> {data.email}</td>
                    <td className="px-6 py-4">{data.phoneNumber}</td>
                    <td className="px-6 py-4">{data.specialization}</td>
                    <td className="px-6 py-4">{data.medicalLicenseNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => handleDelete(data.email)}>
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

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          onClick={() => handleModalOpen(data.email)}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="green"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>

                        {isOpen && (
                          <div className="fixed inset-0 z-50 flex animate-jump-in items-center justify-center overflow-auto">
                            <div className="modal-overlay absolute h-full w-full bg-transparent "></div>

                            <div className="modal-container z-50  rounded bg-slate-50 shadow-lg ">
                              <div className="modal-content px-6 py-4 text-left">
                                {/* Modal header */}
                                <div className="flex items-center justify-between pb-3">
                                  <p className="ml-80 text-2xl font-bold">
                                    Edit Doctor
                                  </p>
                                  {errorsMessage && (
                                    <>
                                      <div
                                        className=" relative ml-80 mt-5 w-80 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                                        role="alert"
                                      >
                                        <strong className="font-bold">
                                          {errorsMessage}
                                        </strong>
                                      </div>
                                    </>
                                  )}

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

                                {editDoctor && (
                                  <>
                                    <div
                                      className="ml-72  w-64 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
                                      role="alert"
                                    >
                                      <strong className="font-bold">
                                        Doctor Updated Successfully
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
                                            value={updateEmail}
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
                                            Enter Password
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
                                                setUpdatepassword(
                                                  e.target.value
                                                );
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
                                            Enter Phone Number
                                          </label>
                                          <div className="relative mb-6">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                              <svg
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                className="ml-16 h-20 w-5 text-gray-500 dark:text-gray-400"
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
                                                setUpdatephoneNo(
                                                  e.target.value
                                                );
                                              }}
                                              className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                              placeholder="•••••••••"
                                            />
                                          </div>
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
                                            Enter Medical License No.
                                          </label>
                                          <div className="relative mb-6">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                              <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="ml-24 h-24 w-6 text-gray-500 dark:text-gray-400"
                                              >
                                                <path d="M9 10a3.04 3.04 0 013-3 3.04 3.04 0 013 3 3.04 3.04 0 01-3 3 3.04 3.04 0 01-3-3m3 9l4 1v-3.08A7.54 7.54 0 0112 18a7.54 7.54 0 01-4-1.08V20m4-16a5.78 5.78 0 00-4.24 1.74A5.78 5.78 0 006 10a5.78 5.78 0 001.76 4.23A5.78 5.78 0 0012 16a5.78 5.78 0 004.24-1.77A5.78 5.78 0 0018 10a5.78 5.78 0 00-1.76-4.26A5.78 5.78 0 0012 4m8 6a8.04 8.04 0 01-.57 2.8A7.84 7.84 0 0118 15.28V23l-6-2-6 2v-7.72A7.9 7.9 0 014 10a7.68 7.68 0 012.33-5.64A7.73 7.73 0 0112 2a7.73 7.73 0 015.67 2.36A7.68 7.68 0 0120 10z" />
                                              </svg>
                                            </div>
                                            <input
                                              type="text"
                                              value={updateLN}
                                              required
                                              onChange={(e) => {
                                                setUpdateLN(e.target.value);
                                              }}
                                              className="ml-24 block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                              placeholder="•••••••••"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <div>
                                          <div className="mb-6">
                                            <label
                                              htmlFor="password"
                                              className="mb-2 ml-4 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                              Gender
                                            </label>
                                            <div className="relative mb-6">
                                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                <svg
                                                  viewBox="0 0 320 512"
                                                  fill="currentColor"
                                                  className="ml-2 h-12 w-4 text-gray-500 dark:text-gray-400"
                                                >
                                                  <path d="M208 48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm-56 304v128c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9l-28.6 47.6c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352h-16z" />
                                                </svg>
                                              </div>
                                              <input
                                                type="Text"
                                                value={updategender}
                                                required
                                                onChange={(e) => {
                                                  setUpdategender(
                                                    e.target.value
                                                  );
                                                }}
                                                className="ml-2 block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Male"
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
                                              className="mb-2 ml-16 mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                              Enter Specialization
                                            </label>
                                            <div className="relative mb-6">
                                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                                                <svg
                                                  viewBox="0 0 640 512"
                                                  fill="currentColor"
                                                  className="ml-16 h-24 w-6 text-gray-500 dark:text-gray-400"
                                                >
                                                  <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9V320c0 28.4-10.8 57.7-22.3 80.8-6.5 13-13.9 25.8-22.5 37.6-3.2 4.3-4.1 9.9-2.3 15s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7.3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7-3.2-14.2-7.5-28.7-13.5-42v-24.6c0-30.2 10.2-58.7 27.9-81.5 12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5.8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1l280.6-101c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1c-7.6-2.7-15.6-4.1-23.7-4.1zM128 408c0 35.3 86 72 192 72s192-36.7 192-72l-15.3-145.4L354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6l-142.2-51.4L128 408z" />
                                                </svg>
                                              </div>
                                              <input
                                                type="text"
                                                value={updateSP}
                                                required
                                                onChange={(e) => {
                                                  setUpdateSP(e.target.value);
                                                }}
                                                className="ml-16 block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                placeholder="Nephrologist"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Modal footer */}
                                  <div className="flex justify-end pt-2">
                                    <button
                                      type="submit"
                                      className="rounded-lg bg-blue-500 p-3 px-4 text-white hover:bg-blue-400"
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">1</td>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="font-medium text-gray-700">
                        {searchDoc.name}
                      </div>
                    </th>
                    <td className="px-6 py-4"> {searchDoc.email}</td>
                    <td className="px-6 py-4">{searchDoc.phoneNumber}</td>
                    <td className="px-6 py-4">{searchDoc.specialization}</td>
                    <td className="px-6 py-4">{searchDoc.medicalLicenseNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => handleDelete(searchDoc.email)}>
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

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleModalOpen(searchDoc.email)}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="green"
                          className="h-6 w-6 cursor-pointer"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
