import "../App.css";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import React, { useContext } from "react";
import firebase from "../lib/firebase";

function Navbar() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  const userLogin = firebase.auth().currentUser;

  if (userLogin !== null) {
  } else {
    history.push("/login");
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        appContext.setUser("");
        history.push("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-left">
          {appContext.user && (
            <div>
              <Link className="navbar-option" to="/">
                Home
              </Link>
            </div>
          )}
          {appContext.user && (
            <div>
              <Link className="navbar-option" to="/profile">
                Profile
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-right">
          <div>
            {!appContext.user && (
              <Link className="navbar-option" to="/login">
                Log in
              </Link>
            )}
            {appContext.user && (
              <div className="in-out-wrapper">
                <div className="navbar-option-unclick">
                  {`Welcome ${appContext.user}`}
                </div>
                <div className="navbar-option" onClick={handleLogout}>
                  Log out
                </div>
              </div>
            )}
          </div>
          <div>
            {!appContext.user && (
              <Link className="navbar-option" to="/signup">
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
