import { useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage.js";

function Chat() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I am Alynx, your personal assistant. You can ask me for directions or any FAQs.",
      direction: "left",
    },
    {
      message:
        "Example: \"Give me directions to the CatCard office\"",
      direction: "left",
    },
  ]);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  function addMessage() {
    var m = messages;
    m.push({message: value, direction: "right"});
    setMessages(m);
    setRenderedOutput(
      messages.map((item) => <ChatMessage message={item.message} direction={item.direction} />)
    );
    console.log(messages);
  }

  var [renderedOutput, setRenderedOutput] = useState(
    messages.map((item) => (
      <ChatMessage message={item.message} direction={item.direction} />
    ))
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
