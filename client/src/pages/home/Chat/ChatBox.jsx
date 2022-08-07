// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
// import {
//   getConversations,
//   sendMessage,
//   showMessage,
// } from "../../../redux/actions";
// import "../../../assets/Chat.css";
// import clip from "../../../assets/paperclip.png";
// import FriendsBox from "./FriendsBox";
// const socket = io.connect("http://localhost:5000");
// const ChatBox = ({ socketA, userNamee }) => {
//   const [receivedMessage, setReceivedMessage] = useState([]);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const { usersList, loggedUser } = useSelector((state) => state.userReducer);

//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(showMessage());
//   // }, []);

//   // useEffect(() => {
//   //   socket.on("receive", (data) => {
//   //     dispatch(showMessage());
//   //     setReceivedMessage([...receivedMessage, data]);
//   //   });
//   // }, [socket]);
//   const handleSend = async (e) => {
//     e.preventDefault();

//     if (message.trim() !== "") {
//       const messageData = {
//         //friendId must be here
//         pfp: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png",
//         content: message,
//         author: usersList.userName,
//         date:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };
//       await socket.emit("send", messageData);
//       dispatch(sendMessage(messageData));
//       setMessage("");
//     }
//   };
//   const { loading, messagesList, errors } = useSelector(
//     (state) => state.messageReducer
//   );
//   // useEffect(() => {
//   //   socket.on("newUser", (data) => {
//   //     setUserName(data);
//   //   });
//   // }, [socket]);
//   return (
//     <div>
//       <body>
//         {currentChat ? (
//           <div className="chat-container">
//             <div className="chat-header">
//               <h3 className="chat-title">{} Mahmoud</h3>
//               {/* <img src="" alt="" />
//           <img src="" alt="" />
//           <img src="" alt="" /> */}
//             </div>
//             <form onSubmit={handleSend} action="">
//               <div className="messages-container">
//                 {messagesList.map((message) => {
//                   return (
//                     <div className="message-container">
//                       {/* {userName} */}
//                       <div className="pfp-container">
//                         <img className="pfp" src={message.pfp} alt="" />
//                       </div>
//                       <div className="author">{message.author}</div>

//                       <div className="date">{message.date}</div>
//                       <div className="message">{message.content}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="input-container">
//                 <button
//                   style={{
//                     backgroundColor: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                     transform: "translate(50px,0px)",
//                   }}
//                 >
//                   <img height="20px" src={clip} alt="" />
//                 </button>
//                 <input
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   type="text"
//                   className="input-bar"
//                   placeholder="Type a message..."
//                 />
//               </div>
//             </form>
//           </div>
//         ) : (
//           <span className="noConversation">
//             Open a conversation to start a chat.
//           </span>
//         )}
//       </body>
//       <div style={{ display: "none" }}>
//         <FriendsBox setCurrentChat={setCurrentChat} currentChat={currentChat} />
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
