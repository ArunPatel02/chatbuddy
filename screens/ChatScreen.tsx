import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../assets/avatar.jpg";
import Textinput from "../helpers/Input/Textinput";
import Colors from "../Colors";
import { useRoute } from "@react-navigation/native";
import AxiosInstance from "../Api/Index";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CustomContext } from "../CustomContext";
import timeDifference from "../helpers/hooks/timeDifference";

const ChatScreen = () => {
  const route = useRoute();
  const { userId, unreadMessagesCount } = route.params as {
    userId: string;
    unreadMessagesCount: number;
  };

  const { setContactList, contactList, appsocket } = useContext(CustomContext);

  const [Allfetched, setAllfetched] = useState(false);

  const [textMessage, settextMessage] = useState("");

  const [isMarkasReaddone, setisMarkasReaddone] = useState(false);

  const scrollViewRef = useRef();

  const messagesRef = useRef([]);

  const [lastSeenTime, setlastSeenTime] = useState("");

  //   console.log(userId, "userId");
  const [user, setUser] = useState(null);

  const [Messages, setMessages] = useState([]);

  const [batchDate, setbatchDate] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  const [ismessagesFetched, setismessagesFetched] = useState(false);

  const updateContactList = (message) => {
    setContactList((pre) =>
      pre.map((item) =>
        item.connectedUser._id === userId
          ? { ...item, lastMessage: message }
          : { ...item }
      )
    );
  };

  const sendMessage = async () => {
    const transactionId = uuidv4();
    let newMessages = [
      ...Messages,
      {
        text: textMessage,
        status: "sending",
        _id: transactionId,
        receiverId: userId,
      },
    ];
    setMessages((pre) => [
      ...pre,
      {
        text: textMessage,
        status: "sending",
        _id: transactionId,
        receiverId: userId,
      },
    ]);
    messagesRef.current = [
      ...messagesRef.current,
      {
        text: textMessage,
        status: "sending",
        _id: transactionId,
        receiverId: userId,
      },
    ];
    console.log(
      "new message before send",
      Messages.length,
      messagesRef.current.length
    );
    // setMessages(newMessages);
    if (textMessage) {
      const sentText = textMessage;
      Keyboard.dismiss();
      settextMessage("");
      try {
        const response = await AxiosInstance.post("/auth/api/sendMessage", {
          text: sentText,
          receiverId: userId,
          transactionId: transactionId,
          timestamp: new Date(),
        });
        // console.log(response.data.body);
        const newMessagesArray = newMessages.map((message) => {
          if (message._id === String(response.data.body.transactionId)) {
            return { ...response.data.body.messageData };
          } else {
            return { ...message };
          }
        });

        // console.log("new" , newMessagesArray);
        setMessages(newMessagesArray);
        messagesRef.current = newMessagesArray;

        console.log(
          "set the messages",
          Messages.length,
          messagesRef.current.length
        );

        let isOld = false;
        const allContancts = contactList.map((item) => item._id);
        isOld = allContancts.includes(
          response.data.body.contact.senderContact._id
        );

        // console.log("contact is old", isOld);

        if (isOld) {
          updateContactList(response.data.body.messageData);
        } else {
          setContactList((pre) => [
            {
              ...response.data.body.contact.senderContact,
              connectedUser: user,
              lastMessage: response.data.body.messageData,
            },
            ...pre,
          ]);
        }
      } catch (error) {
        console.error("Error sending message to user:", error);
      }
    }
  };

  const markMessagesAsRead = async () => {
    try {
      const response = await AxiosInstance.get(
        `/auth/api/markMessagesAsRead/${userId}`
      );
      // console.log(response.data.body, "markMessagesAsRead");
      const updateMessessageStatus = messagesRef.current.map((item) =>
        response.data.unreadMessages.includes(item._id)
          ? { ...item, status: "read" }
          : { ...item }
      );
      setMessages(updateMessessageStatus);
      messagesRef.current = updateMessessageStatus;
      setisMarkasReaddone(true);
      setAllfetched(true);
      setContactList((pre) =>
        pre.map((item) =>
          item.connectedUser._id === userId
            ? { ...item, unreadMessagesCount: 0 }
            : { ...item }
        )
      );
    } catch (error) {
      console.error("Error making messages as read:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await AxiosInstance.get(
        `/auth/api/getMessages/${userId}`
      );
      // console.log(response.data.body, "messages");
      const fetchMessagesResponse = response.data.body.messages;
      if (response.data.body.messages[0]) {
        let startBatchDate = new Date(
          response.data.body.messages[0].timestamp
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        // console.log(startBatchDate);
        let messageArrayWithBatch = [
          { _id: uuidv4(), type: "dateBatch", value: startBatchDate },
        ];
        for (
          let index = 0;
          index < response.data.body.messages.length;
          index++
        ) {
          const element = response.data.body.messages[index];
          const currentBatchDate = new Date(
            element.timestamp
          ).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          if (currentBatchDate === startBatchDate) {
            messageArrayWithBatch.push(element);
          } else {
            startBatchDate = currentBatchDate;
            setbatchDate(currentBatchDate);
            messageArrayWithBatch.push({
              _id: uuidv4(),
              type: "dateBatch",
              value: currentBatchDate,
            });
            messageArrayWithBatch.push(element);
          }
        }
        // console.log(messageArrayWithBatch);
        setMessages(messageArrayWithBatch);
        messagesRef.current = messageArrayWithBatch;
        // console.log("fetched messages" , messagesRef.current)
        setismessagesFetched(true);
      }
      // setMessages(response.data.body.messages);
      if (!isMarkasReaddone) {
        markMessagesAsRead();
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (appsocket.connected && userId && Allfetched) {
      appsocket.on("new message", (message) => {
        const parseMessage = JSON.parse(message);
        // console.log("New message", userId, parseMessage);
        const currentBatchDate = new Date(
          parseMessage.timestamp
        ).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        if (parseMessage.senderId === userId) {
          if (currentBatchDate === batchDate) {
            setMessages((pre) => [...pre, parseMessage]);
          } else {
            setbatchDate(currentBatchDate);
            setMessages((pre) => [
              ...pre,
              {
                _id: uuidv4(),
                type: "dateBatch",
                value: currentBatchDate,
              },
              parseMessage,
            ]);
          }
        }
      });

      appsocket.on("markMessagesAsRead", (messageIdArray) => {
        const parseMessage = JSON.parse(messageIdArray);

        console.log(
          "read message array",
          parseMessage.unreadMessages,
          parseMessage.unreadMessages.length,
          userId,
          ismessagesFetched,
          Messages.length,
          messagesRef.current.length
        );

        if (ismessagesFetched) {
          if (parseMessage.unreadMessages.length > 0) {
            const updateMessessageStatus = messagesRef.current.map((item) =>
              parseMessage.unreadMessages.includes(item._id)
                ? { ...item, status: "read" }
                : { ...item }
            );
            setMessages(updateMessessageStatus);
            messagesRef.current = updateMessessageStatus;
            console.log(
              "update message status",
              Messages.length,
              messagesRef.current.length
            );
          }
        } else {
          fetchMessages();
        }
      });
    }
  }, [Allfetched]);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await AxiosInstance.get(
            `/auth/api/getFriendUserById/${userId}`
          );
          setUser(response.data.body.userData);
          if (!response.data.body.userData.isOnline) {
            setlastSeenTime(
              timeDifference(new Date(response.data.body.userData.lastSeen))
            );
          }
          fetchMessages();
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    let interval;
    if (user && !user.isOnline) {
      console.log("updating user time");
      interval = setInterval(() => {
        // console.log("updating user time");
        setlastSeenTime(timeDifference(new Date(user.lastSeen)));
      }, 1000*60);
    }

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  useEffect(() => {
    if (!Allfetched) return;
    console.log("changes in messages", userId, Messages.length);
    const filterMessages = Messages.filter(
      (item) => item.senderId === userId && item.status === "sent"
    );
    console.log("filter", filterMessages.length);
    if (filterMessages.length > 0) {
      setTimeout(() => {
        markMessagesAsRead();
      }, 2000);
    }
  }, [Messages.length]);

  return (
    <SafeAreaView className="flex-1">
      {user ? (
        <>
          <View className="flex flex-row gap-x-3 items-center px-3 py-3 bg-secondary-900 border-b-2 border-secondary-800">
            <View>
              <Feather name="chevron-left" size={30} color="gray" />
            </View>
            <View className="h-[50px] w-[50px] rounded-full bg-secondary-900 flex justify-center items-center relative">
              <Image source={Avatar} className="w-full h-full rounded-full" />
              {/* <View className="bg-success w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View> */}
            </View>
            <View className="flex-1 flex-grow">
              <Text
                className="text-typography-950 font-medium text-base"
                numberOfLines={1}
              >
                {user.fullName}
              </Text>
              {user.isOnline ? (
                <Text
                  className="text-success-500 font-medium text-[15px]"
                  numberOfLines={1}
                >
                  Online
                </Text>
              ) : (
                <Text
                  className="text-typography-700 font-medium text-[15px]"
                  numberOfLines={1}
                >
                  last seen {lastSeenTime} ago
                </Text>
              )}
            </View>
            <View className="flex-row gap-x-4">
              <Feather name="video" size={22} color="gray" />
              <Feather name="phone" size={22} color="gray" />
              <Feather name="more-vertical" size={22} color="gray" />
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onLayout={(event) => {
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: false });
              }
            }}
            onContentSizeChange={() => {
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: false });
              }
            }}
          >
            {Messages.length
              ? Messages.map((message) =>
                  message.type === "dateBatch" ? (
                    <Text
                      key={message._id}
                      className="text-typography-900 font-normal text-md my-2 px-4 py-1 bg-secondary-800 text-center mx-auto rounded-[30px]"
                    >
                      {message.value}
                    </Text>
                  ) : String(message.receiverId) === userId ? (
                    <View
                      className="pr-3 max-w-[60%] my-2 ml-auto"
                      key={message._id}
                    >
                      <View className="py-2 bg-primary ml-auto rounded-[20px]">
                        <Text className="px-4 text-[18px] font-normal text-white">
                          {message.text}
                        </Text>
                        <View className="px-3 flex flex-row justify-end items-end gap-x-1">
                          <Text className="text-right text-[12px] mt-1 font-normal text-white">
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </Text>
                          <Feather
                            name={
                              message.status === "sending"
                                ? "clock"
                                : message.status === "read"
                                ? "check-circle"
                                : "check"
                            }
                            size={12}
                            color={"white"}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      className="pl-3 max-w-[60%] my-2 relative"
                      key={message._id}
                    >
                      <View className="p-2 px-4 bg-white mr-auto rounded-[20px]">
                        <Text className="text-[18px] font-normal  text-typography-900">
                          {message.text}
                        </Text>
                        <Text className="text-right text-[12px] mt-1 font-normal text-typography-700">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                    </View>
                  )
                )
              : null}
          </ScrollView>
          <View className="px-3 mb-3">
            <View className="p-3 py-1 flex flex-row justify-between items-center bg-white rounded-[50px]">
              <View className="ml-2">
                <Feather name="paperclip" size={26} color="gray" />
              </View>
              <View className="h-3/4 bg-background-300 w-[2px] ml-4 mr-2"></View>
              <Textinput
                placeholder="Type a message..."
                className="border-0 border-l-0 rounded-none border-background-300 mb-0 w-[70%] h-fit"
                value={textMessage}
                onChangeText={(text) => settextMessage(text)}
                multiline
                numberOfLines={2}
                onPressIn={() => {}}
              />
              {textMessage ? (
                <TouchableOpacity
                  className="ml-0 rounded-full p-0 flex-1 items-center justify-center"
                  activeOpacity={0.6}
                  onPress={() => sendMessage()}
                >
                  {/* <View className="ml-0 rounded-full p-0 flex-1 items-center justify-center"> */}
                  <Feather
                    name="send"
                    size={30}
                    color={Colors.primary.DEFAULT}
                  />
                  {/* </View> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="ml-0 rounded-full p-0 flex-1 items-center justify-center"
                  activeOpacity={0.6}
                >
                  {/* <View className="ml-0 rounded-full p-0 flex-1 items-center justify-center"> */}
                  <Feather
                    name="mic"
                    size={30}
                    color={Colors.primary.DEFAULT}
                  />
                  {/* </View> */}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default ChatScreen;
