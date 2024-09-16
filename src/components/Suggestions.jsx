import { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUser } from "../redux/userSlice";
import MobileFooter from "./MobileFooter";
import FollowList from "./FollowList";

const Suggestions = () => {
  const otherUsers = useSelector((store) => store.user);

  const otherUsersList = otherUsers.otherUsers;

  return (
    <div>
      <Header />
      <main>
        <div className="mt-12 shadow-md mobile-suggestions tablet-suggestions rounded-lg border border-[#ECF0F5] w-[350px] h-[434px] bg-white">
          <p className="text-[18px] pl-4 py-3 text-[#0c1024] font-medium">
            Suggested Developers
          </p>
          <div className="">
            {otherUsersList?.map((user) => {
              return (
                <div key={user._id}>
                  <FollowList userInfo={user} />
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <MobileFooter />
    </div>
  );
};

export default Suggestions;
