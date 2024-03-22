import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Hooks/AuthContext";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

export default function Schedule() {
  const data = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [selectedDay, setSelectedDay] = useState("Monday");

  const [stateSlots, setslots] = useState([]);
  const [timing, settiming] = useState([]);
  const [editTable, showEditTable] = useState(false);
  const [fetchSchedule, setFetchSchedule] = useState(true);
  const [currentHeading, setCurrentHeading] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const { userEmail } = useContext(UserContext);

  const email = userEmail;

  const {
    handleSubmit,
    register,
    reset,
    resetField,
    formState: { errors, isSubmitSuccessful },
    setValue,
  } = useForm();

  const fecthDoctorSchedule = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/doctor/profile/${userEmail}`
      );
      console.log("Response from backend: ", response.data.slots);

      setslots(response.data.slots);
    } catch (error) {
      console.log(error);
    }
  }, []);



  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSlots((selectedSlots) => [...selectedSlots, value]);
    } else {
      setSelectedSlots((selectedSlots) => [
        ...selectedSlots.filter((category) => category !== value),
      ]);
    }
  };

  const Submit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/doctor/updateSchedule",
        {
          email: email,
          day: selectedDay,
          timings: selectedSlots,
        }
      );

      console.log(response.data);
      setSelectedSlots([]);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createSchedule = () => {
    resetField("field1");
    resetField("field2");
    resetField("field3");
    resetField("field4");
    resetField("field5");
    resetField("field6");
    resetField("field7");
    resetField("field8");
    resetField("field9");
    resetField("field10");
    resetField("field11");
    resetField("field12");
    resetField("field13");
    resetField("field14");
    fecthDoctorSchedule();
  };

  const filterSchedule = () => {
    console.log("hello from filterSchedule");
    let filteredAppointments = stateSlots;

    filteredAppointments = filteredAppointments.filter(
      (appointment) => appointment.day === selectedDay
    );
    console.log("Filter schedule");
    console.log(filteredAppointments);

    // Extract timings from filteredAppointments
    const timings = filteredAppointments.map(
      (appointment) => appointment.timings
    );

    console.log("Filtered schedule: ", timings);

    // Update the timing state
    settiming(timings);

    return filteredAppointments;
  };

  useEffect(() => {
    fecthDoctorSchedule();
    filterSchedule();
  }, [fecthDoctorSchedule, selectedDay]);

  return (
    <>
      {currentHeading === 1 ? (
        <h2 className=" mx-80 mt-5 text-3xl font-bold dark:text-white">
          My Schedule
        </h2>
      ) : (
        <h2 className=" mx-80 mt-5 text-3xl font-bold dark:text-white">
          Edit Schedule
        </h2>
      )}

      {editTable ? (
        <div>
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => {
                    showEditTable(false);
                    fecthDoctorSchedule();
                    setCurrentHeading(1);
                    setFetchSchedule(true);
                  }}
                  className="text-blue ml-2 inline-flex items-center rounded-lg py-2.5 text-center text-lg font-bold  "
                >
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className=" h-6 w-6"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="square"
                      strokeMiterlimit={10}
                      strokeWidth={48}
                      d="M328 112L184 256l144 144"
                    />
                  </svg>
                  back
                </button>
              </div>

              <div className="mr-7 grid grid-cols-12 p-3 ">
                <div className="xs:flex-col col-span-12 flex md:flex-row md:items-center md:justify-between ">
                  <div className="col-span-6">
                    <label
                      htmlFor="status"
                      className="font-inter mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Day
                    </label>

                    <Listbox value={selectedDay} onChange={setSelectedDay}>
                      {({ open }) => (
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full min-w-[120px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="block truncate">
                                {selectedDay}
                              </span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              onChange={(e) => setSelectedDay(e.target.value)}
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {data.map((val, index) => (
                                <Listbox.Option
                                  key={val}
                                  className={`${
                                    selectedDay === val
                                      ? "bg-violet-500 font-bold"
                                      : "text-gray-900"
                                  } w-full px-1 py-1`}
                                  value={val}
                                >
                                  <div className="flex w-full items-center justify-between">
                                    <span
                                      className={
                                        selectedDay === val ? "text-white" : ""
                                      }
                                    >
                                      {val}
                                    </span>
                                    {selectedDay === val ? (
                                      <span>
                                        <CheckIcon
                                          className="h-5 w-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </div>
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      )}
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(Submit)}>
              <div class="relative mb-5 mr-7 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400 ">
                  <thead class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        S/N
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Appointment Slots
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Availablility
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">1</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        9:00 - 9:30 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field1", {})}
                            type="checkbox"
                            value="9:00 - 9:30 AM "
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">2</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        9:30 - 10:00 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field2", {})}
                            type="checkbox"
                            value="9:30 - 10:00 AM "
                            onChange={handleCheckboxChange}
                            // checked={selectedSlots.includes("9:30 - 10:00 AM ")}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">3</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        10:00 - 10:30 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field3", {})}
                            type="checkbox"
                            value="10:00 - 10:30 AM "
                            onChange={handleCheckboxChange}
                            // checked={selectedSlots.includes("10:00 - 10:30 AM ")}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">4</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        10:30 - 11:00 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field4", {})}
                            type="checkbox"
                            value="10:30 - 11:00 AM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">5</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        11:00 - 11:30 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field5", {})}
                            type="checkbox"
                            value="11:00 - 11:30 AM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">6</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        11:30 - 12:00 AM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field6", {})}
                            type="checkbox"
                            value="11:30 - 12:00 AM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">7</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        12:00 - 12:30 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field7", {})}
                            type="checkbox"
                            value="12:00 - 12:30 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">8</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        12:30 - 1:00 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field8", {})}
                            type="checkbox"
                            value="12:30 - 1:00 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">9</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        1:00 - 1:30 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field9", {})}
                            type="checkbox"
                            value="1:00 - 1:30 AM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">10</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        1:30 - 2:00 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field10", {})}
                            type="checkbox"
                            value="1:30 - 2:00 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">11</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        2:00 - 2:30 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field11", {})}
                            type="checkbox"
                            value="2:00 - 2:30 AM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">12</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        2:30 - 3:00 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field12", {})}
                            type="checkbox"
                            value="2:30 - 3:00 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">13</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        3:00 - 3:30 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field13", {})}
                            type="checkbox"
                            value="3:00 - 3:30 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">14</div>
                      </td>
                      <th scope="row" class="px-6 py-4">
                        3:30 - 4:00 PM
                      </th>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <input
                            id="checked-checkbox"
                            {...register("field14", {})}
                            type="checkbox"
                            value="3:30 - 4:00 PM"
                            onChange={handleCheckboxChange}
                            class="ml-7 h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="submit"
                onClick={createSchedule}
                className=" mb-7 ml-[810px] inline-flex items-center rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
              >
                Create Schedule
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-10">
            <div className="mr-3 grid grid-cols-12 p-3 ">
              <div className="xs:flex-col col-span-12 flex md:flex-row md:items-center md:justify-between ">
                <div className="col-span-6">
                  <label
                    htmlFor="status"
                    className="font-inter mb-2 block text-lg font-medium text-gray-900 dark:text-white"
                  >
                    Day
                  </label>

                  <Listbox value={selectedDay} onChange={setSelectedDay}>
                    {({ open }) => (
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full min-w-[120px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="block truncate">
                              {selectedDay}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            {data.map((val, index) => (
                              <Listbox.Option
                                key={val}
                                className={`${
                                  selectedDay === val
                                    ? "bg-violet-500 font-bold"
                                    : "text-gray-900"
                                } w-full px-1 py-1`}
                                value={val}
                              >
                                <div className="flex w-full items-center justify-between">
                                  <span
                                    className={
                                      selectedDay === val ? "text-white" : ""
                                    }
                                  >
                                    {val}
                                  </span>
                                  {selectedDay === val ? (
                                    <span>
                                      <CheckIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>

                <div className="flex mt-10">
                  <div>
                    <button
                      onClick={() => {
                        showEditTable(true);
                        setCurrentHeading(2);
                      }}
                      className=" ml-[440px] mr-5  inline-flex items-center rounded-lg bg-button px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-1 h-6 w-6"
                      >
                        <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z" />
                      </svg>
                      Edit Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative mb-7 mr-7 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      S/N
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Appointment Slots
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                {timing.map((data, index) => (
                  <tbody key={index}>
                    {data.map((item, subIndex) => (
                      <tr
                        key={subIndex}
                        className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            {subIndex + 1}
                          </div>
                        </td>
                        <th scope="row" className="px-6 py-4">
                          {item}
                        </th>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{" "}
                            Available
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
