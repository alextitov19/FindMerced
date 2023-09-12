import "./MyChatMessage.css";

function MyChatMessage(props) {
  return <div className="bubble right">{props.message}</div>;
}

export default MyChatMessage;
