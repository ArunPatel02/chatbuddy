import React, { createContext, useState, useContext } from "react";
import { Socket } from "socket.io-client";

interface UserData {
  _id: string;
  fullName?: string;
  dateOfBirth?: string;
  avatar?: string;
  profileComplete?: boolean;
}

export const CustomContext = createContext<{
  userData: UserData;
  contactList: any[];
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setContactList: React.Dispatch<React.SetStateAction<any>>;
  appsocket: Socket;
  setAppSocket: React.Dispatch<React.SetStateAction<Socket>>;
  FriendRequest: any[];
  setFriendRequest: React.Dispatch<React.SetStateAction<any>>;
}>({
  userData: {
    _id: "",
    fullName: "",
    dateOfBirth: "",
    avatar: "",
    profileComplete: false,
  },
  contactList: [],
  setUserData: () => null,
  setContactList: () => null,
  appsocket: null,
  setAppSocket: () => null,
  FriendRequest: [],
  setFriendRequest: () => null,
});

const CustomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    fullName: "",
    dateOfBirth: "",
    avatar: "",
    profileComplete: false,
  });

  const [contactList, setContactList] = useState([]);

  const [appsocket, setAppSocket] = useState<Socket>();

  const [FriendRequest, setFriendRequest] = useState([]);

  return (
    <CustomContext.Provider
      value={{
        userData,
        setUserData,
        contactList,
        setContactList,
        appsocket,
        setAppSocket,
        FriendRequest,
        setFriendRequest,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export default CustomProvider;
