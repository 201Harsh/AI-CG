import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [otp, setotp] = useState(null);
  
  return (
    <UserDataContext.Provider value={{ user, setuser , otp, setotp }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
