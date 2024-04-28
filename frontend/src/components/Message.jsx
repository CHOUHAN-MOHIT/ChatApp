import React from "react";
import { UserDetails } from "../context/UserContext";

const Message = ({messageData}) => {
  const {user} = UserDetails();
  if(user && user.name === messageData.sender){
    return (
      <div className="flex justify-end">
      <div className="flex flex-col bg-emerald-800 max-w-96 m-1 rounded-b-md rounded-l-md p-1">
        <div className="px-2 pt-2">{messageData.message} </div>
        <div className="flex justify-end text-xs text-gray-500 px-2 py-1">
          07:45
        </div>
      </div>
    </div>
  );
  }
  return (
      <div className="flex justify-start">
      <div className="flex flex-col bg-gray-800 max-w-96 m-1 rounded-b-md rounded-l-md p-1">
        <div className="px-2 pt-2">{messageData.message} </div>
        <div className="flex justify-end text-xs text-gray-500 px-2 py-1">
          07:45
        </div>
      </div>
    </div>
  );
};

export default Message;
