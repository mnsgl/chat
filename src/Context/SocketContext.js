import React from "react";
import Socket from "../socket/app";

const SocketContext = React.createContext({});
const SocketProvider = (props) => {
  const [socket] = React.useState(new Socket("http://localhost:5000"));
  return (
    <SocketContext.Provider value={[socket]}>
      {props.children}
    </SocketContext.Provider>
  );
};
export { SocketProvider, SocketContext };
