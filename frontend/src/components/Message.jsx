import React from "react";
import { UserDetails } from "../context/UserContext";

const Message = ({ messageData }) => {
  const { user } = UserDetails();
  if (user && user.name === messageData.sender) {
    return (
      <div className="flex justify-end">
        <div className="flex flex-col bg-emerald-800 max-w-96 m-1 rounded-b-md rounded-l-md p-1">
          <div className="px-1">{messageData.message} </div>
          <div className="flex justify-end text-xs text-gray-500">
            {new Date(messageData.time).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="flex flex-col bg-gray-800 max-w-96 m-1 rounded-b-md rounded-r-md p-1">
        <div className="text-red-800 font-semibold capitalize">
          {messageData.sender}
        </div>
        <div className="px-1">{messageData.message} </div>
        <div className="flex justify-end text-xs text-gray-500">
          {new Date(messageData.time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;
