import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    formError: "",
  });
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    isValid();
  }, [formData, rePassword]);

  const isValid = () => {
    let flag = true;
    if (!formData.name) {
      setError((prevState) => ({ ...prevState, name: "Name is required." }));
      flag = false;
    } else {
      setError((prevState) => ({ ...prevState, name: "" }));
    }
    if (!formData.email) {
      setError((prevState) => ({ ...prevState, email: "Email is required." }));
      flag = false;
    } else {
      setError((prevState) => ({ ...prevState, email: "" }));
    }
    if (!formData.password) {
      setError((prevState) => ({
        ...prevState,
        password: "Password is required.",
      }));
      flag = false;
    } else {
      setError((prevState) => ({ ...prevState, password: "" }));
    }
    if (!rePassword) {
      setRePasswordError("Re-Password is required.");
      flag = false;
    } else {
      setRePasswordError("");
    }
    if (formData.password && rePassword && formData.password !== rePassword) {
      setRePasswordError("Password and Re-Password do not match.");
      flag = false;
    } else if (
      formData.password &&
      rePassword &&
      formData.password === rePassword
    ) {
      setRePasswordError("");
    }
    return flag;
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Converts form data to JSON string
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }

      // Registration successful, you may redirect or handle the response as needed
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="grid bg-white rounded-lg m-auto w-96">
      <div className="p-6">
        <h3 className="text-center font-semibold text-lg mb-4">Register</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border rounded-md p-1 w-full"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="john@mymail.com"
              className="border rounded-md p-1 w-full"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md p-1 w-full"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="re-password"
              placeholder="Re-Password"
              className="border rounded-md p-1 w-full"
              onChange={(e) => setRePassword(e.target.value)}
            />
            {rePasswordError && (
              <p className="text-red-500 text-sm mt-1">{rePasswordError}</p>
            )}
          </div>
          <button className="border rounded-md p-1 w-full bg-orange-400 hover:bg-orange-500 focus:outline-none font-semibold">
            Register
          </button>
          {error.formError && (
            <p className="text-red-500 text-sm mt-2">{error.formError}</p>
          )}
        </form>
        <div className="text-center">
          <button className="py-3 underline" onClick={navigateToLogin}>
            Already registered? Login now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
