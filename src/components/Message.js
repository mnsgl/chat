import React from "react";
import styled from "styled-components";

const Message = (props) => {
  let userData = props.userData;
  return (
    <>
      <MessageItem>
        <MessageAvatar>A</MessageAvatar>
        <MessageText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </MessageText>
      </MessageItem>
      <hr style={{ margin: "0px auto" }} />
    </>
  );
};

const MessageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0px;
`;
const MessageAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: red;
  margin: 0px 15px;
  padding: 0px;
  font-size: 35px;
  color: white;
`;
const MessageText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  //255, 255, 255,
  margin: 0px;
  width: 90%;
  margin-right: 10px;
  padding: 7px 10px;
`;
export default Message;
