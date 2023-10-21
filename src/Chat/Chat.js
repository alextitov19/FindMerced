import { useState, useEffect } from "react";
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

  const [recordTitle, setRecordTitle] = useState("RECORD");

  const [language, setLanguage] = useState("English");
  const [languageCode, setLanguageCode] = useState("en-US");

  const [mode, selectMode] = useState("directions");

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
      setValue(transcript);
      setRecordTitle("RECORD");
    } else {
      SpeechRecognition.startListening({ language: languageCode });
      setRecordTitle("STOP");
    }
  }

  function sendClicked() {
    if (mode == "directions") {
      getDirections();
    } else {
      addMessage();
    }
  }

  function getDirections() {
    var searchTerm = value
  }

  function addMessage() {
    var m = messages;
    m.push({ message: value, direction: "right" });
    setMessages(m);
    setRenderedOutput(
      messages.map((item) => (
        <ChatMessage message={item.message} direction={item.direction} />
      ))
    );
    console.log(messages);

    sendMessageToServer();

    updateMarker(value);

    setValue("");
  }

  function sendMessageToServer() {
    axios
      .post("http://localhost:8080/chat", {
        message: value,
      })
      .then(
        (response) => {
          var s = response["data"];
          const synth = window.speechSynthesis;
          const u = new SpeechSynthesisUtterance(s);
          u.lang = languageCode;
          synth.speak(u);
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

  const handleModeChange = (event) => {
    selectMode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    switch (event.target.value) {
      case "english":
        setLanguageCode("en-US");
        var m = messages;
        m.push({
          message:
            "Hello! I am Alynx, your personal assistant. You can ask me for directions or any FAQs.",
          direction: "left",
        });
        setMessages(m);
        setRenderedOutput(
          messages.map((item) => (
            <ChatMessage message={item.message} direction={item.direction} />
          ))
        );
        break;
      case "spanish":
        setLanguageCode("es-US");
        var m = messages;
        m.push({
          message:
            "¡Hola! Soy Alynx, tu asistente personal. Puedes pedirme direcciones o preguntas frecuentes.",
          direction: "left",
        });
        setMessages(m);
        setRenderedOutput(
          messages.map((item) => (
            <ChatMessage message={item.message} direction={item.direction} />
          ))
        );
        break;
      case "chinese":
        setLanguageCode("zh-CN");

        var m = messages;
        m.push({
          message:
            "你好！我是 Alynx, 您的私人助理。您可以向我询问路线或任何常见问题解答。",
          direction: "left",
        });
        setMessages(m);
        setRenderedOutput(
          messages.map((item) => (
            <ChatMessage message={item.message} direction={item.direction} />
          ))
        );
        break;
      case "japanese":
        setLanguageCode("zh-CN");

        var m = messages;
        m.push({
          message:
            "こんにちは！私はアリンクス、あなたのパーソナルアシスタントです。道順やよくある質問については私に尋ねてください。",
          direction: "left",
        });
        setMessages(m);
        setRenderedOutput(
          messages.map((item) => (
            <ChatMessage message={item.message} direction={item.direction} />
          ))
        );
        break;
    }
    setRenderedOutput(
      messages.map((item) => (
        <ChatMessage message={item.message} direction={item.direction} />
      ))
    );
  };

  return (
    <div className="button-85">
      <div className="header">
        <select
          className="dropdown"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
        </select>

        <img src="profile.jpeg" className="profile-image" />
        <p className="profile-name">Alynx</p>

        <select className="dropdown" value={mode} onChange={handleModeChange}>
          <option value="directions">Directions</option>
          <option value="catcard">CatCard</option>
        </select>
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
          {recordTitle}
        </p>
        <p class="footer-send-button" onClick={sendClicked} value>
          SEND
        </p>
      </div>
    </div>
  );
};

export default Chat;
