import React from "react";
import styled from "styled-components";
import Messages from "../../Messages";
import Users from "../../Users";

const compare = (list1, list2) => {
  return JSON.stringify(list1) !== JSON.stringify(list2);
};

const PublicChat = ({ socket, chat }) => {
  const [message, setMessage] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  const [isRoomOpen, setIsRoomOpen] = React.useState(false);
  //const [users, setUsers] = React.useState([]);
  let users = ["ali", "mehmet"];

  const join = () => {
    let res = prompt("name : ");
    socket.joinRoom(res);
    setIsRoomOpen(true);
  };
  const create = () => {
    //socket.createRoom();
    setIsRoomOpen(true);
  };

  const close = () => {
    //socket.closeRoom();
    setIsRoomOpen(false);
  };

  return (
    <>
      <Container vis={chat}>
        <Buttons>
          <Button onClick={create} disabled={isRoomOpen}>
            Oluştur
          </Button>
          <Button onClick={join} disabled={isRoomOpen}>
            Katıl
          </Button>
          <Button onClick={close} disabled={!isRoomOpen}>
            Sonlandır
          </Button>
        </Buttons>
        <ChatDiv vis={chat}>
          <LeftSide toggle={toggle}>
            <Chat>
              <Messages socket={socket} />
            </Chat>
            <TextDiv>
              <Input
                placeholder="Type someting..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <SendButton
                onClick={() => {
                  socket.sendMessage(message);
                  setMessage("");
                }}
              >
                Send
              </SendButton>
            </TextDiv>
          </LeftSide>
          <RightSide toggle={toggle}>
            <Users users={users} />
          </RightSide>
          <Toggle onClick={() => setToggle(!toggle)}>
            <Img toggle={toggle} src="/icons/arrow.png" />
          </Toggle>
        </ChatDiv>
      </Container>
    </>
  );
};

const Container = styled.div`
  visibility: ${(p) => (p.vis ? "hidden" : "visible")};
  position: absolute;
  width: 100%;
  margin-top: 200px;
`;

const RightSide = styled.div`
  background-color: rgba(230, 230, 220, 1);
  transition: all 0.3s ease;
  border-left: ${(p) => (p.toggle ? "0px" : "1px solid rgba(0, 0, 0, 0.2)")};
  width: ${(p) => (p.toggle ? "0%" : "30%")};
  height: 100%;
`;

const LeftSide = styled.div`
  transition: all 0.3s ease;
  width: ${(p) => (p.toggle ? "100%" : "70%")};
  height: 100%;
`;

const ChatDiv = styled.div`
  box-shadow: 0px 0px 40px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  width: 100%;
  height: 70vh;
  border-radius: 10px;
  overflow: hidden;
`;

const Chat = styled.div`
  //background-color: rgb(240, 240, 240);
  background-color: transparent;
  width: 100%;
  height: 90%;
`;

const TextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  outline: none;
  border-radius: 10px;
  width: 80%;
  height: 60%;
  font-size: 18px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.6);
  color: rgba(0, 0, 0, 0.9);
`;

const SendButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid rgba(254, 254, 254, 0.9);
  box-shadow: 0px 0px 1px 1px rgba(254, 254, 254, 0.9);
  height: 60%;
  width: 10%;
  margin-left: 7px;
  border-radius: 10px;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #2360f5;
  border-radius: 10px;
  position: absolute;
  right: 0px;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  transition: all 0.2s ease;
  transform: ${(p) => (p.toggle ? "rotate(0deg)" : "rotate(180deg)")};
  width: 40px;
  height: 40px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  outline: none;
  margin-bottom: 50px;
  background-color: transparent;
  border-radius: 5px;
  font-size: 20px;
  color: rgba(254, 254, 254, 0.8);
  border: 3px solid rgba(0, 0, 0, 0.5);
  margin-left: 50px;
  padding: 10px 30px;
  //transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    border: 3px solid rgba(0, 0, 0, 0.8);
    color: rgba(254, 254, 254, 1);
  }
  &:disabled {
    cursor: inherit;
    border: 1px solid rgba(0, 0, 0, 0.3);
    color: rgba(254, 254, 254, 0.4);
  }
`;

export default PublicChat;
