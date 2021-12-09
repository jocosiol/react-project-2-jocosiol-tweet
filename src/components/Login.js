import "../App.css";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import firebase from "../lib/firebase";

function Login() {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleChangeUserLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePassLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  useEffect(() => {
    if (formData.email && formData.password) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);

  const handleLoginSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const dbRef = firebase.database().ref();
        dbRef
          .child("users")
          .child(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot) {
              //console.log(user);
              //console.log(snapshot.val());
              //appContext.setUser(snapshot.val().username);
              appContext.setUser(user.displayName);
              //setRedirect("/");
              history.push("/");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    //appContext.setUserInputFilled(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-left"></div>
      <div className="profile-container">
        <div className="profile-title">Log in</div>
        <div className="profile-subtitle">Email</div>
        <div>
          <input
            className="profile-input"
            type="text"
            name={`email`}
            onChange={handleChangeUserLogin}
          />
        </div>
        <div className="profile-subtitle">Password</div>
        <div>
          <input
            className="profile-input"
            type="password"
            name={`password`}
            onChange={handleChangePassLogin}
          />
        </div>
        <div className="profile-button-cotainer">
          <button
            disabled={!isFormComplete}
            className={`submit-button-${!isFormComplete}`}
            onClick={handleLoginSubmit}
          >
            Log in
          </button>
        </div>
      </div>
      <div className="profile-right"></div>
    </div>
  );
}

export default Login;
