import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogin, selectLoading } from "../Redux/features/Authentication/AuthenticationSlice";

export default function AdminChangePassword() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isLogin = useSelector(selectIsLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="AdminChangePassword">
      <AdminNavbar />
      <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
        <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
          {
            !loading
              ?
              <div className="p-4 text-white h-full rounded-md">
                <div className="flex justify-center items-center flex-col h-full">
                  <h1 className="text-3xl font-bold mb-5">Change Password</h1>
                  <form className="w-fit space-y-5" onSubmit={handleSubmit}>
                    <div className="flex justify-center items-start flex-col space-y-2">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleOnChange}
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
                        onChange={handleOnChange}
                        title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                        placeholder="Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}"
                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col space-y-2">
                      <label htmlFor="password">Confirm Password</label>
                      <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        required
                        value={credentials.cpassword}
                        onChange={handleOnChange}
                        placeholder="Full Name"
                        className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#b9207c] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                    >
                      Change Password
                    </button>
                  </form>
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
