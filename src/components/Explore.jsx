import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExplorePosts } from "../redux/postSlice";
import Post from "./Post";

const Explore = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user);
  const loggedInUserId = userId.user;
  const explorePosts = useSelector((state) => state.post.explorePosts);

  const profile = useSelector((state) => state.user.profileDetails);

  useEffect(() => {
    dispatch(getExplorePosts(loggedInUserId));
  }, []);

  return (
    <div className="md:w-[582px] mobile-explore md:mt-20 md:mb-8">
      <p className="text-2xl fw-bold mx-0 md:mt-[40px]">Explore Posts</p>
      {explorePosts?.map((post) => (
        <Post key={post._id} post={post} user={profile} />
      ))}
    </div>
  );
};

export default Explore;
