import React from "react";
import FollowList from "./FollowList";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[382px]">
      <div className="fixed top-20">
        <div className="ml-6 mt-12 shadow-md rounded-lg border border-[#ECF0F5] relative w-[320px] h-[434px] bg-white">
          <p className="text-[16px] absolute top-6 left-6 text-[#0c1024] font-medium">
            Suggested Developers
          </p>
          <div className="absolute top-[80px] right-[36px]">
            {otherUsers?.map((user) => {
              return (
                <div key={user._id}>
                  <FollowList userInfo={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
