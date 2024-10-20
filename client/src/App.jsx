import "./App.css";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Signup from "./components/Signup";
import { WelcomeNotice1 } from "./components/WelcomeNotice1";
import { WelcomeNotice2 } from "./components/WelcomeNotice2";
import Loading from "./components/Loading";
import LetterNotice from "./components/LetterNotice";
import Alert from "./components/Alert";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import GameEditor from "./components/GameEditor";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminChangePassword from "./components/AdminChangePassword";
import CreateQuiz from "./components/CreateQuiz";

function App() {
  return (
    <>
      <Router>
        {/* <Alert/> */}
        <Routes>
          <Route exact path="/user/login" element={<Login/>}></Route>
          <Route exact path="/user/signup" element={<Signup/>}></Route>
          <Route exact path="/user/welcomenotice1" element={<WelcomeNotice1/>}></Route>
          <Route exact path="/user/welcomenotice2" element={<WelcomeNotice2/>}></Route>
          <Route exact path="/user/loading" element={<Loading/>}></Route>
          <Route exact path="/user/notice" element={<LetterNotice/>}></Route>
          <Route exact path="/user/contact" element={<Contact/>}></Route>
          <Route exact path="/user/profile" element={<Profile/>}></Route>
          <Route exact path="/user/editor" element={<GameEditor/>}></Route>
          <Route exact path="/admin/admin-dashboard" element={<AdminDashboard/>}></Route>
          <Route exact path="/admin/admin-login" element={<AdminLogin/>}></Route>
          <Route exact path="/admin/admin-signup" element={<AdminSignup/>}></Route>
          <Route exact path="/admin/change-password" element={<AdminChangePassword/>}></Route>
          <Route exact path="/admin/create-quiz" element={<CreateQuiz/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
