import React from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { useHistory } from "react-router-dom";

const LogOut = () => {
  const [socket, setSocket] = React.useContext(SocketContext);
  const [, setUser] = React.useContext(UserContext).user;
  const [, setUsers] = React.useContext(UserContext).users;
  const history = useHistory();
  const logout = () => {
    setUser({});
    socket.getSocket().disconnect();
    setUsers([]);
    setSocket(null);
    history.push("/");
  };
  return <Button onClick={logout}>Çıkış</Button>;
};

const Button = styled.button`
  margin: 0px;
  outline: none;
  border: none;
  padding: 13px 50px;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  background-color: transparent;
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
  }
`;

export default LogOut;
