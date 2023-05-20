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
import Welcome from "./pages/Welcome";
import AssesmentTest from "./pages/assesmenttest/AssesmentTest";
import Interview from "./pages/interview/Interview";
import EditInterview from "./pages/interview/EditInterview";
import ViewInterview from "./pages/interview/ViewInterview";
import Interviewer from "./pages/interviewer/Interviewer";
import OfferLetter from "./pages/offerletter/OfferLetter";
import CreateApplicant from "./pages/applicants/CreateApplicant";
import EditApplicant from "./pages/applicants/EditApplicant";
import ViewApplicant from "./pages/applicants/ViewApplicant";
import CreateInterview from "./pages/interview/CreateInterview";
import CreateInterviewer from "./pages/interviewer/CreateInterviewer";
import EditInterviewer from "./pages/interviewer/EditInterviewer";
import CreateAT from "./pages/assesmenttest/CreateAT";
import CreateOfferLetter from "./pages/offerletter/CreateOfferletter";
import ApplicantLayout from "./layouts/ApplicantLayout";
import AssesmentTestLayout from "./layouts/AssesmentTestLayout";
import InterviewLayout from "./layouts/InterviewLayout";
import InterviewerLayout from "./layouts/InterviewerLayout";
import OfferLetterLayout from "./layouts/OfferLetterLayout";

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

        <Route path="interview" element={<InterviewLayout />}>
          <Route index element={<Interview />} />
          <Route path="createinterview" element={<CreateInterview />} />
          <Route path="editinterview/:id" element={<EditInterview />} />
          <Route path="viewinterview/:id" element={<ViewInterview />} />
        </Route>

        <Route path="interviewer" element={<InterviewerLayout />}>
          <Route index element={<Interviewer />} />
          <Route path="createinterviewer" element={<CreateInterviewer />} />
          <Route path="editinterviewer/:id" element={<EditInterviewer />} />
        </Route>

        <Route path="offerletter" element={<OfferLetterLayout />}>
          <Route index element={<OfferLetter />} />
          <Route path="createofferletter" element={<CreateOfferLetter />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
