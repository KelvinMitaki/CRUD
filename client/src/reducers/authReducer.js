const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  currentUser: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, userId: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
