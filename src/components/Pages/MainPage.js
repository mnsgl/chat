import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LogOut from "../LogOut";

const MainPage = () => {
  let history = useHistory();
  return (
    <>
      <Container>
        <LogOut></LogOut>
        <ButtonDiv>
          <Button onClick={() => history.push("/login")}>Giriş Yap</Button>
          <Button onClick={() => history.push("/register")}>Kayıt Ol</Button>
        </ButtonDiv>
      </Container>
    </>
  );
};

const ButtonDiv = styled.div``;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
  padding: 20px 170px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 26px;
  transition: all 0.4s ease;
  &:nth-child(1) {
    margin-right: 50px;
  }
  &:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  //background: linear-gradient(to right, #9102b4 35%, #ec0d43);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default MainPage;
