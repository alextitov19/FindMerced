import "./ChatMessage.css";

function ChatMessage(props) {
  const str = `bubble ${props.direction}`;
  return (
      <div className={str}>{props.message}</div>
  );
}

export default ChatMessage;
