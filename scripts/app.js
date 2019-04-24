// Initialize Firebase IIFE *******************************
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
// ********************************************************


// DOM queries
const chatList = document.querySelector('.chat-list');
const updateMsg = document.querySelector('.update-mssg');


// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'thom');

// get the chats that were previously added to the database
chatroom.getChats(data => chatUI.render(data));

