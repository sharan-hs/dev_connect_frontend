import React, { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API_URL } from "../utils/constants";
import { CiUser } from "react-icons/ci";
import {
  clearUserInfo,
  getOtherUser,
  getUser,
  getUserProfile,
} from "../redux/userSlice";

const Header = () => {
  const userId = useSelector((store) => store.user);
  const loggedInUserId = userId.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profInfo = useParams();
  const [profileHeader, setProfileHeader] = useState(false);

  useEffect(() => {
    if (profInfo.id) {
      setProfileHeader(true);
    } else {
      setProfileHeader(false);
    }
  }, [profInfo]);

  const logoutHandler = async () => {
    const response = await fetch(`${BACKEND_API_URL}/user/logout`);
    const data = await response.json();
    if (data) {
      dispatch(clearUserInfo());
      navigate("/login");
    }
  };

  return (
    <div className="w-full sticky md:fixed top-0 border-b-2 border-[#ECF0F5] flex items-center  justify-between mobile-logo md:px-16 lg:h-[80px] bg-white">
      <Link className="no-underline text-black" to="/">
        <img
          className="max-w-[90%]"
          src="https://res.cloudinary.com/dp6n0rxyv/image/upload/c_thumb,w_200,g_face/v1724410490/devconnect/Screenshot_2024-08-23_at_4.23.56_PM_fpevue.png"
        />
      </Link>

      <div
        onClick={logoutHandler}
        className="hidden md:flex gap-3 hover:bg-gray-200"
      >
        <Link className="no-underline text-black">
          <span>Logout</span>
        </Link>
        <SlLogout size={"20px"} />
      </div>

      {profileHeader && (
        <div
          onClick={logoutHandler}
          className="flex items-center sm:hidden gap-1 hover:bg-gray-200"
        >
          <Link className="no-underline text-black">
            <span>Logout</span>
          </Link>
          <SlLogout size={"18px"} />
        </div>
      )}
    </div>
  );
};

export default Header;
