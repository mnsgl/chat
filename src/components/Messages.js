import React from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = ({ socket }) => {
  const scrollRef = React.useRef(null);
  const [usersAndMessages, setUsersAndMessages] = React.useState([]);
  React.useEffect(() => {
    socket.getSocket().on("priv-chat", (msg) => {
      let message = JSON.parse(msg);
      setUsersAndMessages((prev) => [...prev, message]);
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    });
  }, [setUsersAndMessages, socket]);
  return (
    <MessageArea ref={scrollRef}>
      {usersAndMessages &&
        usersAndMessages.map((userAndMessage, i) => (
          <Message key={i} userAndMessage={userAndMessage} />
        ))}
    </MessageArea>
  );
};

const MessageArea = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

export default Messages;
