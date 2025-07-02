import Button from "../../Components/extra/button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/User/add",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        Navigate("/");
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleSignUpSubmit;
  }, []);

  return (
    <form action="" onSubmit={handleSignUpSubmit}>
      <div className="bg-gray-200 absolute left-20 top-25 min-w-max h-2/3 w-96 rounded-md">
        <div className="flex justify-center items-center h-1/3 font-semibold text-2xl">
          SignUp
        </div>
        <div className="flex justify-center items-center flex-col gap-4 min-w-max">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className=" bg-white rounded w-70 p-2"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-white rounded w-70 p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-white rounded w-70 p-2"
          />
          <a
            href="/"
            className="flex text-center text-sm hover:text-red-600 hover:underline"
          >
            Have an account already? Login then
          </a>
        </div>
        <div className="flex justify-center items-center mt-6  hover:font-semibold">
          <Button Title="SignUp" />
        </div>
      </div>
    </form>
  );
};

export default SignUp;
