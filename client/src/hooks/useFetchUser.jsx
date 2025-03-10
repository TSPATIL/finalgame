import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAsync, selectIsLogin, selectLoading } from "../Redux/features/Authentication/AuthenticationSlice";

export default function useFetchUser() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const isLogin = useSelector(selectIsLogin);

    useEffect(() => {
    const fetchUser = async () => {
      if (isLogin) {
        const response = await dispatch(getUserDetailsAsync());
        const data = response.payload;
      }
    }
    fetchUser();
  }, [isLogin])
  return 
}
