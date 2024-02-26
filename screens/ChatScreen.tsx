import { View, Text, ScrollView, FlatList, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, Image } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from '../assets/avatar.jpg'
import Textinput from "../helpers/Input/Textinput";
import Colors from "../Colors";

const ChatScreen = () => {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex flex-row gap-x-3 items-center px-3 py-3 bg-secondary-900 border-b-2 border-secondary-800">
                <View>
                    <Feather name="chevron-left" size={36} color="gray" />
                </View>
                <View className="h-[50px] w-[50px] rounded-full bg-secondary-900 flex justify-center items-center relative">
                    <Image source={Avatar} className='w-full h-full rounded-full' />
                    {/* <View className="bg-success w-[18px] h-[18px] rounded-full border-[#ffff] border-2 absolute -bottom-0 -right-1"></View> */}
                </View>
                <View className="flex-1 flex-grow">
                    <Text className="text-typography-950 font-medium text-lg">
                        Arun Patel
                    </Text>
                    <Text className="text-success-500 font-medium text-[15px]" numberOfLines={1}>
                        Online
                    </Text>
                </View>
                <View className="flex-row gap-x-4">
                    <Feather name="video" size={28} color="gray" />
                    <Feather name="phone" size={28} color="gray" />
                    <Feather name="more-vertical" size={28} color="gray" />
                </View>
            </View>
            <ScrollView className="">
                <Text className="text-typography-900 font-normal text-md my-2 px-4 py-1 bg-secondary-800 text-center mx-auto rounded-[30px]">1 April 2023</Text>
                {/* sent message */}
                <View className="pl-3 max-w-[60%] my-2">
                    <Text className="p-2 px-4 bg-white mr-auto text-[18px] font-normal rounded-[20px] text-typography-900">hy</Text>
                </View>
                <View className="pr-3 max-w-[60%] my-2 ml-auto">
                    <Text className="p-2 px-4 bg-primary ml-auto text-[18px] font-normal rounded-[20px] text-white">hello</Text>
                </View>
                <View className="pl-3 max-w-[60%] my-2">
                    <Text className="p-2 px-4 bg-white mr-auto text-[18px] font-normal rounded-[20px] text-typography-900">How are you</Text>
                </View>
                <View className="pr-3 max-w-[60%] my-2 ml-auto">
                    <Text className="p-2 px-4 bg-primary ml-auto text-[18px] font-normal rounded-[20px] text-white">I am fine what about you</Text>
                </View>
            </ScrollView>
            <View className="px-3 mb-3">
                <View className="p-3 py-1 flex flex-row justify-between items-center bg-white rounded-[50px]">
                    <View className="ml-2">
                        <Feather name="paperclip" size={26} color="gray" />
                    </View>
                    <View className="h-3/4 bg-background-300 w-[2px] ml-4 mr-2"></View>
                    <Textinput placeholder="Type a message..." className="border-0 border-l-0 rounded-none border-background-300 mb-0 w-[70%] h-fit" multiline numberOfLines={2} />
                    <View className="ml-2 rounded-full p-0 flex-1 items-center justify-center">
                        <Feather name="send" size={30} color={Colors.primary.DEFAULT} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;
