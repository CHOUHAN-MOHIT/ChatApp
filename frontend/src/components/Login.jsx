import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    formError: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    isValid();
  }, [email, password]);

  const isValid = () => {
    let flag = true;
    setError((prevState) => ({
      ...prevState,
      email: email ? "" : "Email is required.",
      password: password ? "" : "Password is required.",
    }));
    flag = email && password;
    return flag;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError({
          formError: data.error || "An error occurred during login.",
          password: "",
          email: "",
        });
        return;
      }

      // Handle successful login here, e.g., redirect user or show success message
      navigate("/rooms");
    } catch (error) {
      console.error("Error logging in:", error);

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError({
          formError:
            "Failed to connect to the server. Please check your internet connection and try again later.",
          password: "",
          email: "",
        });
      } else {
        setError({
          formError: "An unexpected error occurred. Please try again later.",
          password: "",
          email: "",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-center text-xl font-semibold mb-4">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <div className="flex items-center py-2">
            <input
              type="email"
              name="email"
              placeholder="john@mymail.com"
              className="border rounded-md p-1 w-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>
        <div className="mb-4">
          <div className="flex items-center py-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md p-1 w-full focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>
        <button className="bg-orange-400 font-semibold rounded-md py-2 w-full mt-4 hover:bg-orange-500 focus:outline-none">
          Login
        </button>
        {error.formError && (
          <p className="text-red-500 text-sm mt-2">{error.formError}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
