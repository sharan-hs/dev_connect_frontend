import React from "react";
import { Link } from "react-router-dom";

const FollowList = ({ userInfo }) => {
  return (
    <div className="flex mobile-follow md:w-[256px] items-center pb-2 md:ml-8 md:mt-3 justify-around md:justify-between">
      <div className="flex w-[178px] h-[56px] gap-3">
        <img
          alt="Avatar"
          src={userInfo?.profileImage}
          className="rounded-full w-[48px] h-[48px]"
        />
        <div className="flex w-[96px] flex-col">
          <p className="mb-0">{userInfo?.name}</p>
          <p className="mt-0"> @{userInfo?.username}</p>
        </div>
      </div>

      <Link to={`/profile/${userInfo?._id}`}>
        <button className="px-4 h-[32px] py-1 bg-[#4C68D5] text-white rounded-full">
          Profile
        </button>
      </Link>
    </div>
  );
};

export default FollowList;
