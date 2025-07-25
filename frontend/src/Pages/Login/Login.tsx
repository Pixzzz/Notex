import Button from "../../Components/extra/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/User/login", {email,password}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      console.log(data);
      localStorage.setItem("Token", data.accessToken);
      localStorage.setItem("UserInfo", JSON.stringify(data.userInfo));
      Navigate("/Home");
    } catch (error) { console.error(error)}
  };

  return (
    <form action="" onSubmit={handleLogin}>
      <div className="bg-gray-200 absolute left-20 top-25 min-w-max h-2/3 w-96 rounded-md">
        <div className="flex justify-center items-center h-1/3 font-semibold text-2xl">
          Login
        </div>
        <div className="flex justify-center items-center flex-col gap-4 min-w-max">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className=" bg-white rounded w-70 p-1"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-white rounded w-70 p-1"
          />
          <a
            href="/SignUp"
            className="text-sm hover:text-red-700 hover:underline"
          >
            You havent signUp yet? Do it lol
          </a>
        </div>
        <div className="flex justify-center items-center mt-15 hover:font-semibold">
          <Button Title="Login" />
        </div>
      </div>
    </form>
  );
};

export default Login;
