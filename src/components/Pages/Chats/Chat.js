import React from "react";
import PrivateChat from "./PrivateChat";
import PublicChat from "./PublicChat";
import styled from "styled-components";
import LogOut from "../../LogOut";
import { UserContext } from "../../../context/UserContext";
import { SocketContext } from "../../../context/SocketContext";

function Chat() {
  const [user] = React.useContext(UserContext).user;
  const [users, setUsers] = React.useContext(UserContext).users;
  const [socket] = React.useContext(SocketContext);
  const join = () => {
    console.log(prompt("name : "));
  };
  const create = () => {};
  return (
    <>
      <LogOut></LogOut>
      <Container>
        <Buttons>
          <Button onClick={join}>Katıl</Button>
          <Button onClick={create}>Oluştur</Button>
        </Buttons>
        <PublicChat
          socket={socket}
          user={user}
          users={users}
          setUsers={setUsers}
        ></PublicChat>
        {false && (
          <PrivateChat
            socket={socket}
            user={user}
            users={users}
            setUsers={setUsers}
          ></PrivateChat>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 1000px;
  height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  outline: none;
  margin-bottom: 50px;
  background-color: transparent;
  border-radius: 5px;
  font-size: 20px;
  color: rgba(254, 254, 254, 0.8);
  border: 2px solid rgba(0, 0, 0, 0.3);
  margin-left: 50px;
  padding: 10px 30px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    border: 2px solid rgba(0, 0, 0, 0.6);
    color: rgba(254, 254, 254, 1);
  }
`;

export default Chat;
