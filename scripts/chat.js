// The Chatroom Class



// updating the username

// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }
  // adding new chat documents
  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save chat document to database
    const response = await this.chats.add(chat);
    return response;
  }
  // set up a real-time listener on database to get changes as they occur
  // will iniitally load all previously-added documents when called below
  getChats(callback) {
    this.chats
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added') {
            // update UI here
            callback(change.doc.data());
          }
        });
      });
  }
}

const chatroom = new Chatroom('movies', 'thom');

// get the chats that were previously added to the database
chatroom.getChats((data) => {
  console.log(data);
});
