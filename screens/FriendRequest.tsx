import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
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

const FriendRequest = () => {

  const {FriendRequest , setFriendRequest} = useContext(CustomContext)

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

  const rejectFriendRequest = async (requestId: string) => {
    try {
      const response = await AxiosInstance.post(
        "/auth/api/rejectFriendRequest",
        {
            friendRequestId: requestId,
        }
      );
      if (response.data.success) {
        alert("you have successfully rejected the request");
        setFriendRequest((pre) =>
          pre.filter((item) => String(item._id) !== String(requestId))
        );
      }
      console.log("Friend request rejected successfully", requestId);
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  return (
    <SafeAreaView className="h-screen relative">
      <View className="px-3 py-3 bg-secondary-900 border-b-2 border-secondary-800 justify-center flex flex-row items-center gap-x-3 h-[10%]">
        <Textinput
          placeholder="Enter email/name"
          className="mb-0 bg-white flex-grow"
          enterKeyHint="search"
        />
        <Feather name="search" size={25} color={"#404040"} />
      </View>
      <FlatList
        data={FriendRequest ? FriendRequest : []}
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
                {item.from.fullName}
              </Text>
              <Text
                className="text-typography-500 font-medium mt-1 text-[15px]"
                numberOfLines={1}
              >
                {item.from.email}
              </Text>
            </View>

            <View className="flex flex-row gap-x-4 items-end">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => console.log("press")}
              >
                <Feather name="x-circle" size={30} color={Colors.error[600]} />
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
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FriendRequest;
