import React from "react";
import styled from "styled-components";
import Messages from "../../Messages";
import Users from "../../Users";

const compare = (list1, list2) => {
  return JSON.stringify(list1) !== JSON.stringify(list2);
};

const PublicChat = ({ socket, user, users, setUsers, chat }) => {
  const [message, setMessage] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!chat) ref.current.style.transition = "none";
      else ref.current.style.transition = "all .3s ease";
    });
  }, [chat, refs]);

  React.useEffect(() => {
    socket.start(user.user.name);
    let timer = setInterval(() => {
      if (compare(socket.getUsers(), users)) {
        setUsers([...socket.getUsers()]);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [setUsers, user, socket]);

  return (
    <>
      <ChatDiv vis={chat}>
        <LeftSide ref={refs[0]} toggle={toggle}>
          <Chat>
            <Messages chatChannel="chat" socket={socket} />
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
        <RightSide ref={refs[1]} toggle={toggle}>
          <Users users={users} />
        </RightSide>
        <Toggle onClick={() => setToggle(!toggle)}>
          <Img ref={refs[2]} toggle={toggle} src="/icons/arrow.png" />
        </Toggle>
      </ChatDiv>
    </>
  );
};

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
  visibility: ${(p) => (!p.vis ? "hidden" : "visible")};
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

export default PublicChat;
