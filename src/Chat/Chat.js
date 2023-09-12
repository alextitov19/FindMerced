import { useState } from "react";
import "./Chat.css";
import MyChatMessage from "./MyChatMessage.js";

function Chat() {
  const [messages, setMessages] = useState([]);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  function addMessage() {
    var m = messages;
    m.push(value);
    setMessages(m);
    setRenderedOutput(messages.map((item) => <MyChatMessage message={item} />));
    console.log(messages);
  }

  var [renderedOutput, setRenderedOutput] = useState(
    messages.map((item) => <MyChatMessage message={item} />)
  );

  return (
    <div className="chat-div">
      <div className="header">
        <img src="profile.jpeg" className="profile-image" />
        <p className="profile-name">ALynx</p>
      </div>
      <div className="body">{renderedOutput}</div>
      <div className="footer">
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onChange}
        />
        <i
          class="bi bi-send-fill footer-send-button"
          onClick={addMessage}
          value
        ></i>
      </div>
    </div>
  );
}

export default Chat;
