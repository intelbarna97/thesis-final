const notificationReducer = (
  state = {
    notifications: [],
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "LOADING_NOTIFICATION_START":
      return { ...state, loading: true, error: false };

    case "LOADING_NOTIFICATION_SUCCESS":
      return {
        ...state,
        notifications: action.notificationData,
        loading: false,
        error: false,
      };

    case "LOADING_NOTIFICATION_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default notificationReducer;
