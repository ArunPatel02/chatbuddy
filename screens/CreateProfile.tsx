import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
// import BackImage from '../assets/image1.jpg'
import BackImage from "../assets/hpge.png";
import Textinput from "../helpers/Input/Textinput";
import CustomButton from "../helpers/Buttons/CustomButton";
import AxiosInstance from "../Api/Index";
import { CustomContext } from "../CustomContext";

const CreateProfile = ({ navigation }) => {
  const [profileData, setprofileData] = useState<{
    gender: "Male" | "Female";
    dateOfBirth?: string;
    fullName?: string;
  }>({ gender: "Male", dateOfBirth: "", fullName: "" });

  const { setUserData } = useContext(CustomContext);

  const submitProfileData = () => {
    console.log("profileData", profileData);
    AxiosInstance.post("/auth/api/updateUser", profileData)
      .then((response) => {
        console.log("data", response.data);
        if (response.data.success) {
          alert(response.data.message);
          setUserData((pre) => ({
            ...pre,
            fullName: profileData.fullName,
            dateOfBirth: profileData.dateOfBirth,
          }));
          navigation.navigate("choseAvatar");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="relative h-screen w-screen">
          <Image
            source={BackImage}
            className="w-screen h-[70%] object-contain"
          />
          <View className="absolute bottom-0 right-0 left-0 bg-foreground-600 rounded-t-[40px] p-8 flex items-center justify-between gap-y-4">
            {/* <Text className='text-typography-800 font-semibold  text-3xl text-center '>Express your self with new experiences</Text> */}
            <Text className="text-typography-600 text-lg text-center ">
              chat with stranges across the world and make friends
            </Text>
            <View className="w-full">
              <Text className="text-typography-600 font-semibold  text-lg mb-1">
                Full Name
              </Text>
              <Textinput
                placeholder="Tom Dog"
                value={profileData.fullName}
                onChangeText={(text) =>
                  setprofileData((pre) => ({ ...pre, fullName: text }))
                }
              />
              <View className="flex flex-row gap-x-6">
                <View className="flex-[0.7]">
                  <Text className="text-typography-600 font-semibold  text-lg mb-1">
                    Date of birth
                  </Text>
                  <Textinput
                    placeholder="dd/mm/yyyy"
                    value={profileData.dateOfBirth}
                    onChangeText={(text) => {
                      setprofileData((pre) => ({ ...pre, dateOfBirth: text }));
                    }}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-typography-600 font-semibold  text-lg mb-1">
                    Gender
                  </Text>
                  <View className="flex flex-row gap-x-1">
                    <TouchableOpacity
                      className="flex flex-1"
                      activeOpacity={0.5}
                      onPress={() => {
                        if (profileData.gender !== "Male") {
                          setprofileData((pre) => ({
                            ...pre,
                            gender: "Male",
                          }));
                        }
                      }}
                    >
                      <View>
                        <Text
                          className={`text-lg py-2 bg-primary-900 text-typography-700 font-semibold text-center rounded-xl border-2 ${
                            profileData.gender === "Male"
                              ? "border-primary"
                              : "border-primary-800"
                          }`}
                        >
                          Male
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1"
                      activeOpacity={0.5}
                      onPress={() => {
                        if (profileData.gender !== "Female") {
                          setprofileData((pre) => ({
                            ...pre,
                            gender: "Female",
                          }));
                        }
                      }}
                    >
                      <View>
                        <Text
                          className={`text-lg py-2 bg-primary-900 text-typography-700 font-semibold text-center rounded-xl border-2 ${
                            profileData.gender === "Female"
                              ? "border-primary"
                              : "border-primary-800"
                          } flex-1`}
                        >
                          Female
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <CustomButton
                ButtonText="Save"
                onPress={() => {
                  submitProfileData();
                  //   navigation.navigate("choseAvatar");
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateProfile;
