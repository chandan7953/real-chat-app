import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { BASE_URL } from "../main";

const useGetMessages = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = authUser._id;
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${BASE_URL}/api/v1/message/${selectedUser?._id}`,
          {
            headers: {
              "User-ID": userId,
            },
          }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
