// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAll, getConversations } from "../../../redux/actions";
// import "../../../assets/friends.css";
// import Conversation from "../../../components/UI/Conversation";
// const FriendsBox = ({ setCurrentChat, currentChat }) => {
//   const { loading, usersList, errors, token, isOnline, allUsers } = useSelector(
//     (state) => state.userReducer
//   );
//   const { conversations } = useSelector((state) => state.conversationReducer);

//   const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(getAll());
//   // }, []);
//   useEffect(() => {
//     dispatch(getConversations(usersList._id));
//   }, []);
//   console.log(currentChat);
//   return (
//     <div
//       style={{
//         zIndex: "55",
//         color: "black",
//         fontSize: "30px",
//         overflow: "auto",

//         height: "752px",
//         borderRight: "1px solid #e6e6e6",
//       }}
//     >
//       <div>
//         <input
//           type="text"
//           style={{
//             width: "100%",

//             height: "60px",
//           }}
//         />
//       </div>
//       {conversations.map((conversation) => (
//         <div
//           className="friend"
//           key={conversation._id}
//           onClick={() => setCurrentChat(conversation)}
//         >
//           <Conversation conversation={conversation} currentUser={usersList} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FriendsBox;
