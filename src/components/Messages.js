import React from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = () => {
  let data = [
    "ali",
    "ali",
    "mehmet",
    "can",
    "kemal",
    "mustafa",
    "zeynep",
    "ipek",
    "canan",
    "mehmet",
    "can",
    "kemal",
    "mustafa",
    "zeynep",
    "ipek",
    "canan",
    "bulent",
    "pelin",
  ];
  return (
    <MessageArea>
      {data.map((el, i) => (
        <Message key={i} />
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
