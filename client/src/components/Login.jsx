import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithPassword,
  signInWithGoogle,
} from "../firebase/firebase-auth";
import { useSelector, useDispatch } from "react-redux";
import {
  googleLoginUserAsync,
  loginUserAsync,
  resetStatus,
  selectLoading,
  selectStatus,
  selectUser,
} from "../Redux/features/Authentication/AuthenticationSlice";
import Spinner from "./Spinner";
import { showAlert } from "../Redux/features/Alerts/AlertSlice";
import Footer from "./Footer";

export default function Login() {
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await signInWithPassword(credentials);
    if (result && !result.error) {
        const resulttoken = await result.getIdToken();
      try {
        const userData = {
          email: result.email,
          password: credentials.password,
          userType: "student",
          token: resulttoken,
          uid: result.uid,
          refreshToken: result.refreshToken
        }
        const response = await dispatch(loginUserAsync(userData));
        if(response.error){
          throw new Error(response.error);
        }
        dispatch(showAlert({message: "User Sign-in successful", type: "success"}));
        navigate('/')
      } catch (error) {
        dispatch(showAlert({message: "User Sign-in failed", type: "error"}));
        console.error(error);
      }
    } else {
      // alert("User Sign-In failed:", result.error);
      dispatch(showAlert({message: "User Sign-in failed", type: "error"}));
    }
  };

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    console.log(result);
    if (result && !result.error) {
      const resulttoken = await result.getIdToken();
      try {
        const userData = {
          name: result.displayName,
          email: result.email,
          userType: "student",
          uid: result.uid,
          token: resulttoken,
          refreshToken: result.refreshToken
        };
        console.log(userData)
        const response = await dispatch(googleLoginUserAsync(userData));
        if(response.error){
          throw new Error(response.error);
        }
        dispatch(showAlert({message: "User Sign-in successful", type: "success"}));
        navigate('/')
      } catch (error) {
        dispatch(showAlert({message: "User Sign-in failed", type: "error"}));
        // alert("Error occured");
        console.error(error);
      }
    } else {
      console.error("Google Sign-In failed:", result.error);
      dispatch(showAlert({message: "User Sign-in failed", type: "error"}));
    }
  };
  return (
    <div className="w-full h-full overflow-hidden bg-[#D06D6D]">
      <div className="flex justify-end items-center w-full h-full">
        <div className="w-[56%] h-full">
          <img
            src="./login.png"
            alt=""
            className="w-[950px] h-[425px] absolute bottom-0 left-[60px]"
          />
          <div className="absolute w-[600px] h-[255px] top-[99px] left-[101px]">
            <div className="absolute w-[588px] top-0 left-0 [-webkit-text-stroke:2px_#000000] font-medium text-black text-[120px] tracking-[0] leading-[normal] whitespace-nowrap shadow-drop-shadow-100">
              Qᵘᵉʳʸ ᶜʳᵃᶠᵗ
            </div>
            <div className="absolute w-[528px] top-[100px] left-[375px] text-black text-[30px] font-bold tracking-[0] leading-[normal]">
              The Hogwarts Enigma
            </div>
          </div>
        </div>
        <div className="login-side w-[44%] h-screen bg-[#EDC6C6]">
          {!loading ? (
            <div className="flex justify-center items-center flex-col h-full">
              <h1 className="text-3xl font-bold mb-7">Login to your Account</h1>
              <div
                onClick={handleGoogleLogin}
                className="cursor-pointer flex justify-center items-center w-[370px] mb-3 space-x-3 border-[2px] border-solid rounded-md px-3 py-2 border-black hover:scale-[0.99] transition duration-150 hover:shadow-md"
              >
                <FcGoogle className="text-2xl" />
                <span className="font-bold">Continue with Google</span>
              </div>
              <div className="flex justify-center items-center my-5">
                <p>------</p>
                <p>&nbsp;or Sign in with Email&nbsp;</p>
                <p>------</p>
              </div>
              <form className="w-fit space-y-3" onSubmit={handleOnSubmit}>
                <div className="flex justify-center items-start flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                    required
                    className="w-[370px] px-3 py-2 outline-none border-black rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                  />
                </div>
                <div className="flex justify-center items-start flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                    className="w-[370px] px-3 py-2 outline-none border-black rounded-md bg-transparent border-2 border-solid focus:shadow-lg"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-x-1">
                    <input
                      id="remember"
                      checked={credentials.remember}
                      type="checkbox"
                      name="remember"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <div>
                    <a href="" className="text-[#594a4a]">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#7f265b] w-[370px] px-2 py-2 rounded-md font-bold text-white"
                >
                  Login
                </button>
              </form>
              <div className="mt-5">
                <p>
                  Not Registered Yet?{" "}
                  <Link to="/signup" className="text-[#7f265b]">
                    Create an Account
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <Spinner fontSize="60px" />
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
