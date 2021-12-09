import "../App.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "../lib/firebase";

function Signup() {
  const [formData, setFormData] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  const handleInputEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputUsername = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleInputPassword = (e) => {
    setShowAlert(true);
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
      // maybe check for is it an actual email and also password strength
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);

  useEffect(() => {
    if (
      formData.password !== formData.confirmPassword ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [formData]);

  const handleSubmit = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
      });

    const userLogin = firebase.auth().currentUser;

    if (userLogin !== null) {
      history.push("/profile");
    } else {
      history.push("/login");
    }

    history.push("/profile");
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-left"></div>
      <div className="profile-container">
        <div className="profile-title">Sign up</div>
        <div className="profile-subtitle">Email</div>
        <div>
          <input
            className="profile-input"
            type="text"
            name={`email`}
            onChange={handleInputEmail}
          />
        </div>
        <div className="profile-subtitle">Password</div>
        <div>
          <input
            className="profile-input"
            type="password"
            name={`password`}
            onChange={handleInputPassword}
          />
        </div>
        <div className="profile-subtitle">Confirm Password</div>
        <div>
          <input
            className="profile-input"
            type="password"
            name={`confirmPassword`}
            onChange={handleInputPassword}
          />{" "}
        </div>
        <div className="signup-button-cotainer">
          <button
            disabled={!isFormComplete}
            className={`submit-button-${!isFormComplete}`}
            onClick={handleSubmit}
          >
            Sign up
          </button>
          {showAlert && (
            <div className={`singup-error-${showAlert}`}>
              Passwords must match
            </div>
          )}
        </div>
      </div>
      <div className="signup-right"></div>
    </div>
  );
}

export default Signup;
