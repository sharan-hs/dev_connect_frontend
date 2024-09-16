import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { IoOptionsOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

import { CiImageOn } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { BsRocket } from "react-icons/bs";
import { getOtherUser, getUser, getUserProfile } from "../redux/userSlice";
import { createPost, getFeedPosts, getRefresh } from "../redux/postSlice";
import { Link } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user);

  const otherUsers = useSelector((store) => store.user);
  const feedPosts = useSelector((store) => store.post.feed);
  const refresh = useSelector((store) => store.post.refresh);

  const otherUsersList = otherUsers.otherUsers;
  const loggedInUserId = userId.user;
  const [filter, setFilter] = useState("Default");
  const [sortedPosts, setSortedPosts] = useState(feedPosts);

  const [desc, setDesc] = useState();

  const [image, setImage] = useState();

  const profile = useSelector((state) => state.user.profileDetails);

  useEffect(() => {
    dispatch(getOtherUser(loggedInUserId));
    dispatch(getFeedPosts(loggedInUserId));
    dispatch(getUserProfile(loggedInUserId));
  }, []);

  // useEffect(() => {
  //   dispatch(getFeedPosts(loggedInUserId));
  // }, [refresh]);

  useEffect(() => {
    const sortedPosts = sortPosts(filter);
    setSortedPosts(sortedPosts);
  }, [feedPosts, filter]);

  const postHandler = async () => {
    const post = await dispatch(createPost({ desc, loggedInUserId, image }));

    if (post) {
      dispatch(getFeedPosts(loggedInUserId));
      setDesc("");
      setImage(null);
    }
  };

  const sortHandler = (e) => {
    setFilter(e.target.value);
  };

  const sortPosts = (filter) => {
    let sortedPosts;

    if (filter === "Default") {
      sortedPosts = [...feedPosts];
    } else if (filter === "Trending") {
      sortedPosts = [...feedPosts]?.sort(
        (a, b) => b.like.length - a.like.length
      );
    } else if (filter === "Date") {
      sortedPosts = [...feedPosts]?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return sortedPosts;
  };

  return (
    <>
      <div className="flex md:mt-20 mb-4 mobile-feed tablet-feed flex-col gap-2 md:w-[582px]">
        <div
          className="bg-white mobile-createPost tablet-createPost border border-[#ECF0F5
] rounded-lg md:px-8 md:py-4 mt-12 h-[154px]"
        >
          <div className="flex mobile-createPost-image items-center w-[526px] h-[64px] gap-2">
            <img
              alt="Avatar"
              src={
                userId?.profileDetails?.user?.profileImage ||
                "https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
              }
              className="rounded-full w-[40px] h-[40px]"
            />
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="What's on your mind?"
              className="mobile-postInput tablet-postInput md:w-[470px] h-[64px] border-b border-[#E2E8F0] px-2"
            />
          </div>
          <div className="flex justify-between ml-14 mt-3 h-[32px] mobile-postBtn md:w-[461px]">
            <div className="flex  h-[25px] w-[100px] gap-2">
              <label htmlFor="imageUpload">
                <CiImageOn size={"20px"} className="cursor-pointer" />
              </label>
              <input
                id="imageUpload"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
              />
              <p className="text-sm w-[72px]">Add Media</p>
            </div>
            <button
              onClick={postHandler}
              className="px-4 h-[32px] py-[1px] bg-[#4C68D5] text-white rounded-full"
            >
              Post
            </button>
          </div>
        </div>

        <div className="bg-white relative mt-4 mobile-feed-margin">
          <div className="flex justify-between rounded-lg">
            <p className="text-2xl fw-bold md:mx-4 mobile-feed-title my-2">
              Feed Posts
            </p>
            <div className="flex items-center">
              <span className="absolute right-4">
                <IoOptionsOutline size={"22px"} />
              </span>

              <select id="sortFilter" onChange={sortHandler} className="w-4">
                <option value="Default">Default</option>
                <option value="Trending">Trending</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>

          {sortedPosts.length === 0 ? (
            <h1 className="mt-24 text-2xl text-center">
              Follow other developers to see Feed Posts
            </h1>
          ) : (
            sortedPosts?.map((post) => (
              <Post key={post._id} post={post} user={profile} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
