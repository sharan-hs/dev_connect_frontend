import React from "react";

import { BsRocket } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";

import { IoBookmarkOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_BG_URL } from "../utils/constants";

const LeftSidebar = () => {
  const userId = useSelector((store) => store.user);
  const userInfo = useSelector((store) => store.user.userInfo);

  const profile = useSelector((state) => state.user.profileDetails);

  const loggedInUserId = userId.user;

  return (
    <div className="w-[382px]">
      <div className="fixed top-20">
        <div className="ml-20 mt-12 rounded-lg shadow-md border border-[#ECF0F5] relative w-[290px] h-[434px] bg-white">
          <img
            className="w-[291px] rounded-t-lg h-[72px] object-cover"
            src={USER_BG_URL}
          />
          <img
            className="w-14 h-14 rounded-full absolute top-11 left-8"
            src={
              userInfo?.profileImage ||
              "https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
            }
          />
          <p className="text-sm text-[#0C1024] absolute top-[124px] left-8">
            {userInfo?.name}
          </p>
          <p className="text-[12px] text-[#27364B] absolute top-[151px] left-8">
            {userInfo?.username}
          </p>
          <div className="absolute top-[206px] left-[32px]">
            <div className="flex w-[235px] border-b border-[#ECF0F5] my-2 py-[12px] gap-[10px]  hover:bg-gray-200">
              <BsRocket size={"22px"} />
              <Link to="/explore" className="no-underline text-black">
                <span>Explore</span>
              </Link>
            </div>

            <div className="flex w-[235px] border-b border-[#ECF0F5] my-2 py-[12px] gap-[10px]  hover:bg-gray-200">
              <IoBookmarkOutline size={"22px"} />
              <Link to="/bookmarks" className="no-underline text-black">
                <span>Bookmark</span>
              </Link>
            </div>

            <div className="flex w-[235px] my-2 py-[12px] gap-[10px]  hover:bg-gray-200">
              <CiUser size={"22px"} />
              <Link
                to={`/profile/${loggedInUserId}`}
                className="no-underline text-black"
              >
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
