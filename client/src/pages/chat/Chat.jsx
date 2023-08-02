import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userChats } from "../../api/ChatRequest";
import ConversationComponent from "../../components/conversationComponent/ConversationComponent.jsx";
import Logo from "../../img/logo1.png";
import { UilCornerUpLeftAlt } from "@iconscout/react-unicons";
import "./Chat.css";
import ChatBoxComponent from "../../components/chatboxComponent/ChatBoxComponent";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.1.107:8800");
    socket.current.emit("add-new-user", user._id);
    socket.current.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.error();
      }
    };
    getChats();
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (message) => {
      setReceiveMessage(message);
      console.log("receive");
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const otherUserId = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === otherUserId);
    return online ? true : false;
  };
  return (
    <div className="Chat">
      <div className="Chat-Left">
        <div className="Chat-Left-Nav">
          <img src={Logo} alt="" className="Logo-icon" />
          <Link to="/home" className="back-home">
            <UilCornerUpLeftAlt />
          </Link>
        </div>
        <div className="Chat-Container">
          <h2>Messages</h2>
          <div className="Chat-list">
            {chats.map((chat) => {
              return (
                <div onClick={() => setCurrentChat(chat)}>
                  <ConversationComponent
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Chat-Right">
        <ChatBoxComponent
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
