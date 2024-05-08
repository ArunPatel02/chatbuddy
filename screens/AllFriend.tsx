import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Textinput from "../helpers/Input/Textinput";
import { Feather } from "@expo/vector-icons";
import Avatar from "../assets/avatar.jpg";
import AxiosInstance from "../Api/Index";
import Colors from "../Colors";

const AllFriends = ({ navigation }) => {
  const [FriendList, setFriendList] = useState(null);

  const getFriendList = async () => {
    try {
      const response = await AxiosInstance.get("/auth/api/getFriendList");
      // console.log("response", response.data.body.friends);
      setFriendList(response.data.body.friends);
    } catch (error) {
      console.error("Error fetching users for friend request:", error);
    }
  };

  useEffect(() => {
    getFriendList();
  }, []);

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
        data={FriendList ? FriendList : []}
        ListFooterComponent={<View className="py-3"></View>}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableNativeFeedback
            useForeground
            onPress={() => {
              navigation.navigate("chatscreen", { userId: item.user._id });
            }}
            key={item._id}
            delayPressIn={1000}
            className="w-screen"
          >
            <View className="flex flex-row gap-x-3 items-center px-3 py-3 rounded-full border-b-0 border-background-300 ">
              <View className="h-[60px] w-[60px] rounded-full bg-secondary-900 flex justify-center items-center relative">
                {index % 2 === 0 ? (
                  <Image
                    source={Avatar}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <Feather name="user" size={30} color={"gray"} />
                )}
              </View>
              <View className="flex-1 flex-grow pl-1">
                <Text className="text-typography-950 font-medium text-lg">
                  {item.user.fullName}
                </Text>
                <Text
                  className="text-typography-500 font-medium mt-1 text-[15px]"
                  numberOfLines={1}
                >
                  {item.user.email}
                </Text>
              </View>

              <View className="flex flex-row gap-x-4 items-end">
                <TouchableOpacity
                  activeOpacity={0.6}
                  //   onPress={() => acceptFriendRequest(item._id)}
                >
                  <Feather
                    name="more-vertical"
                    size={30}
                    // color={"gray"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </SafeAreaView>
  );
};

export default AllFriends;
