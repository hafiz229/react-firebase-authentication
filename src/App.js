import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.init";

// initialize firebase config
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  // click handler for google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign-In</button>
    </div>
  );
}

export default App;
