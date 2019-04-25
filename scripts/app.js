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
const newNameForm = document.querySelector('.new-name');
const roomSelector = document.querySelector('.chat-rooms');
const chatTitle = document.querySelector('.page-title');

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim(); // message = id attribute of formfield
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update user name
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom class method
  const newName = newNameForm.name.value.trim(); // name = id attribute of formfield
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show user name change was accepted then hide
  updateMsg.innerText = `You changed your username to ${newName}`;
  setTimeout(() => updateMsg.innerText = '', 3000); 
});

// change chat room
roomSelector.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON') {
    const room = e.target.getAttribute('id');
    console.log(room);
    // clear the UI
    chatUI.clear();
    chatroom.updateRoom(room);
    chatroom.getChats(chat => chatUI.render(chat));
    chatTitle.textContent = `You are in the ${room} chatroom`
  }
});

// check local storage for username and set
const username = localStorage.username ? localStorage.username : 'anon';

// notify who user is logged in as
updateMsg.innerText = `you are logged in as ${username}`
setTimeout(() => updateMsg.innerText = ``, 3000);

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get the chats that were previously added to the database
chatroom.getChats(data => chatUI.render(data));

