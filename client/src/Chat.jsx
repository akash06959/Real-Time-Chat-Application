import React, { useEffect, useState, useRef } from "react";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const messagesEndRef = useRef(null);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        const handleLoadMessages = (messages) => {
            setMessageList(messages);
        };

        socket.on("receive_message", handleReceiveMessage);
        socket.on("load_messages", handleLoadMessages);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
            socket.off("load_messages", handleLoadMessages);
        };
    }, [socket]);

    // Scroll to bottom whenever messageList changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>ChatStream | Room: {room}</p>
                <div className="live-indicator">
                    <span>🟢</span> Live
                </div>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent, index) => {
                    const isMyMessage = username === messageContent.author;
                    return (
                        <div
                            className="message-container"
                            id={isMyMessage ? "you" : "other"}
                            key={index}
                        >
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                {/* Avatar for 'other' users only */}
                                {!isMyMessage && (
                                    <div className="avatar-circle">
                                        {messageContent.author[0]}
                                    </div>
                                )}

                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{!isMyMessage ? messageContent.author : "You"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Type a message..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Chat;
