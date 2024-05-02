import React from "react";

const Topic = ({ messageData }) => {
  return (
    <div className="bg-neutral-800 sticky top-0 z-10">
    <div className="bg-zinc-700 text-white py-1 px-2 flex justify-center w-fit mx-auto my-2 rounded">
      <span className="font-semibold mx-1">Topic:</span>
      {messageData.message}
    </div></div>
  );
};

export default Topic;
