import React, { useCallback, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Hooks/AuthContext";
import { useForm } from "react-hook-form";

export default function ShowDoc() {
  const { setSelectedDoc } = useContext(UserContext);
  const { setAppNavigation } = useContext(UserContext);


  const [regdoctors, setregDoctors] = useState([]);

  const setDocEmail = (email) =>{
    setSelectedDoc(email);
    setAppNavigation(false);
  }

  const fecthRegisterPatients = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/patient/getAllDoctor/6463e56b2621ab5034d067d8");
      setregDoctors(response.data);
    
      console.log(response.data);
      console.log("Timess");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fecthRegisterPatients();
  }, [fecthRegisterPatients]);


  return (
    <>
      <div>
        <h2 className="mb-4 mt-5 text-2xl font-extrabold dark:text-white">
          Available Doctors
        </h2>
      </div>

      <div class="relative mr-5 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">S/N</div>
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-4 py-3">
                Phone No.
              </th>
              <th scope="col" class="px-4 py-3">
                Specialization
              </th>
              
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>

            {
              regdoctors.map((data, index) =>(
            <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <td class="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >{data.email}</th>
              <td class="px-6 py-4">{data.name}</td>
              <td class="px-4 py-4">{data.phoneNumber}</td>
              
              <td class="px-6 py-4">{data.specialization}</td>

              <td class="flex items-center space-x-3 px-6 py-4">
                <button class="font-medium text-green-600 hover:underline dark:text-green-500" onClick={setDocEmail(data.email)}>
                Book Appointment

                </button >
                
              </td>
            </tr>

              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
