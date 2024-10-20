import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import {
  signUpWithPassword,
  signInWithGoogle,
} from "../firebase/firebase-auth";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserAsync,
  resetStatus,
  selectLoading,
  selectStatus,
  selectUser,
} from "../Redux/features/Authentication/AuthenticationSlice";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const validateFullName = (name) => {
    const fullNameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+\s[A-Z][a-z]+$/;
    return fullNameRegex.test(name);
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!validateFullName(credentials.name)) {
      alert("Write full name");
    } else {
      const result = await signUpWithPassword(credentials);
      if (result && !result.error) {
        const resulttoken = await result.getIdToken()
        console.log(resulttoken)
        try {
          const userData = {
            name: credentials.name,
            email: result.email,
            password: credentials.password,
            image: result.photoURL,
            userType: "student",
            token: resulttoken
          };
          const response = await dispatch(createUserAsync(userData));
          alert("User created successfully");
        } catch (error) {
          alert("Error occured");
          console.error(error);
        }
      } else {
        console.error("User Sign-up failed:", result.error);
      }
    }
  };
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);
  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result && !result.error) {
      try {
        const response = await dispatch(createUserAsync(credentials));
        alert("User created successfully");
      } catch (error) {
        alert("Error occured");
        console.error(error);
      }
    } else {
      console.error("Google Sign-In failed:", result.error);
    }
  };
//   console.log(user);
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#D06D6D]">
      <div className="flex justify-end items-center">
        <div className="">
          <img
            src="./login.png"
            alt=""
            className="w-[950px] h-[425px] absolute bottom-0 left-[60px]"
          />
          <div className="absolute w-[600px] h-[255px] top-[99px] left-[101px]">
            <div className="absolute w-[588px] top-0 left-5 font-serif font-medium text-black text-[115px] leading-[normal] whitespace-nowrap shadow-drop-shadow-100">
              Qᵘᵉʳʸ ᶜʳᵃᶠᵗ
            </div>
            <div className="absolute w-[528px] top-[100px] font-serif left-[325px] text-black text-[30px] font-bold tracking-[0] leading-[normal]">
              The Hogwarts Enigma
            </div>
          </div>
        </div>
        <div className="login-side w-[45%] h-screen bg-[#EDC6C6]">
          {!loading ? (
            <div className="flex justify-center items-center flex-col h-full">
              <h1 className="text-3xl font-bold mb-7">Create your Account</h1>
              <div
                onClick={handleGoogleLogin}
                className="cursor-pointer flex justify-center items-center w-[370px] mb-3 space-x-3 border-[2px] border-solid rounded-md px-3 py-2 border-black hover:scale-[0.99] transition duration-150 hover:shadow-md"
              >
                <FcGoogle className="text-2xl" />
                <span className="font-bold">Continue with Google</span>
              </div>
              <div className="flex justify-center items-center my-5">
                <p>------</p>
                <p>&nbsp;or Sign up with Email&nbsp;</p>
                <p>------</p>
              </div>
              <form className="w-fit space-y-3" onSubmit={handleOnSubmit}>
                <div className="flex justify-center items-start flex-col">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    value={credentials.name}
                    onChange={handleInputChange}
                    required
                    id="name"
                    placeholder="first middle last"
                    name="name"
                    className="w-[370px] px-3 py-2 outline-none border-black rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                  />
                </div>
                <div className="flex justify-center items-start flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    id="email"
                    required
                    placeholder="xyz@gmail.com"
                    name="email"
                    className="w-[370px] px-3 py-2 outline-none border-black rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                  />
                </div>
                <div className="flex justify-center items-start flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    id="password"
                    required 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}"
                    title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                    placeholder="Password"
                    name="password"
                    className="w-[370px] px-3 py-2 outline-none border-black rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#7f265b] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                >
                  Create Account
                </button>
              </form>
              <div className="mt-5">
                <p>
                  Already have account?{" "}
                  <Link to="/login" className="text-[#7f265b]">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
