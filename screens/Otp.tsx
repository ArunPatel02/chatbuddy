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
import React, { useContext, useEffect, useState } from "react";
import BackImage from "../assets/hpge.png";
import Textinput from "../helpers/Input/Textinput";
import CustomButton from "../helpers/Buttons/CustomButton";
import AxiosInstance from "../Api/Index";
import { getToken, storeToken } from "../helpers/TokenStorage/Index";
import { CustomContext } from "../CustomContext";
import { usePushNotifications } from "../usePushNotifications";

const Otp = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const { expoPushToken, notification } = usePushNotifications();
  console.log("expo push token: ", expoPushToken);

  const { userData, setUserData } = useContext(CustomContext);

  //   useEffect(() => {
  //     getToken().then((token) => {
  //       console.log("token", token);
  //     });
  //   }, []);

  const verifyOtp = () => {
    console.log("Otp", otp);
    AxiosInstance.post("/auth/api/checkOtp", {
      otp: otp,
      expoPushToken: expoPushToken?.data.toString() || "emulatortoken",
    })
      .then((response) => {
        console.log("data", response.data);
        alert(response.data.message);
        if (response.data.success) {
          if (response.data.profileComplete) {
            setUserData((pre) => ({ ...pre, profileComplete: true }));
            navigation.navigate("home");
          } else {
            navigation.navigate("createProfile");
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert("Something went wrong");
      });
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="relative">
          <Image source={BackImage} className="h-full w-screen" />
          <View className="absolute bottom-0 right-0 left-0 bg-foreground-600 rounded-t-[40px] p-8 flex items-center justify-between gap-y-4">
            <Text className="text-typography-800 font-semibold  text-3xl text-center ">
              Express your self with new experiences
            </Text>
            <Text className="text-typography-600 text-lg text-center ">
              chat with stranges across the world and make friends
            </Text>
            <View className="w-full">
              <Text className="text-typography-600 font-semibold  text-lg mb-1">
                Enter Otp*
              </Text>
              <Textinput
                placeholder="000000"
                onChangeText={(text) => setOtp(text)}
                value={otp}
                maxLength={6}
              />
              <CustomButton
                ButtonText="Verify"
                onPress={() => {
                  verifyOtp();
                }}
                disable={otp ? false : true}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Otp;
