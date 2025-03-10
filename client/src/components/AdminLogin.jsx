import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate
} from 'react-router-dom'
import { getUserDetailsAsync, loginAdminAsync, selectIsLogin, selectLoading } from "../Redux/features/Authentication/AuthenticationSlice";
import Spinner from "./Spinner";
import { signInWithPassword, signOutUser } from "../firebase/firebase-auth";
import { showAlert } from "../Redux/features/Alerts/AlertSlice";
import AdminNavbar from "./AdminNavbar";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isLogin = useSelector(selectIsLogin);

  
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleInputChange = (e) => {
    if (e.target.type !== "checkbox")
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    else setCredentials({ ...credentials, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (isLogin) {
        try {
          const response = await dispatch(getUserDetailsAsync());
          const data = response.payload;
          if (data.error === "Unauthorized: No auth token found" || data.error === 'Session expired. Please log in again.') {
            dispatch(logout());
            const result = await signOutUser();
            if (result.status) {
              dispatch(showAlert({ message: "Session expired. Please log in again.", type: "info" }));
              navigate('/')
            } else {
              dispatch(showAlert({ message: "User logged out failed", type: "error" }));
            }
          }
          else if (data.status === false) {
            dispatch(showAlert({ message: data.error, type: "error" }));
          }
          else {
            console.log(data);
          }
        } catch (error) {
          dispatch(showAlert({ message: error.message, type: "error" }));
        }
      }
    }
    fetchUser();
  }, [isLogin])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await signInWithPassword(credentials);
    if (result && !result.error) {
      const resulttoken = await result.getIdToken();
      try {
        const userData = {
          email: result.email,
          password: credentials.password,
          userType: "admin",
          token: resulttoken,
          uid: result.uid,
          refreshToken: result.refreshToken
        }
        const response = await dispatch(loginAdminAsync(userData));
        if (response.error) {
          throw new Error(response.error);
        }
        dispatch(showAlert({ message: "User Sign-in successful", type: "success" }));
        navigate('/admin/admin-dashboard')
      } catch (error) {
        dispatch(showAlert({ message: "User Sign-in failed", type: "error" }));
        console.error(error);
      }
    } else {
      dispatch(showAlert({ message: "User Sign-in failed", type: "error" }));
    }
  };


  return (
    <div className="AdminLogin">
      <AdminNavbar />
      <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
        <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
          {
            !loading
              ?
              <div className="p-4 text-white h-full rounded-md">
                <div className="flex justify-center items-center flex-col h-full">
                  <h1 className="text-3xl font-bold mb-7">Login to your Account</h1>
                  <form className="w-fit space-y-5" onSubmit={handleOnSubmit}>
                    <div className="flex justify-center items-start flex-col space-y-2">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={credentials.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col space-y-2">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={credentials.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-x-1">
                        <input id="remember" type="checkbox" name="remember" checked={credentials.remember} onChange={handleInputChange} />
                        <label htmlFor="remember">Remember me</label>
                      </div>
                      <div>
                        <a href="" className="text-[#9f6161]">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#b9207c] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                    >
                      Login
                    </button>
                  </form>
                  <div className="mt-5">
                    <p>
                      Not Registered Yet?{" "}
                      <Link to="/admin/admin-signup" className="text-[#f134a6]">
                        Create an Account
                      </Link>
                    </p>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              :
              <div className="flex justify-center items-center h-screen">
                <Spinner fontSize="60px" color="white" />
              </div>
          }
        </div>
      </div>
    </div>
  );
}
