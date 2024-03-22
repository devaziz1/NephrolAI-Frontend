// AuthContext.js

import React, { createContext, useState } from 'react';

// Create the AuthContext
export const UserContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userEmail, setUserEmail] = useState('');
  const [patientEmail , setpatientEmail] = useState('');
  const [patientName , setPatientName] = useState('');
  const [appoitmentDoctor , setappoitmentDoctor] = useState('');
  const [selecteddSlot , setselectedSlot] = useState('');
  const [selecteddDate , setselecteddDate] = useState('');


  



  return (
    <UserContext.Provider value={{ userEmail, setUserEmail,  patientEmail , setpatientEmail, patientName , setPatientName,appoitmentDoctor , setappoitmentDoctor,selecteddSlot , setselectedSlot,selecteddDate , setselecteddDate}}>
      {children}
    </UserContext.Provider>
  );
};
