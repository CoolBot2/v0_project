import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUser } from "../../redux/actions";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  // const dispatch = useDispatch();
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(`/user/${friendId}`);

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    // dispatch(getOneUser(friendId));
  }, [currentUser, conversation]);
  // const { userById } = useSelector((state) => state.userReducer);
  return (
    <div className="userlist">
      {"  "}

      <div className="friend">
        <img
          style={{
            background: "white",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
          src={user && user.pfp}
          alt=""
        />
        {user && user.userName}
      </div>
    </div>
  );
};

export default Conversation;
