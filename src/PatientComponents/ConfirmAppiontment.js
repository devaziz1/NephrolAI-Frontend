import React, { useCallback, useState, useEffect, useContext } from "react";

import axios from "axios";

import { UserContext } from "../Hooks/AuthContext";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function ConfirmAppiontment() {

  const { userEmail } = useContext(UserContext);

  console.log(userEmail);
  const [stateSlots, setslots] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);

    const fecthDoctorSchedule = useCallback(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doctor/profile/newd123@gmail.com`);
        console.log("Response from backend: " + response.data.slots);
        const Available = response.data.slots.map((item) => item);
        setslots(Available);
        console.log("Timess");
      } catch (error) {
        console.log(error);
      }
    }, []);
    
      const handleDateChange = (date) => {
        setSelectedDate(date);
        fecthDoctorSchedule();
      };

      

      const today = new Date();
  today.setHours(0, 0, 0, 0);


    return (
    <>
    

    <div className="flex justify-center mt-4">
     
     
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={today}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        className="border-2 border-primary rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out hover:border-primary hover:shadow"
        // Additional styles
        calendarClassName="bg-ofWhite shadow-lg rounded-lg mt-2"
        popperPlacement="bottom-start"
      />
    </div>


    


      
    </>
  )
}
