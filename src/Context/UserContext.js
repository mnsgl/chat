import React from "react";

const UserContext = React.createContext({});
const UserProvider = (props) => {
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  return (
    <UserContext.Provider
      value={{ user: [user, setUser], users: [users, setUsers] }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
