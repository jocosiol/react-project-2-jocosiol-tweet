import "../App.css";
import { useHistory } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useContext, useState, useEffect } from "react";
import firebase from "../lib/firebase";

function Profile() {
  const appContext = useContext(AppContext);
  const history = useHistory();

  const [loginUserEmail, setLoginUserEmail] = useState();
 
  const [loginUserPhotoURL, setLoginUserPhotoURL] = useState();
  const [uploadedPhoto, setUploadedPhoto] = useState();
  const [fileU, setFileU] = useState();
  const [urlPic, setUrlPic] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setLoginUserEmail(user.email);
      // ...
    } else {
      // User is signed out
      // ...
      history.push("/login");
    }

    if (user !== null) {
     
      appContext.setLoginUserDisplayName(user.displayName);
      appContext.setLoginUserId(user.uid);
      appContext.setUser(user.displayName);
    }
  });

  const handleProfilePicture = (e) => {
    let file = e.target.files[0];
    setFileU(file);
    console.log(file.name);
    setUploadedPhoto(file.name);
    appContext.setUserInputFilled(true);
  };

  const handleChangeUser = (e) => {
    appContext.setUserInput(e.target.value);
    appContext.setUserInputFilled(true);
  };

  const handleUserSubmit = () => {
  

    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: appContext.userInput,
        photoURL: appContext.loginUserId + "/profilePicture/" + uploadedPhoto,
      })
      .then(() => {
        // Update successful
        // ...
        console.log("Update successful");
        appContext.userInput && appContext.setUser(appContext.userInput)
      })
      .catch((error) => {
        // An error occurred
        // ...
      });

    // Create a Storage Ref w/ username
    let storageRef = firebase
      .storage()
      .ref(appContext.loginUserId + "/profilePic");

    // Upload file
    let task = storageRef.put(fileU);

    appContext.setUserInputFilled(false);
    history.push("/");
  };

 

  if (!urlPic) {
    let starsRef = firebase
      .storage()
      .ref()
      .child(appContext.loginUserId + "/profilePic");

    // Get the download URL
    starsRef.getDownloadURL().then((url) => {
      // Insert url into an <img> tag to "download"
    
      setUrlPic(url);
    });
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-left"></div>
      <div className="profile-container">
        <div className="img-cropper">
          {urlPic && 
            <img
              className="profile-img"
              src={urlPic}
              alt="Profile Picture"
            ></img>
          }
          {!urlPic && 
            <img
              className="profile-img"
              src="/blank-profile.svg"
              alt="Profile Picture"
            ></img>
          }
        </div>
        <div className="profile-title">Profile</div>
        <div className="profile-subtitle">User Name</div>
        {!appContext.loginUserDisplayName && (
          <div>
            <input
              className="profile-input"
              type="text"
              onChange={handleChangeUser}
              placeholder="Create a username"
            />
          </div>
        )}
        {appContext.loginUserDisplayName && (
          <div>
            <input
              className="profile-input"
              type="text"
              onChange={handleChangeUser}
              placeholder={appContext.loginUserDisplayName}
            />
          </div>
        )}
        <div className="profile-subtitle">Email</div>
        <div>
          <input className="profile-input" type="text" value={loginUserEmail} />
        </div>
        <div className="profile-subtitle">Upload Profile's picture</div>
        <div>
          <input
            type="file"
            id="myFile"
            name="filename"
            onChange={handleProfilePicture}
          />
        </div>

        <div className="profile-button-cotainer">
          <button
            disabled={!appContext.userInputFilled}
            className={`submit-button-${!appContext.userInputFilled}`}
            onClick={handleUserSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <div className="profile-right"></div>
    </div>
  );
}

export default Profile;
