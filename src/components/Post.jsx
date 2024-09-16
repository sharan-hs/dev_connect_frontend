import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";

import { MdOutlineModeComment } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { GoBookmarkFill } from "react-icons/go";
import { FiEdit3 } from "react-icons/fi";

import { GoBookmark } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import {
  bookmarkPost,
  deletePost,
  editPost,
  getAllPosts,
  getExplorePosts,
  getFeedPosts,
  getRefresh,
  likeDislike,
} from "../redux/postSlice";
import { timeSince } from "../utils/constants";

const Post = ({ ...props }) => {
  const { post, user } = props;

  const dispatch = useDispatch();
  const [bookMark, setBookMark] = useState(false);
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);

  const [editedText, setEditedText] = useState("");
  const userId = useSelector((store) => store.user);

  const loggedInUserId = userId.user;

  const isLiked = post?.like?.some(
    (like) => like.loggedInUserId === loggedInUserId
  );

  const refresh = useSelector((store) => store.post.refresh);

  useEffect(() => {
    const isBookmarked = user?.user?.bookmarks?.includes(post?._id);
    setBookMark(isBookmarked);
  }, [user, post]);

  useEffect(() => {
    dispatch(getFeedPosts(loggedInUserId));
  }, [refresh]);

  const likeDislikeHandler = (id) => {
    dispatch(likeDislike({ id, loggedInUserId }));

    dispatch(getRefresh());
    dispatch(getFeedPosts(loggedInUserId));
    dispatch(getExplorePosts(loggedInUserId));
  };

  const bookmarkHandler = () => {
    setBookMark(!bookMark);
    dispatch(bookmarkPost({ id: post?._id, loggedInUserId }));
  };

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
    dispatch(getFeedPosts(loggedInUserId));
    dispatch(getRefresh());
  };

  const saveHandler = (id) => {
    dispatch(editPost({ id, updatedContent: editedText }));
    dispatch(getFeedPosts(loggedInUserId));
    setSave(false);
    setEdit(false);
  };

  const editPostHandler = (id) => {
    setEdit(true);
    setSave(true);
    setEditedText(post?.postContent);
  };

  return (
    <div className="mt-4 bg-white rounded-lg border border-[#ECF0F5]">
      <div className="flex mt-3 justify-between mobile-feed items-start md:w-[582px]">
        <div className=" w-[50%] mobile-userIcon py-2 flex gap-2">
          <img
            alt="Avatar"
            src={
              post?.userDetails[0]?.profileImage ||
              "https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
            }
            className="rounded-full w-14 mobile-feedPost md:ml-4"
          />
          <div className="flex flex-col">
            <span>{post?.userDetails[0]?.name}</span>
            <span>{`@${post?.userDetails[0]?.username}`}</span>
          </div>
        </div>
        <div className="w-[40%]  mobile-edit  md:pr-4">
          <div className="flex flex-col gap-2 items-end">
            <div>
              {loggedInUserId === post?.userId && (
                <FiEdit3
                  onClick={() => editPostHandler(post?._id)}
                  size={"20px"}
                />
              )}
            </div>
            <span className="text-sm">
              {post?.createdAt ? timeSince(post.createdAt) : "0 secs ago"}
            </span>
          </div>
        </div>
      </div>
      {edit ? (
        <div>
          <input
            type="text"
            className="ml-4 border border-black md:w-[20vw] p-1"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          {save && (
            <button
              onClick={() => saveHandler(post._id)}
              className="px-4 mx-2 mt-1 h-[32px] py-[1px] bg-[#4C68D5] text-white rounded-full"
            >
              Save
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white">
          <p className="mt-2 ml-4">{post?.postContent}</p>

          {post?.postMedia ? (
            <img className="p-2" src={post?.postMedia} />
          ) : null}
        </div>
      )}
      <div className="flex border-t-[1px] border-[#ECF0F5] justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => likeDislikeHandler(post._id)}
          >
            {isLiked ? (
              <IoIosHeart fill="red" size={"20px"} />
            ) : (
              <IoIosHeartEmpty size={"20px"} />
            )}
          </span>

          <span>{post?.like?.length}</span>
        </div>

        <span
          className="cursor-pointer"
          onClick={() => bookmarkHandler(post._id)}
        >
          {bookMark ? (
            <GoBookmarkFill fill="#4C68D5" size={"20px"} />
          ) : (
            <GoBookmark size={"20px"} />
          )}
        </span>

        {loggedInUserId === post?.userId && (
          <span
            onClick={() => deletePostHandler(post?._id)}
            className="cursor-pointer"
          >
            <AiOutlineDelete size={"20px"} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
