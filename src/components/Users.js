import React from "react";
import User from "./User";
import styled from "styled-components";

const Users = ({ users }) => {
  console.log("users : ", users);
  return (
    <UserArea>
      {users && users.map((user, i) => <User key={i} user={user} />)}
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
