// App.jsx
import React from "react";
import Room from "./pages/Room";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="flex h-screen bg-slate-800">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Room />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
