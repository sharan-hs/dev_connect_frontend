import React from "react";
import LeftSidebar from "./LeftSidebar";
import { useEffect } from "react";
import { BsBookmark } from "react-icons/bs";
import RightSidebar from "./RightSidebar";
import { CiUser } from "react-icons/ci";
import { BsRocket } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUser, getUser, getUserInfo } from "../redux/userSlice";
import Header from "./Header";
import MobileFooter from "./MobileFooter";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const otherUsers = useSelector((store) => store.user);
  const navigate = useNavigate();
  const loggedInUser = user?.profileDetails?.user;

  const otherUsersList = otherUsers.otherUsers;
  const loggedInUserId = user.user;

  useEffect(() => {
    if (!user.user) {
      navigate("/login");
    } else {
      dispatch(getOtherUser(loggedInUserId));
      dispatch(getUserInfo(loggedInUserId));
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <div className="flex bg-[#FAFBFF] justify-between">
        <div className="hidden web-img">
          <LeftSidebar user={loggedInUser} />
        </div>
        <Outlet />
        <div className="hidden web-img">
          <RightSidebar otherUsers={otherUsersList} />
        </div>
      </div>
      <MobileFooter />
    </div>
  );
};

export default Home;
