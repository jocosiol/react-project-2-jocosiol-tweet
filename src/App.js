import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./Home";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import AppContext from "./context/AppContext";

function App() {
  const [user, setUser] = useState();
  const [noteInput, setNoteInput] = useState();
  const [formData, setFormData] = useState();
  const [notesArray, setNotesArray] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [carsLeft, setCarsLeft] = useState(140);
  const [alert, setAlert] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [userInput, setUserInput] = useState();
  const [userInputFilled, setUserInputFilled] = useState(false);
  const [tweetsDB, setTweetsDB] = useState([]);
  const [redirect, setRedirect] = useState();
  const [loginUser, setLoginUser] = useState();
  const [loginUserDisplayName, setLoginUserDisplayName] = useState();
  const [loginUserId, setLoginUserId] = useState();

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        noteInput: noteInput,
        setNoteInput: setNoteInput,
        formData: formData,
        setFormData: setFormData,
        notesArray: notesArray,
        setNotesArray: setNotesArray,
        isFormComplete: isFormComplete,
        setIsFormComplete: setIsFormComplete,
        carsLeft: carsLeft,
        setCarsLeft: setCarsLeft,
        alert: alert,
        setAlert: setAlert,
        loadingActive: loadingActive,
        setLoadingActive: setLoadingActive,
        userInput: userInput,
        setUserInput: setUserInput,
        userInputFilled: userInputFilled,
        setUserInputFilled: setUserInputFilled,
        tweetsDB: tweetsDB,
        setTweetsDB: setTweetsDB,
        redirect: redirect,
        setRedirect: setRedirect,
        setLoginUser: setLoginUser,
        loginUser: loginUser,
        loginUserId: loginUserId,
        setLoginUserId: setLoginUserId,
        loginUserDisplayName: loginUserDisplayName,
        setLoginUserDisplayName: setLoginUserDisplayName,
      }}
    >
      <Router>
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
