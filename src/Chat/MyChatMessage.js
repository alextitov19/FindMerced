import './MyChatMessage.css'

function MyChatMessage(props) {
    return (
        <div className="my-chat-message">
            <div className="my-chat-message-text">
                {props.message}
            </div>
        </div>
    )
}

export default MyChatMessage