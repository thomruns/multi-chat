// The Chatroom Class

// setting up a real-time listener to get new chats

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
}

const chatroom = new Chatroom('movies', 'thom');
// testing only
// chatroom.addChat('This is a new movies message')
//   .then(() => console.log('new message added'))
//   .catch(err => console.log(err));
