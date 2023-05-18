import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LoginLayout from "./layouts/LoginLayout";
import HomeLayout from "./layouts/HomeLayout";
import CheckIfLogout from "./private/CheckIfLogout";
import CheckIfLogin from "./private/CheckIfLogin";
import Applicants from "./pages/applicants/Applicants";
import Experiences from "./pages/experience/Experiences";
import Welcome from "./pages/Welcome";
import AssesmentTest from "./pages/assesmenttest/AssesmentTest";
import Interview from "./pages/interview/Interview";
import Interviewer from "./pages/interviewer/Interviewer";
import OfferLetter from "./pages/offerletter/OfferLetter";
// import Position from "./pages/positions/Position";
// import ApplicantWithDetail from "./pages/applicantwad/ApplicantWithDetail";
// import ApplicantWithInterview from "./pages/applicantwi/ApplicantWithInterview";
// import ApplicantWithExperience from "./pages/applicantwe/ApplicantWithExperience";
import CreateApplicant from "./pages/applicants/CreateApplicant";
import EditApplicant from "./pages/applicants/EditApplicant";
import ViewApplicant from "./pages/applicants/ViewApplicant";
import CreateExperience from "./pages/experience/CreateExperience";
import CreateInterview from "./pages/interview/CreateInterview";
import CreateInterviewer from "./pages/interviewer/CreateInterviewer";
import CreateAT from "./pages/assesmenttest/CreateAT";
import CreateOfferLetter from "./pages/offerletter/CreateOfferletter";
import ApplicantLayout from "./layouts/ApplicantLayout";
import AssesmentTestLayout from "./layouts/AssesmentTestLayout";
import InterviewLayout from "./layouts/InterviewLayout";
import InterviewerLayout from "./layouts/InterviewerLayout";
import ExperienceLayout from "./layouts/ExperienceLayout";
import OfferLetterLayout from "./layouts/OfferLetterLayout";
// import CreatePosition from "./pages/positions/CreatePosition";
// import ApplicantWELayout from "./layouts/ApplicantWELayout";
// import ApplicantWILayout from "./layouts/ApplicantWILayout";
// import PositionLayout from "./layouts/PositionLayout";
// import ApplicantWADLayout from "./layouts/ApplicantWADLayout";
// import ApplicantLevel from "./pages/dropdown/ApplicantLevel";
// import ApplicantStatus from "./pages/dropdown/ApplicantStatus";
// import ApplicantTechnology from "./pages/dropdown/ApplicantTechnology";
// import InterviewStatus from "./pages/dropdown/InterviewStatus";
// import OfferLetterStatus from "./pages/dropdown/OfferLetterStatus";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<CheckIfLogin Component={<LoginLayout />} />} />
      <Route path="home" element={<CheckIfLogout Component={<HomeLayout />} />}>
        <Route index element={<Welcome />} />

        <Route path="applicant" element={<ApplicantLayout />}>
          <Route index element={<Applicants />} />
          <Route path="createapplicant" element={<CreateApplicant />} />
          <Route path="editapplicant/:id" element={<EditApplicant />} />
          <Route path="viewapplicant/:id" element={<ViewApplicant />} />
        </Route>

        <Route path="assesmenttest" element={<AssesmentTestLayout />}>
          <Route index element={<AssesmentTest />} />
          <Route path="createat" element={<CreateAT />} />
        </Route>

        <Route path="experience" element={<ExperienceLayout />}>
          <Route index element={<Experiences />} />
          <Route path="createexp" element={<CreateExperience />} />
        </Route>

        <Route path="interview" element={<InterviewLayout />}>
          <Route index element={<Interview />} />
          <Route path="createinterview" element={<CreateInterview />} />
        </Route>

        <Route path="interviewer" element={<InterviewerLayout />}>
          <Route index element={<Interviewer />} />
          <Route path="createinterviewer" element={<CreateInterviewer />} />
        </Route>

        <Route path="offerletter" element={<OfferLetterLayout />}>
          <Route index element={<OfferLetter />} />
          <Route path="createofferletter" element={<CreateOfferLetter />} />
        </Route>
        {/* 
        <Route path="awe" element={<ApplicantWELayout />}>
          <Route index element={<ApplicantWithExperience />} />
        </Route>

        <Route path="awi" element={<ApplicantWILayout />}>
          <Route index element={<ApplicantWithInterview />} />
        </Route> */}

        {/* <Route path="position" element={<PositionLayout />}>
          <Route index element={<Position />} />
          <Route path="createposition" element={<CreatePosition />} />
        </Route> */}

        {/* <Route path="awad" element={<ApplicantWADLayout />}>
          <Route index element={<ApplicantWithDetail />} />
        </Route> */}

        {/* DropDown Routes
        <Route path="applicantlevel" element={<ApplicantLevel />} />
        <Route path="applicantstatus" element={<ApplicantStatus />} />
        <Route path="applicanttechnology" element={<ApplicantTechnology />} />
        <Route path="interviewstatus" element={<InterviewStatus />} />
        <Route path="offerletterstatus" element={<OfferLetterStatus />} /> */}
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
