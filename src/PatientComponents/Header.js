import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <header class="">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8 bg-gray-100"
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
            <a href="#" class="text-lg font-semibold leading-6 text-gray-900 hover:underline">
              Features
            </a>
            <a href="#" class="text-lg font-semibold leading-6 text-gray-900 hover:underline">
              Contact
            </a>
            <a href="#" class="text-lg font-semibold leading-6 text-gray-900 hover:underline">
              About Us
            </a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              type="button"
              onClick={()=>{
                navigate('/pSignUp');
              }}
              class=" mr-2  rounded-lg border-2 border-primary bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              SignUp
            </button>
            <button
              type="button"
              onClick={()=>{
                navigate('/pLogin');
              }}
              class=" mr-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-heading focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              LogIn
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
