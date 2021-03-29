import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const ref = React.useRef(null);
  const history = useHistory();
  const login = async () => {
    if (!name || !pass) {
      ref.current.style.visibility = "visible";
    }
    let response = await fetch(
      "http://localhost:5000/api/user/login/" + name + "/" + pass,
      { method: "GET" }
    );
    console.log(name);
    console.log(pass);
    if (response.status === 404) {
      // error
      return;
    }
    if (response.status === 204) {
      ref.current.style.visibility = "visible";
      return;
    }
    ref.current.style.visibility = "hidden";

    let result = await response.json();
    setUser(result);
    history.push("/publichat");
  };
  return (
    <Container>
      <RegisterDiv>
        <Text>Giriş</Text>
        <Input
          placeholder="Kullanıcı adı..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Şifre..."
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <Info ref={ref}>Kullanıcı adı veya şifre geçersiz</Info>
        <Button onClick={login}>Giriş Yap</Button>
      </RegisterDiv>
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  height: 100vh;
  margin: auto;
`;

const RegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 600px;
  //background-color: blue !important;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Text = styled.p`
  text-align: center;
  font-size: 70px;
  font-family: MesloLGS NF;
  font-weight: 700;
  letter-spacing: 5px;
  margin-top: 0px;
  margin-bottom: 50px;
  color: rgba(255, 255, 255, 0.9);
`;

const Input = styled.input`
  padding: 2px 20px;
  border: none;
  outline: none;
  width: 500px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  transition: all 0.4s ease;
  font-size: 26px;
  margin-bottom: 30px;
  &:focus {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 255, 0.6);
  }
  &::placeholder {
    letter-spacing: 1px;
    color: gray;
    font-size: 22px;
  }
`;

const Button = styled.button`
  margin-top: 60px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  outline: none;
  font-size: 26px;
  background-color: transparent;
  padding: 15px 220px;
  transition: all 0.4s ease;
  &:hover {
    cursor: pointer;
    border-color: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
`;

const Info = styled.div`
  font-size: 24px;
  visibility: hidden;
  color: white;
`;

export default Login;
