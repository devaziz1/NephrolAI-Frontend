import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../Hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Slider from "react-slick";

import image1 from "../images/slider/slide (1).png";
import image2 from "../images/slider/slide (2).png";
import image3 from "../images/slider/slide (3).png";
import image4 from "../images/slider/slide (4).png";

import DoctorHome from "./DoctorHome";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);

  const [errorsMessage, seterrorsMessage] = useState("");

  const images = [image1, image2, image3, image4];


  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const loginUser = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8080/doctor/login", data)
      .then(function (response) {
        console.log(response);
        seterrorsMessage("");

        setUserEmail(response.data.email);
        // const token = response.data.token;

        // Store the token in local storage
        // localStorage.setItem('token', token);
        if (isSubmitSuccessful) {
          resetField("email");
        }

        navigate("/dHome");
      })
      .catch(function (error) {
        console.log(error);
        seterrorsMessage(error.response.data.mesg);
      });
    console.log(data);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay here
  };

  return (
    <>
      <section className="h-screen bg-gray-100">
        <div className="text-center">
          <img
            src={require("../images/fontlogo.png")}
            className="mx-auto w-40 text-3xl "
            alt="Logo"
          />
        </div>

        <div className="h-40">
          <div className="g-6 mt-52 flex h-full flex-wrap items-center lg:place-content-evenly">
            <div className="h-96 w-96 ">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt="slider" />
                  </div>
                ))}
              </Slider>
            </div>
            <div>
              {errorsMessage && (
                <>
                  <div
                    className="w-70 relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                    role="alert"
                  >
                    <strong className="font-bold">{errorsMessage}</strong>

                    <span className="absolute bottom-0 right-0 top-0 px-4 py-3"></span>
                  </div>
                </>
              )}
              <div className="font-Roboto mb-10 text-4xl font-medium">
                Doctor Login
              </div>

              <form onSubmit={handleSubmit(loginUser)}>
                <div className="group relative z-0 mb-6 w-60 ">
                  <div>
                    <label
                      htmlFor="input-group-1"
                      className="mb-2  block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Enter Email
                    </label>
                    <div className="relative mb-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <svg
                          className=" h-4 w-4 text-gray-500 dark:text-gray-400"
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
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                        id="input-group-1"
                        className=" block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="name@gmail.com"
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="filled_error_help"
                        className=" text-xs text-red-600 dark:text-red-400"
                      >
                        <span className="font-medium">
                          {errors.email.message}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="group relative z-0 mb-6 w-60 ">
                  <div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="mb-2  mt-3 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Enter Password
                      </label>
                      <div className="relative mb-2">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                          <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className=" h-24 w-6 text-gray-500 dark:text-gray-400"
                          >
                            <path d="M3.5 11.5a3.5 3.5 0 113.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 01-3.163 2zM2.5 9a1 1 0 100-2 1 1 0 000 2z" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          {...register("password", {
                            required: "Password is required",
                          })}
                          id="input-group-3"
                          className=" block w-60 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="•••••••••"
                        />
                      </div>
                    </div>
                    {errors.password && (
                      <p
                        id="filled_error_help"
                        className=" text-xs text-red-600 dark:text-red-400"
                      >
                        <span className="font-medium">
                          {errors.password.message}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className=" mt-1 rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium text-white  hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary sm:w-auto lg:w-60"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DoctorLogin;
