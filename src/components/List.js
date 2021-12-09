import { useEffect, useState } from "react";
import "../App.css";
import firebase from "../lib/firebase";

function List() {
  const [tweetArrayDB, setTweetArrayDB] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef
      .child("tweets")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTweetArrayDB(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  let orderedList = tweetArrayDB.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // var perChunk = 10; // items per chunk

  // var result = orderedList.reduce((resultArray, item, index) => {
  //   const chunkIndex = Math.floor(index / perChunk);

  //   if (!resultArray[chunkIndex]) {
  //     resultArray[chunkIndex] = []; // start a new chunk
  //   }

  //   resultArray[chunkIndex].push(item);

  //   return resultArray;
  // }, []);

  return (
    <div className="list">
      {/* List */}

      {orderedList.map((e) => {
        return (
          <div className="list_item" key={e.id}>
            <div className="list-item-data">
              <div>{e.userName}</div>
              {<div>{e.date}</div>}
            </div>
            {<div className="list-item-tweet">{e.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default List;
