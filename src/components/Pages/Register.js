import React from "react";
//import styled from "styled-components";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const ref = React.useRef(null);
  const history = useHistory();

  const register = async () => {
    if (!name || !pass || !mail) {
      ref.current.style.visibility = "visible";
      ref.current.innerText = "Tüm alanlar doldurulmalıdır.";
      return;
    }
    if (name.length < 7 || name.length > 14) {
      ref.current.style.visibility = "visible";
      ref.current.innerText =
        "Kullanıcı adı uzunluğu 7 den küçük 14 ten büyük olamaz";
      return;
    }
    if (pass.length < 7 || pass.length > 14) {
      ref.current.style.visibility = "visible";
      ref.current.innerText = "Şifre uzunluğu 7 den küçük 14 ten büyük olamaz";
      return;
    }
    if (!/\S+@\S+\.\S+/.test(mail)) {
      ref.current.style.visibility = "visible";
      ref.current.innerText = "Geçersiz mail adresi";
      return;
    }
    ref.current.style.visibility = "hidden";
    let response = await fetch("http://localhost:5000/api/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ name, mail, pass }),
    });
    if (response.status === 400) {
      ref.current.style.visibility = "visible";
      ref.current.innerText = "Böyle bir kullanıcı var";
    }
    if (response.status === 404) {
      // error
    }
    history.push("/login");
  };
  return (
    <>
      <Container>
        <LoginDiv>
          <Text>Kayıt Ol</Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kullanıcı adı..."
          />
          <Input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="E-posta..."
          />
          <Input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Şifre..."
          />
          <Info ref={ref}>Kullanıcı adı veya şifre geçersiz</Info>
          <Button onClick={register}>Kayıt Ol</Button>
        </LoginDiv>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 600px;
  height: 100vh;
  margin: auto;
`;

const LoginDiv = styled.div`
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
export default Register;
