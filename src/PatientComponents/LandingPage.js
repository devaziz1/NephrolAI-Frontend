import React from "react";
import Header from "./Header";
import Card from "./Card";

import { Link, animateScroll as scroll } from "react-scroll";
import Background from "./Styles/Background.css";
import contact from "../images/contact.jpg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100">
        <div>
          <header class="">
            <nav
              class="mx-auto flex max-w-7xl items-center justify-between bg-gray-100 p-3 lg:px-8"
              aria-label="Global"
            >
              <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                  <span class="sr-only">Your Company</span>
                  <img
                    class="h-12 w-auto"
                    src={require("../images/Blogo.png")}
                    alt=""
                  />
                </a>
              </div>

              <div class="hidden lg:flex lg:gap-x-12">
                <Link
                  to="featuresSection" // The ID of the element you want to scroll to
                  spy={true}
                  smooth={true}
                  offset={-70} // Adjust this offset if needed
                  duration={500} // Duration of the scrolling animation
                  className="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                >
                  <a
                    href="#"
                    class="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                  >
                    Features
                  </a>
                </Link>

                <Link
                  to="contactSection" // The ID of the element you want to scroll to
                  spy={true}
                  smooth={true}
                  offset={-70} // Adjust this offset if needed
                  duration={500} // Duration of the scrolling animation
                  className="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                >
                  <a
                    href="#"
                    class="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                  >
                    Contact
                  </a>
                </Link>
                <Link
                  to="aboutusSection" // The ID of the element you want to scroll to
                  spy={true}
                  smooth={true}
                  offset={-70} // Adjust this offset if needed
                  duration={500} // Duration of the scrolling animation
                  className="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                >
                  <a
                    href="#"
                    class="text-lg font-semibold leading-6 text-gray-900 hover:underline"
                  >
                    About Us
                  </a>
                </Link>
              </div>
              <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/pSignUp");
                  }}
                  class=" mr-2  rounded-lg border-2 border-primary bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  SignUp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/pLogin");
                  }}
                  class=" mr-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-heading focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  LogIn
                </button>
              </div>
            </nav>
          </header>
        </div>
        <div className="flex  h-99 w-full bg-gray-100 p-10">
          <div className="mt-28 h-72 w-100 flex-col">
            <h1 class="mb-5 animate-fade-up text-3xl font-extrabold text-heading animate-delay-200 animate-duration-1000 dark:text-white">
              Kidney Diseases Detection System
            </h1>
            <div>
              <small class=" animate-fade-up text-2xl font-semibold  animate-delay-700 animate-duration-1000 dark:text-gray-400">
                Efficiently assess your kidney health with our advanced system
                for early detection and management of kidney diseases.
              </small>
            </div>

            <button
              class="mt-[15px] animate-bounce rounded-lg border-2 border-primary  bg-white  px-5 py-2.5 text-sm font-medium text-gray-900 animate-delay-700 animate-duration-1000 animate-infinite hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              onClick={() => {
                navigate("/pSignUp");
              }}
            >
              Get Started
            </button>
          </div>

          <div className=" ml-44 mt-8 h-52 w-80 animate-fade-left animate-delay-200 animate-duration-1000 ">
            <img src={require("../images/kideny.png")} />
          </div>
        </div>
        <div id="featuresSection">
          <h2 className="mt-14 text-center text-3xl font-extrabold dark:text-white">
            Our Services & Features
          </h2>
        </div>
        <Card />
        <div className="relative" id="contactSection">
          <img
            src={require("../images/team.jpg")}
            alt="Your Image"
            className="image-opacity h-[600px] w-full"
          />
          <div className="text-overlay w-[1000px]">
            <div class="pb-12 text-center">
              <h1 class="font-heading text-3xl font-bold text-white md:text-4xl lg:text-4xl">
                Our Development Team
              </h1>
              <h1 class="mt-5 text-lg font-medium text-white md:text-lg lg:text-lg">
                We Are Here To Help You With Anything You Need
              </h1>
            </div>
            <div className="flex">
              <div class="sahdow-lg   w-[340px] flex-col rounded-lg bg-gray-900 p-12 ">
                <div class="mb-8">
                  <img
                    class="ml-7 h-36 w-36 rounded-full object-cover object-center"
                    src={require("../images/Team/Aziz.jpeg")}
                    alt="photo"
                  />
                </div>
                <div class="text-center">
                  <p class="mb-2 text-xl font-bold text-white">Aziz Naseer</p>
                  <p class="text-base font-normal text-gray-400">
                    Web Developer
                  </p>
                  <p class="text-base font-normal text-gray-400">
                    AzizNaseer563@gmail.com
                  </p>
                  <p class="text-base font-normal text-gray-400">03136444866</p>
                </div>
              </div>

              <div class="sahdow-lg ml-10  w-[340px] flex-col rounded-lg bg-gray-900 p-12 ">
                <div class="mb-8">
                  <img
                    class="ml-9 h-36 w-36 rounded-full object-cover object-center"
                    src={require("../images/Team/supervisor.PNG")}
                    alt="photo"
                  />
                </div>
                <div class="text-center">
                  <p class="mb-2 text-xl font-bold text-white">
                    Mr Umar Nauman
                  </p>
                  <p class="text-base font-normal text-gray-400">
                    Project Supervisor
                  </p>
                  <p class="text-base font-normal text-gray-400">
                    Umarnauman@comsats.edu.pk
                  </p>
                  <p class="text-base font-normal text-gray-400">03335205207</p>
                </div>
              </div>

              <div class="sahdow-lg ml-10  w-[340px] flex-col rounded-lg bg-gray-900 p-12 ">
                <div class="mb-8">
                  <img
                    class="ml-7 h-36 w-36 rounded-full object-cover object-center"
                    src={require("../images/Team/hira.jpg")}
                    alt="photo"
                  />
                </div>
                <div class="text-center">
                  <p class="mb-2 text-xl font-bold text-white">Hira Mahnoor</p>
                  <p class="text-base font-normal text-gray-400">
                    Mobile App Developer
                  </p>
                  <p class="text-base font-normal text-gray-400">
                    Hiramahnoor99@gmail.com
                  </p>
                  <p class="text-base font-normal text-gray-400">03418695380</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="font-poppins flex items-center bg-stone-100 dark:bg-gray-800 xl:h-screen ">
          <div class="mx-auto max-w-6xl flex-1 justify-center py-4 md:px-6 lg:py-6">
            <div class="flex flex-wrap ">
              <div class="mb-10 w-full px-4 lg:mb-0 lg:w-1/2">
                <div class="relative lg:max-w-md">
                  <img
                    src={require("../images/aboutusteam.jpg")}
                    alt="aboutimage"
                    class="relative z-10 h-96 w-full rounded object-cover"
                  />
                  <div class="absolute bottom-0 right-0 z-10 rounded border-4 border-primary bg-white p-8 shadow dark:border-violet-500 dark:bg-gray-800 dark:text-gray-300 sm:p-8 lg:-mb-8 lg:-mr-11 ">
                    <p class="text-lg font-semibold md:w-72">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="absolute left-0 top-0 h-16 w-16 text-button opacity-10 dark:text-gray-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                      </svg>{" "}
                      24/7 availability for successful kidney disease detection
                      services
                    </p>
                  </div>
                </div>
              </div>
              <div class="mb-10 w-full px-6 lg:mb-0 lg:w-1/2 ">
                <div class="mb-6 border-l-4 border-primary pl-4 ">
                  <span class="text-sm uppercase text-gray-600 dark:text-gray-400">
                    Who we are?
                  </span>
                  <h1
                    class="mt-2 text-3xl font-black text-gray-700 dark:text-gray-300 md:text-5xl"
                    id="aboutusSection"
                  >
                    About Us
                  </h1>
                </div>
                <p class="mb-6 text-base leading-7 text-gray-500 dark:text-gray-400">
                  We are a dedicated team of three individuals, embarking on our
                  final year project: the development of an advanced Kidney
                  Disease Detection System. Our mission is to empower medical
                  professionals during the crucial process of diagnosis,
                  providing them with a valuable tool to enhance patient care.
                  In pursuit of this mission, we have meticulously crafted both
                  web and mobile applications, ensuring a seamless and
                  user-friendly experience. Our innovative system offers a
                  comprehensive interface, catering to the needs of both
                  patients and medical practitioners. It equips them with an
                  array of functionalities typically found within a hospital
                  setting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer class="footer footer-center  w-full bg-gray-300 p-4 text-gray-800">
          <div class="text-center">
            <p>
              Copyright © 2023 -<a className="font-semibold">NephrolAI</a>
            </p>
            <a className="font-semibold">nephrolai@gmail.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}
