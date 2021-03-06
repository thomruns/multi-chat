// UIChat Class



// clear the (DOM) list of chats when the room changes

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  // method to clear the chat UI
  clear() {
    this.list.innerHTML = '';
  }
  // render chat templates to the DOM method
  render(data) {
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );
    const html = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;
    this.list.innerHTML += html;
  }
}
