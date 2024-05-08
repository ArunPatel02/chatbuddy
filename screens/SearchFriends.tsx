import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Textinput from "../helpers/Input/Textinput";
import { Feather } from "@expo/vector-icons";
import Avatar from "../assets/avatar.jpg";
import AxiosInstance from "../Api/Index";
import Colors from "../Colors";
import { CustomContext } from "../CustomContext";

const data = [
  {
    id: "1",
    fullName: "Arun patel",
    email: "arun@gmail.com",
  },
  {
    id: "2",
    fullName: "John Doe",
    email: "john@gmail.com",
  },
  {
    id: "3",
    fullName: "Alice Smith",
    email: "alice@gmail.com",
  },
  {
    id: "4",
    fullName: "Bob Johnson",
    email: "bob@gmail.com",
  },
  {
    id: "5",
    fullName: "Emma Brown",
    email: "emma@gmail.com",
  },
  {
    id: "6",
    fullName: "Michael Davis",
    email: "michael@gmail.com",
  },
  {
    id: "7",
    fullName: "Sarah Wilson",
    email: "sarah@gmail.com",
  },
  {
    id: "8",
    fullName: "David Lee",
    email: "david@gmail.com",
  },
  {
    id: "9",
    fullName: "Olivia White",
    email: "olivia@gmail.com",
  },
  {
    id: "10",
    fullName: "James Taylor",
    email: "james@gmail.com",
  },
];

const SearchFriends = () => {
  const [userToSendFriendRequest, setUserToSendFriendRequest] = useState(null);

  const { FriendRequest, setFriendRequest } = useContext(CustomContext);

  const acceptFriendRequest = async (requestId: string) => {
    try {
      const response = await AxiosInstance.post(
        "/auth/api/acceptFriendRequest",
        {
          friendRequestId: requestId,
        }
      );
      if (response.data.success) {
        alert("friend request accepted and user added to yout friend list");
        setFriendRequest((pre) =>
          pre.filter((item) => String(item._id) !== String(requestId))
        );
      }
      console.log(
        "Friend request accepted successfully",
        requestId,
        response.data.body.friendRequestData
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const getUsersToSendFriendRequest = async () => {
    try {
      const response = await AxiosInstance.get(
        "/auth/api/getUsersToSendFriendRequest"
      );
      // console.log("response", response.data.body.users);
      setUserToSendFriendRequest(response.data.body.users);
    } catch (error) {
      console.error("Error fetching users for friend request:", error);
    }
  };

  useEffect(() => {
    getUsersToSendFriendRequest();
  }, []);

  const sendFriendRequest = async (userId: string) => {
    try {
      const response = await AxiosInstance.post("/auth/api/sendFriendRequest", {
        friendId: userId,
      });
      if (response.data.success) {
        setUserToSendFriendRequest((pre) =>
          pre.map((item) =>
            String(item._id) === String(userId)
              ? { ...item, sentFriendRequest: true }
              : { ...item }
          )
        );
      }
      console.log("Friend request sent successfully", userId);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <View className="px-3 py-3 bg-secondary-900 border-b-2 border-secondary-800 justify-center flex flex-row items-center gap-x-3 h-[10%]">
        <Textinput
          placeholder="Enter email/name"
          className="mb-0 bg-white flex-grow"
          enterKeyHint="search"
        />
        <Feather name="search" size={25} color={"#404040"} />
      </View>
      <FlatList
        data={userToSendFriendRequest ? userToSendFriendRequest : []}
        ListFooterComponent={<View className="py-3"></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View className="flex flex-row gap-x-3 items-center px-3 py-3 rounded-full border-b-0 border-background-300 ">
            <View className="h-[60px] w-[60px] rounded-full bg-secondary-900 flex justify-center items-center relative">
              {index % 2 === 0 ? (
                <Image source={Avatar} className="w-full h-full rounded-full" />
              ) : (
                <Feather name="user" size={30} color={"gray"} />
              )}
            </View>
            <View className="flex-1 flex-grow pl-1">
              <Text className="text-typography-950 font-medium text-lg">
                {item.fullName}
              </Text>
              <Text
                className="text-typography-500 font-medium mt-1 text-[15px]"
                numberOfLines={1}
              >
                {item.email}
              </Text>
            </View>

            <View className="flex flex-row gap-x-3 items-end">
              {item.sentFriendRequest ? (
                <>
                  <Feather
                    name="x-circle"
                    size={28}
                    color={Colors.error[600]}
                  />
                  {/* <Feather
                    name="check-circle"
                    size={28}
                    color={Colors.success[600]}
                  /> */}
                </>
              ) : item.receiveFriendRequest ? (
                <View className="flex flex-row gap-x-4 items-end">
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => console.log("press")}
                  >
                    <Feather
                      name="x-circle"
                      size={30}
                      color={Colors.error[600]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => acceptFriendRequest(item._id)}
                  >
                    <Feather
                      name="check-circle"
                      size={30}
                      color={Colors.success[600]}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => {
                    // console.log(item._id);
                    sendFriendRequest(item._id);
                  }}
                >
                  <Feather name="plus-circle" size={28} color={"#404040"} />
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchFriends;
