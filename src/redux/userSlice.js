import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../utils/constants";

export const addUser = createAsyncThunk("/user/add", async (userObj) => {
  const response = await fetch(`${BACKEND_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });
  const data = await response.json();

  if (data.success) {
    return data.message;
  }
});

export const loginUser = createAsyncThunk("/user/login", async (userLogin) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });

    const data = await response.json();

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const getUserProfile = createAsyncThunk("/user/info", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/user/profile/${id}`, {
    withCredentials: true,
  });
  const data = await response.json();
  return data;
});

export const getOtherUser = createAsyncThunk("/user/otherUsers", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/user/otherUsers/${id}`);
  const data = await response.json();
  if (data?.user?.length > 0) {
    return data?.user;
  }
});

export const followUnfollowUser = createAsyncThunk(
  "/user/followOrUnfollow",
  async ({ loggedInUserId, profileId }) => {
    const userId = profileId;

    const response = await fetch(`${BACKEND_API_URL}/user/follow/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loggedInUserId }),
    });
    const data = await response.json();
  }
);

export const updateProfileImage = createAsyncThunk(
  "/user/profile/image",
  async ({ id, profileImage }) => {
    const response = await fetch(
      `${BACKEND_API_URL}/user/profile/image/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileImage }),
      }
    );
    const data = await response.json();
  }
);

export const getUserInfo = createAsyncThunk("/user/userInfo", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/user/userDetails/${id}`);
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers: null,
    userInfo: null,
    status: "Idle",
    profileDetails: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    clearUserInfo: (state) => {
      state.user = null;
      state.otherUsers = [];
      state.userInfo = null;
      state.profileDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOtherUser.fulfilled, (state, action) => {
      state.status = "success";
      state.otherUsers = action.payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.profileDetails = action.payload;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
    });
  },
});

export const { getUser, getOtherUsers, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
