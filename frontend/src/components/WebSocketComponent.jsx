import React, { useState, useEffect, useRef } from "react";
import sendLogo from "../assets/icons8-send-60.png";
import Message from "./Message";
import { UserDetails } from "../context/UserContext";
import Topic from "./Topic";

const WebSocketComponent = ({ roomName }) => {
  const [socket, setSocket] = useState(null);
  const [type, setType] = useState("msg");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = UserDetails();

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/messages/${roomName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  // fetching messages
  useEffect(() => {
    fetchMessages();
    console.log("onfetch:",messages);

  }, [roomName]);

  // web socket handling
  useEffect(() => {
    const websocketProtocol = "ws";
    const wsEndpoint = `${websocketProtocol}://127.0.0.1:8000/ws/notification/${roomName}/`;
    const newSocket = new WebSocket(wsEndpoint);

    newSocket.onopen = () => {
      console.log("WebSocket connection opened!");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      fetchMessages();
      // const messageData = JSON.parse(event.data);
      // const { message, sender } = messageData.message;
      // const time = new Date();
      // const newMessage = { message, sender, msgType, time };
      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      // console.log("onsend:",messages);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed!");
    };

    return () => {
      newSocket.close();
    };
  }, [roomName]);

  // to handle automatic scrolling to bottom whenever messeges changes state
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    scrollToBottom();
  }, [messages]);

  //handle message send
  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (socket && messageInput.trim() !== "") {
      socket.send(
        JSON.stringify({
          message: messageInput,
          room_name: roomName,
          sender: user.name,
          msgType: type,
        })
      );
      setMessageInput("");
      setType('msg');
    }
  }; 

  // handle topic add
  const addTopic = () => {
    if(type === 'msg')
      setType("topic");
    else
      setType('msg');
  };

  return (
    <div className="flex flex-col flex-auto text-white bg-neutral-800">
      <div className="py-3 px-2 flex flex-row border-b border-black bg-zinc-800">
        <div className="w-8 h-8 grid place-content-center text-red-700 rounded-full capitalize bg-white">
          {roomName ? roomName.charAt(0) : ""}
        </div>
        <div className="self-center px-2 font-semibold text-2xl">
          {roomName}
        </div>
      </div>
      <div
        className="text-white overflow-y-scroll flex-auto"
        id="chat-container"
      >
        {messages.map((messageData, index) =>
          messageData.type === "topic" ? (
            <Topic key={index} messageData={messageData}/>
          ) : (
            <Message messageData={messageData} key={index} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex flex-row ">
        {user && user.is_superuser && (
          <button
            className=
            {`px-2 m-1 rounded-lg ${
              type === 'msg' ? "bg-gray-700" : " bg-emerald-700"
            }`}
            onClick={addTopic}
          >
            Topic
          </button>
        )}
        <form
          id="message-form"
          className="flex flex-row bg-gray-700 rounded-lg m-1 flex-auto"
          onSubmit={handleMessageSubmit}
        >
          <input
            id="msg"
            className="px-3 flex-auto bg-transparent outline-none text-white"
            type="text"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
          />
          <button type="submit" className="max-h-10  max-w-10 mx-2 my-1">
            <img src={sendLogo} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebSocketComponent;
