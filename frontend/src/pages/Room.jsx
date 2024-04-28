import React, { useState, useEffect } from "react";
import RoomInfo from "../components/RoomInfo";
import WebSocketComponent from "../components/WebSocketComponent";
import { UserDetails } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState("");
  const { user, setUser } = UserDetails();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [roomName, setRoomName] = useState("");
  // fetching user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/user/", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          // Handle error response if needed
          console.log(data);
          return;
        }

        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  // logout handler
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  //createroom handler
  const handleCreateRoom = () => {
    if (showForm) setShowForm(false);
    else setShowForm(true);
  };

  //createroom api call
  const handleCreateButtonClick = async () => {
    try {
      await fetch("http://localhost:8000/rooms/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room_name: roomName }),
        credentials: "include",
      });
      setRoomName("");
      fetch("http://127.0.0.1:8000/rooms/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRooms(data);
        })
        .catch((error) => console.error("Error fetching rooms:", error));
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // room delete handler
  const handleDelete = async (room) => {
    try {
      await fetch(`http://localhost:8000/rooms/delete/${room.id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      fetch("http://127.0.0.1:8000/rooms/")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRooms(data);
        })
        .catch((error) => console.error("Error fetching rooms:", error));
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/rooms/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRooms(data);
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);
  return (
    <>
      <div className="flex flex-row w-full m-3 border-2 rounded-md overflow-hidden bg-zinc-800">
        <div className="w-72 text-white border border-black flex flex-col">
          {user ? (
            <div className="p-2 flex flex-row justify-between">
              <div className="capitalize w-10 h-10 grid place-content-center text-red-700 text-lg font-semibold rounded-full bg-white">
                {user.name ? user.name.charAt(0) : ""}
              </div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <></>
          )}
          <div className="p-2 flex flex-row justify-between">
            <div className="text-lg font-semibold">Rooms</div>
            {user && user.is_superuser && (
              <button
                className={`text-white px-3 py-1 rounded-md ${
                  showForm ? "bg-red-500" : " bg-blue-500"
                }`}
                onClick={handleCreateRoom}
              >
                {showForm ? "Cancel" : "Create Room"}
              </button>
            )}
          </div>
          {showForm && (
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Enter room name"
                className="bg-gray-700 rounded-lg m-1  p-2"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button
                className="text-white px-3 py-1 rounded-md bg-emerald-600 m-1"
                onClick={handleCreateButtonClick}
              >
                Done
              </button>
            </div>
          )}
          <div className="overflow-y-scroll flex-auto" id="room-list">
            {rooms.map((room) => (
              <div key={room.id} className="flex flex-row justify-between">
                <button onClick={() => setActiveRoom(room.room_name)}>
                  <RoomInfo room={room} />
                </button>
                {user && user.is_superuser && (
                  <button
                    className="bg-red-500 text-white px-3 m-2 rounded-md"
                    onClick={() => handleDelete(room)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {activeRoom !== "" ? (
          <WebSocketComponent roomName={activeRoom} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Room;
