import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import CreateProfile from "./screens/CreateProfile";
import ChooseAvatar from "./screens/ChoseAvatar";
import ChatScreen from "./screens/ChatScreen";
import { getToken } from "./helpers/TokenStorage/Index";
import AxiosInstance from "./Api/Index";
import { CustomContext } from "./CustomContext";
import Otp from "./screens/Otp";
import SearchFriends from "./screens/SearchFriends";
import FriendRequest from "./screens/FriendRequest";
import AllFriends from "./screens/AllFriend";
import { Socket, io } from "socket.io-client";
import useSocket from "./helpers/hooks/useSocket";
import { AppState } from "react-native";

const Stack = createNativeStackNavigator();

const Navigation = ({ setAppIsReady }) => {
  const {
    setUserData,
    userData,
    setContactList,
    contactList,
    setAppSocket,
    setFriendRequest,
    appsocket,
  } = useContext(CustomContext); // Assuming userdata and setUserData are context values

  // const { socket } = useSocket();

  useEffect(() => {
    getToken().then((token) => {
      if (token) {
        AxiosInstance.get("/auth/api/getUser")
          .then((response) => {
            // console.log(response.data.body.userData);
            setUserData({
              _id: response.data.body.userData._id,
              fullName: response.data.body.userData.fullName,
              dateOfBirth: response.data.body.userData.dateOfBirth,
              avatar: response.data.body.userData.avatar,
              profileComplete: response.data.body.userData.profileComplete,
            });
          })
          .catch((error) => {
            setAppIsReady(true);
            console.error("Error fetching user data:", error);
          });
      } else {
        setAppIsReady(true);
      }
    });
  }, []);

  const getFriendRequest = async () => {
    try {
      const response = await AxiosInstance.get("/auth/api/getFriendRequest");
      // console.log("response", response.data.body.friendRequests);
      setAppIsReady(true);
      setFriendRequest(response.data.body.friendRequests);
    } catch (error) {
      setAppIsReady(true);
      console.error("Error fetching users for friend request:", error);
    }
  };

  const [contactisFetched, setcontactisFetched] = useState(false);

  const fetchContactList = async () => {
    AxiosInstance.get("/auth/api/getContactList")
      .then((response) => {
        // console.log("contacts", response.data.body.contacts);
        setContactList(response.data.body.contacts);
        setcontactisFetched(true);
      })
      .catch((error) => {
        setAppIsReady(true);
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    if (userData.profileComplete && !contactisFetched) {
      fetchContactList();
      getFriendRequest();
    }
  }, [userData.profileComplete, userData._id]);

  let socket: Socket;

  useEffect(() => {
    console.log("connecting the socket started", userData);
    if (
      userData.profileComplete &&
      userData._id &&
      !appsocket &&
      !appsocket?.connected
    ) {
      socket = io("https://chatbuddyapi-production.up.railway.app", {
        withCredentials: true,
        extraHeaders: {
          Authorization: userData._id,
        },
      });
      socket.on("connect", () => {
        console.log("Connected to socket server", socket.id);
      });
      setAppSocket(socket);

      socket.on("receiveFriendRequest", (message) => {
        console.log("receive friend request", message);
        const parseMessage = JSON.parse(message);
        setFriendRequest((pre) => [...pre, parseMessage]);
      });

      socket.on("contact updated", (message) => {
        // console.log("contact updated", message);
        const parseMessage = JSON.parse(message);
        const allContancts = contactList.map((item) => item._id);
        const isOld = allContancts.includes(parseMessage._id);

        // console.log(
        //   "contact is old",
        //   isOld,
        //   contactList,
        //   parseMessage._id,
        //   contactisFetched
        // );

        if (contactisFetched) {
          if (isOld) {
            setContactList((pre) =>
              pre.map((item) =>
                item._id === parseMessage._id ? parseMessage : item
              )
            );
          } else {
            setContactList((pre) => [parseMessage, ...pre]);
          }
        } else {
          fetchContactList();
        }

        // setFriendRequest((pre) => [...pre, parseMessage]);
      });

      socket.on("markMessagesAsReadContact", (message) => {
        console.log("this is read contact message", message);
        console.log("this is read contact list", contactList, contactisFetched);
        const parseData = JSON.parse(message);
        if (contactisFetched) {
          setContactList((pre) =>
            pre.map((item) =>
              item.connectedUser._id === parseData.userId
                ? {
                    ...item,
                    unreadMessagesCount: 0,
                    lastMessage: { ...item.lastMessage, status: "read" },
                  }
                : item
            )
          );
        } else {
          fetchContactList();
        }
      });
    }
  }, [userData.profileComplete, userData._id]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // if (
      //   appState.current.match(/inactive|background/) &&
      //   nextAppState === 'active'
      // ) {
      //   console.log('App has come to the foreground!');
      // }

      // appState.current = nextAppState;
      console.log("AppState -----", nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        {!userData.profileComplete ? (
          <>
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="verifyOtp"
              options={{ headerShown: false }}
              component={Otp}
            />
            <Stack.Screen
              name="createProfile"
              options={{ headerShown: false }}
              component={CreateProfile}
            />
            <Stack.Screen
              name="choseAvatar"
              options={{ headerShown: false }}
              component={ChooseAvatar}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="home"
              options={{ headerShown: false }}
              component={Home}
            />
            <Stack.Screen
              name="chatscreen"
              options={{ headerShown: false }}
              component={ChatScreen}
            />
            <Stack.Screen
              name="searchFriends"
              options={{ headerShown: false }}
              component={SearchFriends}
            />
            <Stack.Screen
              name="friendRequest"
              options={{ headerShown: false }}
              component={FriendRequest}
            />
            <Stack.Screen
              name="allFriends"
              options={{ headerShown: false }}
              component={AllFriends}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
