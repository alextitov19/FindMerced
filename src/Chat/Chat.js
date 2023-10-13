import { useState } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage.js";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


const Chat = (updateMarker) => {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I am Alynx, your personal assistant. You can ask me for directions or any FAQs.",
      direction: "left",
    },
  ]);

  const [value, setValue] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  function clickedRecord() {
    if (listening == true) {
      SpeechRecognition.stopListening();
      setValue(transcript)
    } else {
      SpeechRecognition.startListening();
    }
  } 

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
        <p className="profile-name">Alynx</p>
      </div>
      <div className="body">{renderedOutput}</div>
      <div className="footer">
        <input
          type="text"
          placeholder="Ask me a question..."
          value={value}
          onChange={onChange}
        />
        <p class="footer-send-button-first" onClick={clickedRecord} value>
          RECORD
        </p>
        <p class="footer-send-button" onClick={addMessage} value>
          SEND
        </p>
      </div>
    </div>
  );
}

export default Chat;
