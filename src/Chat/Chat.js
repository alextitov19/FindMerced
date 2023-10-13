import { useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage.js";
import axios from "axios";


const Chat = (updateMarker) => {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I am Alynx, your personal assistant. You can ask me for directions or any FAQs.",
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

    sendMessageToServer();


    updateMarker(value)

    setValue("")

    

  }

  function sendMessageToServer() {

    axios
      .post("http://localhost:8080/chat", {
        message: value,
      })
      .then(
        (response) => {
          var s = response["data"];
          console.log(s);
          var m = messages;
          m.push({ message: s, direction: "left" });
          setMessages(m);
          setRenderedOutput(
            messages.map((item) => (
              <ChatMessage message={item.message} direction={item.direction} />
            ))
          );
        },
        (error) => {
          console.log(error);
        }
      );


    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message: value}),
    // };
    // fetch("http://localhost:8080/chat", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ postId: data.id }));

    // fetch("http://localhost:8080/chat", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     message: msg,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json));
  }

  var [renderedOutput, setRenderedOutput] = useState(
    messages.map((item) => (
      <ChatMessage message={item.message} direction={item.direction} />
    ))
  );

  return (
    <div className="button-85">
      <div className="header">
        <img src="profile.jpeg" className="profile-image" />
        <p className="profile-name">ALynx</p>
      </div>
      <div className="body">{renderedOutput}</div>
      <div className="footer">
        <input
          type="text"
          placeholder="Ask me a question..."
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
