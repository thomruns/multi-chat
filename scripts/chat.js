// The Chatroom Class

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  // adding new chat documents method ***********
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
  // get chats method *******************
  // set up a real-time listener on database to get changes as they occur
  // will iniitally load all previously-added documents when called below
  getChats(callback) {
    this.unsub = this.chats
      .where('room', '==', this.room) // never use strict equality here
      .orderBy('created_at') // will require an index created by Firebase
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added') {
            // update UI here
            callback(change.doc.data());
          }
        });
      });
  }
  // updating the username method *****************
  updateName(username) {
    this.username = username;
  }

  // updating the chatroom method *****************
  updateRoom(room) {
    this.room = room;
    console.log('room updated to ' + room); // test only
    if(this.unsub) {
      this.unsub();
    }    
  }
}

