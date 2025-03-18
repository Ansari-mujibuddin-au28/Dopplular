import apiClient from "../api/apiClient";

const initialState = {
  likes: {},
  comments: {}, 
};


const TOGGLE_LIKE = "likes/TOGGLE_LIKE";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";


export const toggleLike = (postId, toggleStatus) => async (dispatch) => {
  try {
    const response = await apiClient.post(
      `https://doppular.vercel.app/api/posts/toggleLike?postId=${postId}`,
      { toggleLike: toggleStatus }
    );
    console.log("TOGGLE_LIKE Response:", response);

    if (response) {
      dispatch({
        type: TOGGLE_LIKE,
        payload: { postId, toggleStatus },
      });
    } else {
      console.log("Failed to toggle like");
    }
  } catch (error) {
    console.error("TOGGLE_LIKE API Error:", error);
  }
};


export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const response = await apiClient.post(
      `https://doppular.vercel.app/api/posts/addComment?postId=${postId}`,
      { comment }
    );
    console.log("ADD_COMMENT Response:", response);

    if (response) {
      dispatch({
        type: ADD_COMMENT,
        payload: { postId, comment: response },
      });
    } else {
      console.log("Failed to add comment");
    }
  } catch (error) {
    console.error("ADD_COMMENT API Error:", error);
  }
};


export const updateComment = (commentId, updatedComment) => async (dispatch) => {
  try {
    const response = await apiClient.put(
      `https://doppular.vercel.app/api/posts/updateComment?commentId=${commentId}`,
      { comment: updatedComment }
    );
    console.log("UPDATE_COMMENT Response:", response);

    if (response) {
      dispatch({
        type: UPDATE_COMMENT,
        payload: { commentId, updatedComment },
      });
    } else {
      console.log("Failed to update comment");
    }
  } catch (error) {
    console.error("UPDATE_COMMENT API Error:", error);
  }
};


export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const response = await apiClient.delete(
      `https://doppular.vercel.app/api/posts/deleteComment?commentId=${commentId}`
    );
    console.log("DELETE_COMMENT Response:", response);

    if (response) {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    } else {
      console.log("Failed to delete comment");
    }
  } catch (error) {
    console.error("DELETE_COMMENT API Error:", error);
  }
};


export const getComments = (postId) => async (dispatch) => {
  try {
    const response = await apiClient.get(
      `https://doppular.vercel.app/api/posts/getComments?postId=${postId}`
    );
    console.log("GET_COMMENTS Response:", response);

    if (response) {
      dispatch({
        type: GET_COMMENTS,
        payload: { postId, comments: response },
      });
    } else {
      console.log("Failed to fetch comments");
    }
  } catch (error) {
    console.error("GET_COMMENTS API Error:", error);
  }
};


const likesCommentPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE: {
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload.postId]: action.payload.toggleStatus,
        },
      };
    }
    case ADD_COMMENT: {
      const { postId, comment } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), comment],
        },
      };
    }
    case UPDATE_COMMENT: {
      const { commentId, updatedComment } = action.payload;
      return {
        ...state,
        comments: Object.fromEntries(
          Object.entries(state.comments).map(([postId, comments]) => [
            postId,
            comments.map((c) => (c._id === commentId ? { ...c, ...updatedComment } : c)),
          ])
        ),
      };
    }
    case DELETE_COMMENT: {
      return {
        ...state,
        comments: Object.fromEntries(
          Object.entries(state.comments).map(([postId, comments]) => [
            postId,
            comments.filter((c) => c._id !== action.payload),
          ])
        ),
      };
    }
    case GET_COMMENTS: {
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
      };
    }
    default:
      return state;
  }
};

export default likesCommentPageReducer;
