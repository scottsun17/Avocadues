export default function (state = {}, action) {
  switch (action.type) {
    // case "auth_status":
    //   return { ...state, authStatus: action.payload };
    case "user_login":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
