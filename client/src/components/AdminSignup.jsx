import React, { useState } from "react";
import {
    Link,
    useNavigate
} from 'react-router-dom'
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createAdminAsync, selectIsLogin, selectLoading } from "../Redux/features/Authentication/AuthenticationSlice";
import AdminNavbar from "./AdminNavbar";
import { showAlert } from "../Redux/features/Alerts/AlertSlice";
import { signUpWithPassword } from "../firebase/firebase-auth";

export default function AdminSignup() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "" });
    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const validateFullName = (name) => {
        const fullNameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+\s[A-Z][a-z]+$/;
        return fullNameRegex.test(name);
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!validateFullName(credentials.name.trim())) {
            dispatch(showAlert({ message: "Write full name", type: "info" }));
        } else {
            const result = await signUpWithPassword(credentials);
            if (result && !result.error) {
                const resulttoken = await result.getIdToken()
                try {
                    const adminDetails = {
                        name: credentials.name.trim(),
                        email: result.email.trim(),
                        password: credentials.password,
                        uid: result.uid,
                        userType: "admin",
                        token: resulttoken,
                        refreshToken: result.refreshToken
                    };
                    const response = await dispatch(createAdminAsync(adminDetails));
                    if (response.error) {
                        throw new Error(response.error);
                    }
                    navigate('/admin/admin-dashboard');
                    // alert("User created successfully");
                    dispatch(showAlert({ message: "User Sign-up Successful", type: "success" }));
                } catch (error) {
                    // dispatch({message: "Error occured", type: "error"});
                    dispatch(showAlert({ message: "User Sign-up failed", type: "error" }));
                    console.error(error);
                }
            } else {
                console.error("User Sign-up failed:", result.error);
                dispatch(showAlert({ message: "User Sign-up failed", type: "error" }));
            }
        }
    };

    return (
        <div className="AdminSignup">
            <AdminNavbar />
            <div className="bg-gray-800 w-full min-h-screen flex items-center justify-center pt-28 pb-10 md:pt-16 md:pb-16">
                <div className="w-full min-h-full z-10 relative top-0 md:left-0 md:ml-[300px] flex justify-center items-center flex-col">
                    {
                        !loading
                            ?
                            <div className="p-4 text-white h-full rounded-md">
                                <div className="flex justify-center items-center flex-col h-full">
                                    <h1 className="text-3xl font-bold mb-5">Create your Account</h1>
                                    <form className="w-fit space-y-5" onSubmit={handleOnSubmit}>
                                        <div className="flex justify-center items-start flex-col space-y-2">
                                            <label htmlFor="password">Name</label>
                                            <input
                                                type="test"
                                                id="name"
                                                name="name"
                                                required
                                                value={credentials.name}
                                                onChange={handleInputChange}
                                                placeholder="Full Name"
                                                className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                                            />
                                        </div>
                                        <div className="flex justify-center items-start flex-col space-y-2">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={credentials.email}
                                                onChange={handleInputChange}
                                                required
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
                                                value={credentials.password}
                                                onChange={handleInputChange}
                                                required
                                                title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                                placeholder="Password"
                                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}"
                                                className="w-[370px] px-3 py-2 outline-none border-[gold] rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-[#b9207c] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                                        >
                                            Signup
                                        </button>
                                    </form>
                                    <div className="mt-5">
                                        <p>
                                            Already have account?{" "}
                                            <Link to="/admin/admin-login" className="text-[#f134a6]">
                                                Login here
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
