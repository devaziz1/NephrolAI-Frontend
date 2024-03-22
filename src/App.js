import "./App.css";


import DoctorView from "./AdminComponents/DoctorView";
import AdminPanel from "./AdminComponents/AdminPanel";
import LoginPage from "./AdminComponents/LoginPage";
import LandingPage from "./PatientComponents/LandingPage";
import PatientLogin from "./PatientComponents/PatientLogin";
import AppointmentSchedule from "./PatientComponents/AppointmentSchedule";
import Schedule from "./DoctorComponents/Schedule";
import Next from "./PatientComponents/Next";
import { Route, Routes, Navigate } from "react-router-dom";
import Test from "./Test";
import PatientSignup from "./PatientComponents/PatientSignup";
import PatientHome from "./PatientComponents/PatientHome";
import DoctorLogin from "./DoctorComponents/DoctorLogin";
import DoctorHome from "./DoctorComponents/DoctorHome";
import PatientFeedback from "./PatientComponents/PatientFeedback";
import PatientComplaint from "./PatientComponents/PatientComplaint";
import Appointments from "./PatientComponents/Appointments";
import BookAppointment from "./PatientComponents/BookAppointment";
import DoctorAppointments from "./DoctorComponents/DoctorAppointments";
import DoctorPrescription from "./DoctorComponents/DoctorPrescription";
import DoctorComplaint from "./DoctorComponents/DoctorComplaint";
import PatientPrescription from "./PatientComponents/PatientPrescription";
import UploadCT from "./PatientComponents/UploadCT";
import PatientReport from "./PatientComponents/PatientReport";
import Page404 from "./Page404";
import PatientProfile from "./PatientComponents/PatientProfile";
import DoctorReports from "./DoctorComponents/DoctorReports";
import Feedback from "./DoctorComponents/Feedback";
import PatientVideoCall from "./PatientComponents/PatientVideoCall";
import DoctorVideoCall from "./DoctorComponents/DoctorVideoCall";
import DoctorProfile from "./DoctorComponents/DoctorProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/LandingPage" />} />
        <Route path="/*" element={<Page404 />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/pLogin" element={<PatientLogin />} />
        <Route path="/pSignUp" element={<PatientSignup />} />
        <Route path="/pHome/" element={<PatientHome />}>
          <Route path="*" element={<Page404 />} />
          <Route path="Appiontment/" element={<Appointments />} />
          <Route path="BA" element={<BookAppointment />} />
          <Route path="VC" element={<PatientVideoCall />} />
          <Route path="UCT" element={<UploadCT />} />
          <Route path="MR" element={<PatientReport />} />
          <Route path="FB" element={<PatientFeedback />} />
          <Route path="PS" element={<PatientPrescription />} />
          <Route path="SComplaint" element={<PatientComplaint />} />
          <Route path="pProfile" element={<PatientProfile />} />

        </Route>
        <Route path="/dLogin" element={<DoctorLogin />} />
        <Route path="/test" element={<Test />} />

        <Route path="/dHome/" element={<DoctorHome />}>
          <Route path="*" element={<Page404 />} />
          <Route path="dAppointments" element={<DoctorAppointments />} />
          <Route path="dSchedule" element={<Schedule />} />
          <Route path="MR" element={<DoctorReports />} />
          <Route path="dVC" element={<DoctorVideoCall/>} />
          <Route path="dPS" element={<DoctorPrescription />} />
          <Route path="FB" element={<Feedback/>} />
          <Route path="dRP" element={<DoctorHome />} />
          <Route path="dComplaint" element={<DoctorComplaint />} />
          <Route path="dProfile" element={<DoctorProfile/>} />

        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminboard/*" element={<AdminPanel />} />
      </Routes>

      {/* <Test/>  */}
    </div>
  );
}

export default App;

{
}

