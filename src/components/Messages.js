import React from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = ({
  socket,
  chatChannel,
  cnf = { isPriv: false, cnl: "" },
}) => {
  const scrollRef = React.useRef(null);
  const [usersAndMessages, setUsersAndMessages] = React.useState([]);

  if (cnf.isPriv && cnf.cnl) {
    socket.getSocket().on(cnf.cnl, (msg) => {
      if (msg === "closed") {
        setUsersAndMessages([]);
      }
    });
  }

  React.useEffect(() => {
    socket.getSocket().on(chatChannel, (msg) => {
      let message = JSON.parse(msg);
      setUsersAndMessages((prev) => [...prev, message]);
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    });
  }, [setUsersAndMessages, socket, chatChannel]);

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
