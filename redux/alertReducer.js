import apiClient from "../api/apiClient";

const initialState = {
  alerts: [],
};


const GET_ALERTS = "alerts/GET_ALERTS";
const ACCEPT_REJECT_ALERT = "alerts/ACCEPT_REJECT_ALERT";
const FOLLOW_BACK_ALERT = "alerts/FOLLOW_BACK_ALERT";


export const fetchAlerts = () => async (dispatch) => {
  try {
    const response = await apiClient.get("https://doppular.vercel.app/api/alerts/");
    console.log("GET_ALERTS Response:", response);

    if (response) {
      dispatch({
        type: GET_ALERTS,
        payload: response,
      });
    } else {
      console.log("Failed to fetch alerts");
    }
  } catch (error) {
    console.error("GET_ALERTS API Error:", error);
  }
};

export const acceptRejectAlert = (alertData) => async (dispatch) => {
  try {
    const response = await apiClient.post(
      "https://doppular.vercel.app/api/alerts/acceptrejectRequest",
      alertData
    );
    console.log("ACCEPT_REJECT_ALERT Response:", response);

    if (response) {
      dispatch({
        type: ACCEPT_REJECT_ALERT,
        payload: alertData,
      });
    } else {
      console.log("Failed to accept/reject alert");
    }
  } catch (error) {
    console.error("ACCEPT_REJECT_ALERT API Error:", error);
  }
};


export const followBackAlert = (alertData) => async (dispatch) => {
  try {
    const response = await apiClient.post(
      "https://doppular.vercel.app/api/alerts/followBackRequest",
      alertData
    );
    console.log("FOLLOW_BACK_ALERT Response:", response);

    if (response) {
      dispatch({
        type: FOLLOW_BACK_ALERT,
        payload: alertData,
      });
    } else {
      console.log("Failed to follow back");
    }
  } catch (error) {
    console.error("FOLLOW_BACK_ALERT API Error:", error);
  }
};


const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS: {
      return {
        ...state,
        alerts: action.payload,
      };
    }
    case ACCEPT_REJECT_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert._id !== action.payload.alertId),
      };
    }
    case FOLLOW_BACK_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert._id !== action.payload.alertId),
      };
    }
    default:
      return state;
  }
};

export default alertReducer;
