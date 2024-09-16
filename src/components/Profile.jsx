import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnfollowUser,
  getUserInfo,
  getUserProfile,
  updateProfileImage,
} from "../redux/userSlice";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../redux/postSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const Profile = () => {
  const dispatch = useDispatch();
  const [buttonValue, setButtonValue] = useState();

  const userId = useSelector((store) => store.user);
  const loggedInUserId = userId.user;
  const id = useParams();
  const profileId = id.id;

  const profile = useSelector((state) => state.user.profileDetails);
  const posts = useSelector((store) => store.post);
  const feedPosts = posts.feed;

  const [bio, setBio] = useState("This is my bio");
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);

  const [image, setImage] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveHandler = () => {
    dispatch(updateProfileImage({ id: loggedInUserId, profileImage: image }));
    handleClose();
  };

  const allPosts = useSelector((state) => state.post.allPosts);

  const profilePosts = allPosts?.filter((post) => post.userId === profileId);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserProfile(profileId));
    setEdit(false);
  }, [profileId]);

  useEffect(() => {
    updateButtonValue();
  }, [profile, loggedInUserId]);

  const updateButtonValue = () => {
    if (loggedInUserId === profileId) {
      setButtonValue("Edit Profile");
    } else if (profile?.user?.followers?.includes(loggedInUserId)) {
      setButtonValue("Unfollow");
    } else {
      setButtonValue("Follow");
    }
  };

  const profileHandler = (buttonValue) => {
    if (buttonValue === "Follow") {
      //dispatch follow
      dispatch(followUnfollowUser({ loggedInUserId, profileId }));
      setButtonValue("Unfollow");
    } else if (buttonValue === "Unfollow") {
      //dispatch unfollow
      dispatch(followUnfollowUser({ loggedInUserId, profileId }));
      setButtonValue("Follow");
    } else if (buttonValue === "Edit Profile") {
      setEdit(true);
      setButtonValue("Save");
      //dispatch editProfile
    } else if (buttonValue === "Save") {
      setEdit(false);
      setButtonValue("Edit Profile");
      dispatch(getUserProfile(profileId));
      dispatch(getUserInfo(loggedInUserId));
    }
  };
  return (
    <div className="flex flex-col mobile-profile tablet-profile md:mt-20">
      <div className=" md:w-[582px] border border-[#ECF0F5] rounded-lg bg-white md:mt-12">
        <div className="flex justify-between items-center py-2">
          <div className="flex gap-3 items-center">
            <div className="flex flex-col">
              <img
                alt="Avatar"
                src={profile?.user?.profileImage}
                className="rounded-full w-24 ml-4"
              />
              {edit && (
                <>
                  <button
                    onClick={handleShow}
                    className="px-4 h-[32px] m-2 py-1 bg-white text-[#4C68D5] rounded-full"
                  >
                    Edit Image
                  </button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Profile Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Container>
                        <Row>
                          <Col
                            onClick={(e) => setImage(e.target.src)}
                            className="my-2 active:border-black hover:border border-[#ECF0F5]"
                            xs={6}
                            md={4}
                          >
                            <Image
                              src="https://i.pinimg.com/564x/41/e0/39/41e0398984b0f1a0c79acfb0694bfcce.jpg"
                              roundedCircle
                            />
                          </Col>
                          <Col
                            onClick={(e) => setImage(e.target.src)}
                            className="my-2 hover:border border-[#ECF0F5]"
                            xs={6}
                            md={4}
                          >
                            <Image
                              src="https://i.pinimg.com/564x/d1/8c/29/d18c29bc0636c509280a896b3dd2bccc.jpg"
                              roundedCircle
                            />
                          </Col>
                          <Col
                            onClick={(e) => setImage(e.target.src)}
                            className="my-2 hover:border border-[#ECF0F5]"
                            xs={6}
                            md={4}
                          >
                            <Image
                              src="https://i.pinimg.com/564x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
                              roundedCircle
                            />
                          </Col>
                          <Col
                            onClick={(e) => setImage(e.target.src)}
                            className="my-2 hover:border border-[#ECF0F5]"
                            xs={6}
                            md={4}
                          >
                            <Image
                              src="https://i.pinimg.com/564x/11/00/af/1100af8ae7f98dadc0b08a101bf2e4e4.jpg"
                              roundedCircle
                            />
                          </Col>
                          <Col
                            onClick={(e) => setImage(e.target.src)}
                            className="my-2 hover:border border-[#ECF0F5]"
                            xs={6}
                            md={4}
                          >
                            <Image
                              src="https://i.pinimg.com/564x/33/66/27/336627f476a81f2b380ed02b563a8f4e.jpg"
                              roundedCircle
                            />
                          </Col>
                        </Row>
                      </Container>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={saveHandler} variant="primary">
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </div>

            <div className="">
              <p className="text-xl text-[#27364B] fw-bold">
                {profile?.user?.name}
              </p>
              <p className="text-sm text-[#4B5669]">
                {profile?.user?.username}
              </p>
            </div>
          </div>

          <button
            onClick={() => profileHandler(buttonValue)}
            className="px-4 h-[32px] mr-4 py-1 bg-white text-[#4C68D5] rounded-full"
          >
            {buttonValue}
          </button>
        </div>
        <span className="mt-2 text-sm ml-4">{bio}</span>

        {edit && (
          <input
            type="text"
            value={bio}
            className="px-2 py-0.5 w-[275px] bg-[#FAFBFF]  ml-4 border border-black"
            placeholder="Enter bio here..."
            onChange={(e) => setBio(e.target.value)}
          />
        )}

        <div className="w-[187px] my-2 mx-auto flex gap-3">
          <div className="flex flex-col">
            <span className="text-[#27364B] text-center text-2xl">
              {profile?.user?.followers?.length || 0}
            </span>
            <span className="text-xs text-[#4B5669]">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#27364B] text-center text-2xl">
              {profile?.user?.following?.length || 0}
            </span>
            <span className="text-xs text-[#4B5669]">Following</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#27364B] text-center text-2xl">
              {profile?.user?.bookmarks?.length || 0}
            </span>
            <span className="text-xs text-[#4B5669]">Bookmarks</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-y border-[#ECF0F5] rounded-lg mt-3 mobile-profile-posts tablet-profile-posts md:w-[582px]">
        <p className="text-2xl fw-bold mx-4 my-2">
          {loggedInUserId === profileId
            ? "Your Posts"
            : `${profile?.user?.name}'s Posts`}
        </p>
        {profilePosts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
