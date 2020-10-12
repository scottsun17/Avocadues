import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyCMWj_MN8HshQ6FrPCDgH8dasXsQt2M1B0",
  authDomain: "avocadues-project.firebaseapp.com",
  databaseURL: "https://avocadues-project.firebaseio.com",
  projectId: "avocadues-project",
  storageBucket: "avocadues-project.appspot.com",
  messagingSenderId: "477564425623",
  appId: "1:477564425623:web:afbd6e1c857ea87ccd60d2",
  measurementId: "G-EFBBR1PX8N",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
  async logout(email, password) {
    return await this.auth.signOutWithEmailAndPassword(email, password);
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }
}
export default new Firebase();
