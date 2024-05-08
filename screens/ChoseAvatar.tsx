import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
// import BackImage from '../assets/image1.jpg'
import BackImage from "../assets/hpge.png";
import Avatar from "../assets/avatar.jpg";
import CustomButton from "../helpers/Buttons/CustomButton";
import { CustomContext } from "../CustomContext";
import AxiosInstance from "../Api/Index";

const ChooseAvatar = ({ navigation }) => {
  // const [dateofbirth, setdateofbirth] = useState("dd/mm/yyyy")

  const { setUserData } = useContext(CustomContext);

  const submitProfileData = () => {
    AxiosInstance.post("/auth/api/updateUser", {
      avatar: "avatar.jpg",
      profileComplete: true,
    })
      .then((response) => {
        console.log("data", response.data);
        if (response.data.success) {
          alert(response.data.message);
          setUserData((pre) => ({
            ...pre,
            _id: response.data.body.userData._id,
            avatar: "avatar.jpg",
            profileComplete: true,
          }));
          navigation.navigate("home");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="relative h-screen w-screen">
          <Image
            source={BackImage}
            className="w-screen h-[70%] object-contain"
          />
          <View className="absolute bottom-4 right-0 left-0 bg-foreground-600 rounded-t-[40px] p-8 flex items-center justify-between">
            {/* <Text className='text-typography-800 font-semibold  text-3xl text-center '>Express your self with new experiences</Text> */}
            {/* <Text className='text-typography-600 text-lg text-center '>chat with stranges across the world and make friends</Text> */}
            <View className="w-full">
              <Text className="text-typography-600 font-semibold  text-lg mb-6 text-center">
                Chose Avatar
              </Text>
              <View className="flex-row  gap-8 flex-wrap justify-around">
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary-800 border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary-800 border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary-800 border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary-800 border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
                <View className="h-[70px] w-[70px] rounded-full bg-secondary-900 flex justify-center items-center border-primary-800 border-4 overflow-hidden">
                  <Image source={Avatar} className="w-full h-full" />
                </View>
              </View>
              <CustomButton
                ButtonText="Save"
                onPress={() => {
                  submitProfileData();
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChooseAvatar;
