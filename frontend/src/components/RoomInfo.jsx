import React, { useContext } from 'react';
import { UserDetails } from '../context/UserContext';

const RoomInfo = ({ room }) => {
  return (
    <div className='my-3 px-2 flex flex-row'>
      <div className='capitalize w-8 h-8 grid place-content-center text-red-700 rounded-full bg-white'>{room.room_name ? room.room_name.charAt(0) : ''}</div>
      <div className='self-center px-2 capitalize'>{room.room_name}</div>
    </div>
  );
};

export default RoomInfo;
