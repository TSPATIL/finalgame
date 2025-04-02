import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Suspense, lazy } from "react";

const Signup = lazy(()=>import("./components/Signup"));
const Contact = lazy(()=>import("./components/Contact"));
const Profile = lazy(()=>import("./components/Profile"));
const GameEditor = lazy(()=>import("./components/GameEditor"));
const CreateQuiz = lazy(()=>import("./components/CreateQuiz"));
const AdminChangePassword = lazy(()=>import("./components/AdminChangePassword"));
const AdminSignup = lazy(()=>import("./components/AdminSignup"));
const AdminLogin = lazy(()=>import("./components/AdminLogin"));
const AdminDashboard = lazy(()=>import("./components/AdminDashboard"));
const Landingpage = lazy(()=>import("./components/Landingpage"));
const Pagenotfound = lazy(()=>import("./components/Pagenotfound"));
const UpdateQuiz = lazy(()=>import("./components/UpdateQuiz"));
const ViewQuizAdmin = lazy(()=>import("./components/ViewQuizAdmin"));
const ViewQuizUser = lazy(()=>import("./components/ViewQuizUser"));
const ViewQuizDetails = lazy(()=>import("./components/ViewQuizDetails"));
const Report = lazy(()=>import("./components/Report"));
const ViewContacts = lazy(()=>import("./components/ViewContacts"));
const ViewFeedback = lazy(()=>import("./components/ViewFeedback"));
const About = lazy(()=>import("./components/About"));
import Alert from "./components/Alert";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
      <Router>
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Landingpage/></Suspense>}></Route>
          <Route exact path="/login" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Login/></Suspense>}></Route>
          <Route exact path="/signup" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Signup/></Suspense>}></Route>
          <Route exact path="/about" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><About/></Suspense>}></Route>
          <Route exact path="/contact" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Contact/></Suspense>}></Route>
          <Route exact path="/user/profile" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Profile/></Suspense>}></Route>
          <Route exact path="/user/editor/:id" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><GameEditor/></Suspense>}></Route>
          <Route exact path="/user/view-quiz" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><ViewQuizUser/></Suspense>}></Route>
          <Route exact path="/admin/admin-dashboard" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><AdminDashboard/></Suspense>}></Route>
          <Route exact path="/admin/admin-login" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><AdminLogin/></Suspense>}></Route>
          <Route exact path="/admin/admin-signup" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><AdminSignup/></Suspense>}></Route>
          <Route exact path="/admin/change-password" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><AdminChangePassword/></Suspense>}></Route>
          <Route exact path="/admin/create-quiz" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><CreateQuiz/></Suspense>}></Route>
          <Route exact path="/admin/update-quiz/:id/:type" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><UpdateQuiz/></Suspense>}></Route>
          <Route exact path="/admin/view-quiz/" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><ViewQuizAdmin/></Suspense>}></Route>
          <Route exact path="/admin/view-quiz-details/:id/:type" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><ViewQuizDetails/></Suspense>}></Route>
          <Route exact path="/admin/view-contacts" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><ViewContacts/></Suspense>}></Route>
          <Route exact path="/admin/view-feedbacks" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><ViewFeedback/></Suspense>}></Route>
          <Route exact path="/report/:id" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Report/></Suspense>}></Route>
          <Route exact path="*" element={<Suspense fallback={<div className="flex justify-center items-center bg-white w-screen h-screen"><Spinner/></div>}><Pagenotfound/></Suspense>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
