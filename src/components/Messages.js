import React from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = ({ socket }) => {
  const [usersAndMessages, setUsersAndMessages] = React.useState([]);
  React.useEffect(() => {
    socket.getSocket().on("chat", (msg) => {
      let message = JSON.parse(msg);
      setUsersAndMessages((prev) => [...prev, message]);
    });
  }, [setUsersAndMessages, socket]);
  return (
    <MessageArea>
      {console.log(usersAndMessages)}
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
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

export default Messages;
