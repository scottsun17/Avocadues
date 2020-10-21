import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import firebase from "firebase";

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

class FirebaseAuth {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  async register(name, email, password) {

    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }
  async resetpassword(email){
    return await this.auth.sendPasswordResetEmail(email);
  }

 isInitialized(){
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }
  // getCurrentUsername(){
  //   return this.auth.currentUser && this.auth.currentUser.displayName
  // }
  getUid(){
    return this.auth.currentUser.uid
  }
}
export default new FirebaseAuth();
 