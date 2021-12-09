import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import List from "./components/List";
import Form from "./components/Form";
import "./App.css";
import AppContext from "./context/AppContext";
import firebase from "./lib/firebase";
import { useHistory } from "react-router-dom";

function Home() {
  const appContext = useContext(AppContext);
  const history = useHistory();
  let location = useLocation();

  const userLogin = firebase.auth().currentUser;

  if (userLogin !== null) {
  } else {
    // User is signed out
    // ...
    history.push("/login");
  }



  useEffect(() => {
    // After user logs in, get user object from successful login
    if (!appContext.user) {
      // do some user stuff
      
      const pagePathname = location.pathname;
      if (!pagePathname.includes("signup")) {
        appContext.setRedirect("/login");
      }
    }
        // eslint-disable-next-line
  }, [appContext.user, location]);

  useEffect(() => {
    if (appContext.carsLeft < 0) {
      appContext.setIsFormComplete(false);
      appContext.setAlert(true);
    } else if (appContext.formData && appContext.formData["content"]) {
      appContext.setIsFormComplete(true);
      appContext.setAlert(false);
    } else {
      appContext.setIsFormComplete(false);
      appContext.setAlert(false);
    }
  });

  useEffect(() => {
    const newFormData = {
      content: appContext.noteInput,
      userName: appContext.user,
    };

    appContext.setFormData(newFormData);
    // eslint-disable-next-line
  }, [appContext.noteInput]);

  //

  return (
    <div className="App">
      <Form />
      <List />
    </div>
  );
}

export default Home;
