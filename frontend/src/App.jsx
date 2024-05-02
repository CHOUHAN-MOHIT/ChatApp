// App.jsx
import React from "react";
import Room from "./pages/Room";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex h-screen bg-slate-800">
          <Routes>
            <Route path="/rooms" element={<Room />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
