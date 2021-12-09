import { useContext } from "react";
import "../App.css";
import { formatISO } from "date-fns";
import AppContext from "../context/AppContext";
import firebase from "../lib/firebase";

function Form() {
  const appContext = useContext(AppContext);

  const handleChangeNote = (e) => {
    const charCount = e.target.value.length;
    let charLeft = 140 - charCount;
    appContext.setCarsLeft(charLeft);
    appContext.setNoteInput(e.target.value);
  };

  const handleSubmit = () => {
    appContext.setIsFormComplete(false);
    appContext.setLoadingActive(true);
    setTimeout(() => {
      if (appContext.carsLeft > 0) {
        const finalData = appContext.formData;

        finalData["date"] = formatISO(new Date(), "dd-MM-yyyy HH:mm:ss");

        appContext.setNotesArray((prevState) => {
          return [finalData, ...prevState];
        });

        appContext.setNoteInput("");
        appContext.setFormData({});

        const userLogin = firebase.auth().currentUser;
        if (userLogin !== null) {
          firebase
            .database()
            .ref("tweets/" + userLogin.uid + "_" + new Date())
            .set(finalData);
        }

        appContext.setLoadingActive(false);
      }
    }, 500);
  };

  return (
    <div className="form-wrapper">
      <textarea
        className="tweet-form"
        onChange={handleChangeNote}
        type="text"
        placeholder="What you have in mind..."
        value={appContext.noteInput}
      />
      <div className="tweet-bottom">
        <div>
          <div className={`tweet-error-${appContext.alert}`}>
            The tweet can't contain more then 140 chars.
          </div>
        </div>
        <div> </div>
        <div className="tweet-button">
          <img
            className={`loading-${appContext.loadingActive}`}
            src="/loadingLogo.svg"
            alt="loading"
          ></img>
          <button
            disabled={!appContext.isFormComplete}
            className={`submit-button-${!appContext.isFormComplete} tweet`}
            onClick={handleSubmit}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
