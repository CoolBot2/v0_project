import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assets/Convo.css";
const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
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
        <div className="profile-img">
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
        </div>
        <div className="friend-name">{user && user.userName}</div>
      </div>
    </div>
  );
};

export default Conversation;
