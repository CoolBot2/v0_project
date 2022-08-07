import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getConversations, getProfile } from "../../redux/actions";
import { format } from "timeago.js";

import "../../assets/Chat.css";
import clip from "../../assets/paperclip.png";
import ChatBox from "./Chat/ChatBox";
import "../../assets/home.css";
import FriendsBox from "./Chat/FriendsBox";
import Conversation from "../../components/UI/Conversation";
import { io } from "socket.io-client";
import axios from "axios";

const Home = () => {
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { loggedUser } = useSelector((state) => state.userReducer);
  const scrollRef = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        content: data.content,
        author: data.senderId,
        date: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("join", usersList._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [socket]);
  const handleSend = async (e) => {
    e.preventDefault();

    // const messageData = {
    //   //friendId must be here
    //   conversationId: currentChat._id,
    //   content: message,
    //   author: usersList.userName,
    // };
    // // await socket.emit("send", messageData);
    // dispatch(sendMessage(messageData));
    const message = {
      conversationId: currentChat._id,
      content: newMessage,
      author: usersList.userName, //! this is the userName of the loggedUser
    };
    const receiverID = currentChat.members.find(
      (user) => user !== usersList._id
    );
    socket.current.emit("sendMessage", {
      senderId: usersList._id,
      receiverId: receiverID,
      content: newMessage,
    });

    try {
      const { data } = await axios.post("/message/sendMsg ", message);
      setMessage([...messages, data]);
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };
  const { messagesList } = useSelector((state) => state.messageReducer);
  // useEffect(() => {
  //   socket.on("newUser", (data) => {
  //     setUserName(data);
  //   });
  // }, [socket]);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.include(arrivalMessage.author) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const { loading, usersList, errors, isOnline, token } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const { conversations } = useSelector((state) => state.conversationReducer);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/showMsg/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [messages]);
  // useEffect(() => {
  //   dispatch(getAll());
  // }, []);

  useEffect(() => {
    dispatch(getConversations(usersList._id));
  }, []);

  return (
    <div>
      {!isOnline ? (
        <Navigate to="/login" />
      ) : (
        <div className="home">
          <div className="friendbox-container">
            <div
              style={{
                zIndex: "55",
                color: "black",
                fontSize: "30px",
                overflow: "auto",

                height: "752px",
                borderRight: "1px solid #e6e6e6",
              }}
            >
              <div>
                <input
                  type="text"
                  style={{
                    width: "100%",

                    height: "60px",
                  }}
                />
              </div>
              {conversations.map((conversation) => (
                <div
                  className="friend"
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                >
                  <Conversation
                    conversation={conversation}
                    currentUser={usersList}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatbox-container">
            <div>
              <body>
                {currentChat ? (
                  <div className="chat-container">
                    <div className="chat-header">
                      <h3 className="chat-title">{} Mahmoud</h3>
                      {/* <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" /> */}
                    </div>
                    <form onSubmit={handleSend} action="">
                      <div className="messages-container">
                        {messages.map((message) => {
                          return (
                            <div ref={scrollRef} className="message-container">
                              {/* {userName} */}
                              <div className="pfp-container">
                                <img
                                  className="pfp"
                                  src={usersList?.pfp}
                                  alt=""
                                />
                              </div>
                              <div className="author">{message?.author}</div>

                              <div className="date">{message.date}</div>
                              <div className="message">{message.content}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="input-container">
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                            transform: "translate(50px,0px)",
                          }}
                        >
                          <img height="20px" src={clip} alt="" />
                        </button>
                        <input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          type="text"
                          className="input-bar"
                          placeholder="Type a message..."
                        />
                      </div>
                    </form>
                  </div>
                ) : (
                  <span className="noConversation">
                    Open a conversation to start a chat.
                  </span>
                )}
              </body>
              <div style={{ display: "none" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
