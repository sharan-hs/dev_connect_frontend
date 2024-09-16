import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_API_URL } from "../utils/constants";

export const getFeedPosts = createAsyncThunk("/user/feed", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/feed/posts/${id}`);
  const data = await response.json();
  return data.posts;
});

export const createPost = createAsyncThunk(
  "user/post",
  async ({ desc, loggedInUserId, image }) => {
    try {
      const formData = new FormData();
      formData.append("postContent", desc);
      formData.append("id", loggedInUserId);
      formData.append("image", image);

      const response = await fetch(`${BACKEND_API_URL}/post`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const deletePost = createAsyncThunk("/post/delete", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/post/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
});

export const getExplorePosts = createAsyncThunk("/user/explore", async (id) => {
  const response = await fetch(`${BACKEND_API_URL}/explore/posts/${id}`);
  const data = await response.json();
  return data;
});

export const likeDislike = createAsyncThunk(
  "/post/likeDislike",
  async ({ id, loggedInUserId }) => {
    const response = await fetch(
      `${BACKEND_API_URL}/post/likeOrDislike/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loggedInUserId }),
      }
    );
    const data = await response.json();
  }
);

export const bookmarkPost = createAsyncThunk(
  "/post/bookmarks",
  async ({ id, loggedInUserId }) => {
    const response = await fetch(`${BACKEND_API_URL}/post/bookmark/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loggedInUserId }),
    });
    const data = await response.json();

    if (data.message.includes("unsave" || "save")) {
      window.location.reload();
    }
  }
);

export const getAllPosts = createAsyncThunk("/user/allPosts", async () => {
  const response = await fetch(`${BACKEND_API_URL}/allPosts`);
  const data = await response.json();
  return data;
});

export const editPost = createAsyncThunk(
  "/user/post/edit",
  async ({ id, updatedContent }) => {
    const response = await fetch(`${BACKEND_API_URL}/post/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedContent }),
    });
    const data = await response.json();
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    feed: null,
    explorePosts: null,
    allPosts: null,
    bookmarks: null,
    refresh: false,
  },
  reducers: {
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedPosts.fulfilled, (state, action) => {
      state.feed = action.payload;
    });
    builder.addCase(getExplorePosts.fulfilled, (state, action) => {
      state.explorePosts = action.payload;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload;
    });
    builder.addCase(bookmarkPost.fulfilled, (state, action) => {
      state.bookmarks = action.payload;
    });
  },
});
export const { getRefresh } = postSlice.actions;
export default postSlice.reducer;
