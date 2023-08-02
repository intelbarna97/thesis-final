import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import "./ChatBoxComponent.css";
import { format } from "timeago.js";
import { Tooltip } from "@mui/material";
import InputEmoji from "react-input-emoji";

const ChatBoxComponent = ({
  chat,
  currentUserId,
  setSendMessage,
  receiveMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();

  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error();
      }
    };
    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.error();
      }
    };
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  if (chat === null) {
    return <h2 className="chatwindow-empty">Select a conversation</h2>;
  }

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const message = {
      chatId: chat._id,
      senderId: currentUserId,
      text: newMessage,
    };

    try {
      if (newMessage.length > 0) {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);

        const receiverId = chat.members.find((id) => id !== currentUserId);
        setSendMessage({ ...message, receiverId });

        setNewMessage("");
      }
    } catch (error) {
      console.error();
    }
  };

  return (
    <div>
      <div className="chatwindow-container">
        <div className="chatwindow-header">
          <div className="follower">
            <div>
              <img
                src={
                  userData?.profilePicture
                    ? imageRoute + userData.profilePicture
                    : imageRoute + defaultProfilePicture
                }
                className="followerImage"
                alt=""
              />
              <div className="user-name">
                <span>{userData?.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="chatwindow-body">
          {messages.map((message) => {
            const date = new Date(message.createdAt).toLocaleDateString([], {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Tooltip title={date}>
                <div
                  ref={scroll}
                  className={
                    message.senderId === currentUserId
                      ? "message own"
                      : "message other"
                  }
                >
                  <span>{message.text}</span>
                  <span>{format(message.createdAt)}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
        <div className="chatwindow-sender">
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            maxLength={255}
          />
          <div className="send-button button" onClick={handleSendMessage}>
            Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxComponent;
