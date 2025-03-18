import apiClient from "../api/apiClient";

const initialState = {
  posts: [],
};


const ADD_POST = "posts/ADD_POST";
const UPDATE_POST = "posts/UPDATE_POST";
const DELETE_POST = "posts/DELETE_POST";


export const addPost = (postData) => async (dispatch) => {
  try {
    const response = await apiClient.post("https://doppular.vercel.app/api/posts/addPost", postData);
    console.log("ADD_POST Response:", response);

    if (response) {
      dispatch({
        type: ADD_POST,
        payload: response,
      });
    } else {
      console.log("Failed to add post");
    }
  } catch (error) {
    console.error("ADD_POST API Error:", error);
  }
};


export const updatePost = (postId, postData) => async (dispatch) => {
  try {
    const response = await apiClient.put(
      `https://doppular.vercel.app/api/posts/updatePost?postId=${postId}`,
      postData
    );
    console.log("UPDATE_POST Response:", response);

    if (response) {
      dispatch({
        type: UPDATE_POST,
        payload: { postId, postData },
      });
    } else {
      console.log("Failed to update post");
    }
  } catch (error) {
    console.error("UPDATE_POST API Error:", error);
  }
};


export const deletePost = (postId) => async (dispatch) => {
  try {
    const response = await apiClient.delete(
      `https://doppular.vercel.app/api/posts/deletePost?postId=${postId}`
    );
    console.log("DELETE_POST Response:", response);

    if (response) {
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    } else {
      console.log("Failed to delete post");
    }
  } catch (error) {
    console.error("DELETE_POST API Error:", error);
  }
};

const postPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }
    case UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId ? { ...post, ...action.payload.postData } : post
        ),
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default postPageReducer;
