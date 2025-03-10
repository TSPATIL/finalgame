import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { Suspense, lazy } from "react";

const Signup = lazy(()=>import("./components/Signup"));
const WelcomeNotice1 = lazy(()=>import("./components/WelcomeNotice1"));
const WelcomeNotice2 = lazy(()=>import("./components/WelcomeNotice2"));
const Loading = lazy(()=>import("./components/Loading"));
const LetterNotice = lazy(()=>import("./components/LetterNotice"));
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
const ViewQuiz = lazy(()=>import("./components/ViewQuiz"));
const ViewQuizDetails = lazy(()=>import("./components/ViewQuizDetails"));
import Alert from "./components/Alert";
// import Signup from "./components/Signup";
// import { WelcomeNotice1 } from "./components/WelcomeNotice1";
// import { WelcomeNotice2 } from "./components/WelcomeNotice2";
// import Loading from "./components/Loading";
// import LetterNotice from "./components/LetterNotice";
// import Contact from "./components/Contact";
// import Profile from "./components/Profile";
// import GameEditor from "./components/GameEditor";
// import AdminDashboard from "./components/AdminDashboard";
// import AdminLogin from "./components/AdminLogin";
// import AdminSignup from "./components/AdminSignup";
// import AdminChangePassword from "./components/AdminChangePassword";
// import CreateQuiz from "./components/CreateQuiz";
// import Landingpage from "./components/Landingpage";
// import Pagenotfound from "./components/Pagenotfound";
// import UpdateQuiz from "./components/UpdateQuiz";
// import ViewQuiz from "./components/ViewQuiz";
// import ViewQuizDetails from "./components/ViewQuizDetails";

function App() {
  return (
    <>
      <Router>
        <Alert/>
        <Routes>
          <Route exact path="/" element={<Suspense fallback={<div>Component1 are loading please wait...</div>}><Landingpage/></Suspense>}></Route>
          <Route exact path="/login" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Login/></Suspense>}></Route>
          <Route exact path="/signup" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Signup/></Suspense>}></Route>
          <Route exact path="/welcomenotice1" element={<Suspense fallback={<div>Component is loading please wait...</div>}><WelcomeNotice1/></Suspense>}></Route>
          <Route exact path="/welcomenotice2" element={<Suspense fallback={<div>Component is loading please wait...</div>}><WelcomeNotice2/></Suspense>}></Route>
          <Route exact path="/loading" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Loading/></Suspense>}></Route>
          <Route exact path="/notice" element={<Suspense fallback={<div>Component is loading please wait...</div>}><LetterNotice/></Suspense>}></Route>
          <Route exact path="/contact" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Contact/></Suspense>}></Route>
          <Route exact path="/user/profile" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Profile/></Suspense>}></Route>
          <Route exact path="/user/editor" element={<Suspense fallback={<div>Component is loading please wait...</div>}><GameEditor/></Suspense>}></Route>
          <Route exact path="/admin/admin-dashboard" element={<Suspense fallback={<div>Component is loading please wait...</div>}><AdminDashboard/></Suspense>}></Route>
          <Route exact path="/admin/admin-login" element={<Suspense fallback={<div>Component is loading please wait...</div>}><AdminLogin/></Suspense>}></Route>
          <Route exact path="/admin/admin-signup" element={<Suspense fallback={<div>Component is loading please wait...</div>}><AdminSignup/></Suspense>}></Route>
          <Route exact path="/admin/change-password" element={<Suspense fallback={<div>Component is loading please wait...</div>}><AdminChangePassword/></Suspense>}></Route>
          <Route exact path="/admin/create-quiz" element={<Suspense fallback={<div>Component is loading please wait...</div>}><CreateQuiz/></Suspense>}></Route>
          <Route exact path="/admin/update-quiz/:id/:type" element={<Suspense fallback={<div>Component is loading please wait...</div>}><UpdateQuiz/></Suspense>}></Route>
          <Route exact path="/admin/view-quiz/" element={<Suspense fallback={<div>Component is loading please wait...</div>}><ViewQuiz/></Suspense>}></Route>
          <Route exact path="/admin/view-quiz-details/:id/:type" element={<Suspense fallback={<div>Component is loading please wait...</div>}><ViewQuizDetails/></Suspense>}></Route>
          <Route exact path="*" element={<Suspense fallback={<div>Component is loading please wait...</div>}><Pagenotfound/></Suspense>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
