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

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");

  //   useEffect(() => {
  //     getToken().then((token) => {
  //       console.log("token", token);
  //     });
  //   }, []);

  const { setUserData } = useContext(CustomContext);

  const handleLogin = () => {
    console.log("email", email);
    AxiosInstance.post("/api/creteUser", { email: email })
      .then((response) => {
        console.log("data", response.data);
        if (response.data.success) {
          alert(response.data.message);
          storeToken(response.data.body.userData.loginToken);
          if (response.data.body.userData.profileComplete) {
            setUserData({
              _id: response.data.body.userData._id,
              fullName: response.data.body.userData.fullName,
              dateOfBirth: response.data.body.userData.dateOfBirth,
              avatar: response.data.body.userData.avatar,
              // profileComplete: response.data.body.userData.profileComplete,
            });
            // navigation.navigate("home");
          }
          alert(`your verification otp is ${response.data.body.otp}`);
          navigation.navigate("verifyOtp");
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
                Email
              </Text>
              <Textinput
                placeholder="example@xyz.com"
                onChangeText={setEmail}
                value={email}
              />
              <CustomButton
                ButtonText="Login"
                onPress={() => {
                  handleLogin();
                }}
                disable={email ? false : true}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
