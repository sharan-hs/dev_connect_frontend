import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bookmarkPost, getAllPosts, getRefresh } from "../redux/postSlice";
import Post from "./Post";
import { getUserProfile } from "../redux/userSlice";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user);
  const loggedInUserId = userId.user;
  const allPosts = useSelector((state) => state.post.allPosts);

  const profile = useSelector((state) => state.user.profileDetails);

  const refresh = useSelector((store) => store.post.refresh);

  const bookMarkPosts = allPosts?.filter((post) =>
    profile?.user?.bookmarks?.includes(post._id)
  );

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserProfile(loggedInUserId));
    dispatch(getRefresh());
  }, []);

  return (
    <div className="md:w-[582px] mobile-explore md:mt-20 md:mb-8">
      <p className="text-2xl fw-bold mx-0 md:mt-[40px]">Bookmarked Posts</p>
      {bookMarkPosts?.map((post) => (
        <Post key={post._id} post={post} user={profile} />
      ))}
    </div>
  );
};

export default Bookmarks;
