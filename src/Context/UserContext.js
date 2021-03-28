import React from "react";

const UserContext = React.createContext({});
const UserProvider = (props) => {
  const [user, setUser] = React.useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
