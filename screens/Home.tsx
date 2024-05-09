import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../assets/avatar.jpg";
import { CustomContext } from "../CustomContext";
import { deleteToken } from "../helpers/TokenStorage/Index";
import Colors from "../Colors";
import AxiosInstance from "../Api/Index";

const Home = ({ navigation }) => {
  const {
    userData,
    setUserData,
    contactList,
    setContactList,
    appsocket,
    FriendRequest,
  } = useContext(CustomContext);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between mt-2 px-3">
        <View className="h-fit">
          <Text className="text-typography-600 font-medium text-lg">
            Hello {userData.fullName},
          </Text>
          <Text className="text-typography-800 font-semibold text-2xl">
            ChatBuddy
          </Text>
        </View>
        <View className="flex justify-center">
          <Feather name="edit" size={25} color={"#404040"} />
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row gap-x-5 pl-3"
        >
          <View className="flex items-center pt-6">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="search" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Search
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("searchFriends")}
            >
              <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
                <Feather name="user-plus" size={25} color={"#404040"} />
              </View>
            </TouchableWithoutFeedback>
            <Text className="text-typography-800 text-md font-medium mt-1 w-[60px] text-center">
              Send Request
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("friendRequest")}
            >
              <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2 relative">
                <Feather name="user-check" size={25} color={"#404040"} />
                {FriendRequest.length ? (
                  <View className="bg-error-500 px-2 py-1 rounded-full absolute -top-2 -right-2 z-50">
                    <Text className="text-typography-0 font-medium text-xs">
                      {FriendRequest.length}
                    </Text>
                  </View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
            <Text className="text-typography-800 text-md font-medium mt-1 w-[60px] text-center">
              Friend Requests
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("allFriends")}
            >
              <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
                <Feather name="users" size={25} color={"#404040"} />
              </View>
            </TouchableWithoutFeedback>
            <Text className="text-typography-800 text-md font-medium mt-1 w-[60px] text-center">
              All Friends
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="airplay" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Connect
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="at-sign" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Thread
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="camera" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Post
            </Text>
          </View>
          <View className="flex items-center pt-6">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="phone" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Calls
            </Text>
          </View>
          <View className="flex items-center pt-6 mr-8">
            <TouchableWithoutFeedback
              onPress={() => {
                deleteToken().then(() => {
                  console.log("log out");
                  appsocket?.disconnect();
                  AxiosInstance.get(`/auth/api/logout/${userData._id}`).then(
                    (res) => {
                      setUserData({
                        _id: "",
                        fullName: "",
                        dateOfBirth: "",
                        avatar: "",
                        profileComplete: false,
                      });
                      navigation.navigate("login");
                    }
                  );
                });
              }}
            >
              <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
                <Feather name="log-out" size={25} color={"#404040"} />
              </View>
            </TouchableWithoutFeedback>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Log out
            </Text>
          </View>
        </ScrollView>
      </View>
      <View className="flex h-[1.5px] w-full mt-4 bg-tertiary-600"></View>
      {/* <TouchableNativeFeedback
        useForeground
        onPress={() => {
          navigation.navigate("chatscreen");
        }}
        delayPressIn={1000}
        className="w-screen pt-1"
      >
        <View className="flex flex-row gap-x-3 items-center px-3 py-3 rounded-full bg-white">
          <View className="h-[60px] w-[60px] rounded-full bg-secondary-900 flex justify-center items-center relative">
            <Feather name="user-plus" size={30} color={"gray"} />
          </View>
          <View className="flex-1 flex-grow pl-1">
            <Text className="text-typography-950 font-medium text-lg">
              Message Requests
            </Text>
          </View>
          <View className="flex items-end gap-y-1">
            <View className="bg-error-500 px-2 py-1 rounded-full">
              <Text className="text-typography-0 font-medium text-xs">6</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback> */}
      {/* <View className="flex h-[1.5px] w-full bg-tertiary-600"></View> */}
      <FlatList
        data={contactList}
        // scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        className="pt-2"
        ListFooterComponent={<View className="py-3"></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableNativeFeedback
            useForeground
            onPress={() => {
              navigation.navigate("chatscreen", {
                userId: item.connectedUser._id,
                unreadMessagesCount: item.unreadMessagesCount,
              });
            }}
            delayPressIn={1000}
            className="w-screen"
          >
            <View className="flex flex-row gap-x-3 items-center px-3 py-3 rounded-full">
              <View className="h-[60px] w-[60px] rounded-full bg-secondary-900 flex justify-center items-center relative">
                {index % 2 === 0 ? (
                  <Image
                    source={Avatar}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <Feather name="user" size={30} color={"gray"} />
                )}
                {item.connectedUser.isOnline ? (
                  <View className="bg-success w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View>
                ) : (
                  <View className="bg-error w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View>
                )}
              </View>
              <View className="flex-1 flex-grow pl-1">
                <Text className="text-typography-950 font-medium text-lg">
                  {item.connectedUser.fullName}
                </Text>
                <Text
                  className="text-typography-500 font-medium mt-1 text-[15px]"
                  numberOfLines={1}
                >
                  {item.lastMessage.receiverId === item.connectedUser._id
                    ? "me"
                    : item.connectedUser.fullName}{" "}
                  : {item.lastMessage.text}
                </Text>
              </View>
              <View className="flex items-end gap-y-1">
                <Text className="text-typography-500 font-medium text-md">
                  {new Date(item.lastMessage.timestamp).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Text>
                {item.lastMessage.receiverId === item.connectedUser._id ? (
                  <View>
                    <Feather
                      name={
                        item.lastMessage.status === "sent"
                          ? "check"
                          : "check-circle"
                      }
                      size={16}
                      color={Colors.primary.DEFAULT}
                    />
                  </View>
                ) : item.unreadMessagesCount ? (
                  <View className="bg-primary px-2 py-1 rounded-full">
                    <Text className="text-typography-0 font-medium text-xs">
                      {item.unreadMessagesCount}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
