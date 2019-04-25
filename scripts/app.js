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
const newChatForm = document.querySelector('.new-chat');

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});


// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('movies', 'thom');

// get the chats that were previously added to the database
chatroom.getChats(data => chatUI.render(data));

