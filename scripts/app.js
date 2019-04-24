  // Initialize Firebase
(function startup() {
    let config = {
    apiKey: "API_KEY_HERE",
    authDomain: "udemy-modernjs.firebaseapp.com",
    databaseURL: "https://udemy-modernjs.firebaseio.com",
    projectId: "udemy-modernjs",
    storageBucket: "udemy-modernjs.appspot.com",
    messagingSenderId: "626828143138"
  };
  firebase.initializeApp(config);
})();

const db = firebase.firestore(); // reference the database
