import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.init";

// initialize firebase config
initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  // state change for name
  const [name, setName] = useState("");
  // state change for email
  const [email, setEmail] = useState("");
  // state change for password
  const [password, setPassword] = useState("");
  // state change for erros
  const [error, setError] = useState("");
  // state change for is login
  const [isLogin, setIsLogin] = useState(false);

  // click handler for google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  // click handler for toggle login
  const toggleLogin = (e) => {
    setIsLogin(e.target.checked);
  };

  // click handler for name change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // click handler for email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // click handler for password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // click handler for registration
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError("Password Must be at least 6 characters long");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("Password Must contain at least 2 upper cases");
      return;
    }
    isLogin ? processLogin(email, password) : registerNewUser(email, password);
  };

  // login existing user
  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // register new user
  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError("");
        verifyEmail();
        setUserName();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // set new user name
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name }).then((result) => {});
  };

  // email verification on successful registration
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then((result) => {
      console.log(result);
    });
  };

  // email password reset
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email).then((result) => {});
  };

  return (
    <div className="m-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">
          Please {isLogin ? "Login" : "Register"}
        </h3>
        {!isLogin && (
          <div className="row mb-3">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                onBlur={handleNameChange}
                type="text"
                id="inputName"
                className="form-control"
                placeholder="Enter your Name"
                required
              />
            </div>
          </div>
        )}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              onBlur={handleEmailChange}
              type="email"
              className="form-control"
              id="inputEmail3"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              onBlur={handlePasswordChange}
              type="password"
              className="form-control"
              id="inputPassword3"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                onChange={toggleLogin}
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-danger">{error}</div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          onClick={handleResetPassword}
          type="button"
          className="btn btn-warning btn-sm m-1"
        >
          Reset Password
        </button>
      </form>
      <br />
      <br />
      <br />
      <div>-----------------------------------------------</div>
      <br />
      <br />
      <br />
      <button onClick={handleGoogleSignIn}>Google Sign-In</button>
    </div>
  );
}

export default App;
