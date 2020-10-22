// import firebase from "firebase";
import firebaseAuth from "../../components/firebase";

// export function auth() {
//   const user = firebase.auth().currentUser;
//   return {
//     type: "auth_status",
//     payload: user,
//   };
// }

export function login(email, password) {
  const req = firebaseAuth.login(email, password);
  return {
    type: "user_login",
    payload: req,
  };
}
