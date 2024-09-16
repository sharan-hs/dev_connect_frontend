import { CiUser } from "react-icons/ci";
import { BsRocket } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileFooter = () => {
  const user = useSelector((store) => store.user);
  const loggedInUserId = user.user;

  return (
    <div className="lg:hidden w-full h-[6vh] bg-[#4C68D5] fixed bottom-[0px] mt-10">
      <div className="flex items-center h-[100%] justify-around">
        <Link to="/explore" className="no-underline text-black">
          <BsRocket fill="white" size={"22px"} />
        </Link>
        <Link to="/bookmarks" className="no-underline text-white">
          <BsBookmark fill="white" size={"22px"} />
        </Link>
        <Link to="/suggestion" className="no-underline text-white">
          <GrGroup fill="white" size={"22px"} />
        </Link>
        <Link
          to={`/profile/${loggedInUserId}`}
          className="no-underline text-white"
        >
          <CiUser fill="white" size={"22px"} />
        </Link>
      </div>
    </div>
  );
};

export default MobileFooter;
