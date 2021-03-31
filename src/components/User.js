import React from "react";
import styled from "styled-components";

const User = ({ user }) => {
  return (
    <>
      {user && (
        <UserItem>
          <MessageAvatar>{user.slice(0, 1)}</MessageAvatar>
          <UserInfo>{user}</UserInfo>
        </UserItem>
      )}
      <hr style={{ marginBottom: "0px", marginTop: "0px" }} />
    </>
  );
};

const UserItem = styled.div`
  padding: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const MessageAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: blue;
  margin: 0px 15px;
  padding: 0px;
  font-size: 28px;
  line-height: 40px;
  color: white;
  text-transform: uppercase;
`;

const UserInfo = styled.p`
  font-size: 16px;
  text-transform: uppercase;
`;

export default User;
