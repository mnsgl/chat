import React from "react";
import User from "./User";
import styled from "styled-components";

const Users = () => {
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
    <UserArea>
      {data.map((item, i) => (
        <User key={i} />
      ))}
    </UserArea>
  );
};

const UserArea = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: scroll;
  width: 100%;
  height: 100%;
`;

export default Users;
