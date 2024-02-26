import { View, Text, ScrollView, FlatList, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Divider } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from '../assets/avatar.jpg'

const data = [
  {
    id: '1',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel, where are your and this is very long message",
    lastMessageTime: new Date(),
  },
  {
    id: '2',
    name: "Arun Patel",
    online: false,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '3',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '4',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '5',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '6',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '7',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '8',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '9',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
  {
    id: '10',
    name: "Arun Patel",
    online: true,
    unreadMessages: 8,
    lastMessage: "hello i am arun patel",
    lastMessageTime: new Date(),
  },
];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between mb-6 mt-2 px-3">
        <View className="h-fit">
          <Text className="text-typography-600 font-medium text-lg">
            Hello userName,
          </Text>
          <Text className="text-typography-800 font-semibold text-2xl">
            Appname
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
          <View className="flex items-center">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="search" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Search
            </Text>
          </View>
          <View className="flex items-center">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="airplay" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Connect
            </Text>
          </View>
          <View className="flex items-center">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="at-sign" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Thread
            </Text>
          </View>
          <View className="flex items-center">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="camera" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Post
            </Text>
          </View>
          <View className="flex items-center">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="phone" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Calls
            </Text>
          </View>
          <View className="flex items-center mr-8">
            <View className="h-[55px] w-[55px] rounded-full bg-secondary-900 flex justify-center items-center border-secondary-800 border-2">
              <Feather name="search" size={25} color={"#404040"} />
            </View>
            <Text className="text-typography-800 text-md font-medium mt-1">
              Search
            </Text>
          </View>
        </ScrollView>
      </View>
      <View className="flex h-[1.5px] w-full mt-4 bg-tertiary-600"></View>
      <FlatList
        data={data}
        // scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        className="pt-1"
        ListFooterComponent={<View className="py-3"></View>}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableNativeFeedback useForeground onPress={() => { navigation.navigate("chatscreen") }} delayPressIn={1000} className="w-screen" >
            <View className="flex flex-row gap-x-3 items-center px-3 py-3 rounded-full">
              <View className="h-[60px] w-[60px] rounded-full bg-secondary-900 flex justify-center items-center relative">
                {index % 2 === 0 ? <Image source={Avatar} className='w-full h-full rounded-full' /> : <Feather name="image" size={30} color={"gray"} />}
                {item.online ? (
                  <View className="bg-success w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View>
                ) : <View className="bg-error w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View>}
              </View>
              <View className="flex-1 flex-grow pl-1">
                <Text className="text-typography-950 font-medium text-lg">
                  {item.name}
                </Text>
                <Text className="text-typography-500 font-medium mt-1 text-[15px]" numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <View className="flex items-end gap-y-1">
                <Text className="text-typography-500 font-medium text-md">
                  {new Date(item.lastMessageTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <View className="bg-primary px-2 py-1 rounded-full">
                  <Text className="text-typography-0 font-medium text-xs">
                    {item.unreadMessages}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
