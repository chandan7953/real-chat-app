import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import { BASE_URL } from "../main";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const userId = authUser._id;
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          headers: {
            "User-ID": userId,
          },
        });
        // store
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
