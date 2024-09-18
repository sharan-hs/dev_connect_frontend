import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, loginUser, getUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let userObj;
    if (!isLogin) {
      if (password.length < 8) {
        toast.error(
          "Password is too weak, Password should contain minimum 6 characters",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );

        return null;
      } else {
        setErrorMsg("");
        userObj = {
          name: name,
          username: username,
          email: email,
          password: password,
        };
      }

      const newUser = await dispatch(addUser(userObj));

      if (newUser) {
        toast.success(newUser.payload);
        setIsLogin(true);
        return null;
      }
    } else {
      const userLogin = {
        email: email,
        password: password,
      };

      try {
        const loggedInUser = await dispatch(loginUser(userLogin));

        if (loggedInUser?.payload?.message?.includes("Incorrect")) {
          toast.error("Incorrect email or password", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return;
        } else {
          setErrorMsg("");
          dispatch(getUser(loggedInUser?.payload?.user));
          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex bg-gray-400 w-screen h-screen justify-center">
      <div className="w-[90vw] md:w-[55vw] h-[650px] md:h-[705px] overflow-hidden shadow-lg bg-white my-12 rounded-l-lg rounded-bl-lg">
        <div className="py-2 px-2 w-[70%]">
          <h1 className="font-bold mobile-heading md:px-8 text-[40px] md:text-6xl">
            DevConnect.
          </h1>
          <p className="ml-[35px] mobile-slogan text-gray-500">
            Code and Grow Together
          </p>
        </div>
        <h1 className="md:pt-8 mobile-form-heading md:pl-11 mb-2 text-2xl font-bold">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <form
          onSubmit={submitHandler}
          className="mt-3 mobile-form md:pl-11 flex flex-col md:w-[58%]"
        >
          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-lg my-2 font-semibold"
                required
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-lg my-2 font-semibold"
                required
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-lg my-2 font-semibold"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-lg my-2 font-semibold"
            required
          />
          {errorMsg && <p className="my-2 text-red-500 text-xl">{errorMsg}</p>}
          <button className="bg-[#1D9BF0] border-none py-2 my-4 rounded-lg text-lg text-white">
            {isLogin ? "Login" : "Create Account"}
          </button>
          <p>
            {isLogin ? "Do not have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-blue-600 cursor-pointer"
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </form>
      </div>

      <div className="hidden web-img login-img overflow-hidden w-[32vw] mr-10">
        <img
          className="mt-5 w-full rounded-tr-lg rounded-br-lg shadow-xl"
          src="https://res.cloudinary.com/dp6n0rxyv/image/upload/v1724217328/devconnect/pexels-photo-1181673_cl8zrx.jpg"
          alt="loginPage-Image"
        />
      </div>
    </div>
  );
};

export default Login;
