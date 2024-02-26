import { View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableHighlight, Button } from 'react-native'
import React, { useState } from 'react'
// import BackImage from '../assets/image1.jpg'
import BackImage from '../assets/hpge.png' 
import Textinput from '../helpers/Input/Textinput'
import CustomButton from '../helpers/Buttons/CustomButton'


const CreateProfile = ({ navigation }) => {
    const [dateofbirth, setdateofbirth] = useState("dd/mm/yyyy")
    return (
        <KeyboardAvoidingView behavior='position'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className='relative h-screen w-screen'>
                    <Image source={BackImage} className='w-screen h-[70%] object-contain' />
                    <View className='absolute bottom-0 right-0 left-0 bg-foreground-600 rounded-t-[40px] p-8 flex items-center justify-between gap-y-4'>
                        {/* <Text className='text-typography-800 font-semibold  text-3xl text-center '>Express your self with new experiences</Text> */}
                        <Text className='text-typography-600 text-lg text-center '>chat with stranges across the world and make friends</Text>
                        <View className='w-full'>
                            <Text className='text-typography-600 font-semibold  text-lg mb-1'>Full Name</Text>
                            <Textinput placeholder='Tom Dog' />
                            <View className='flex flex-row gap-x-6'>
                                <View className='flex-[0.7]'>
                                    <Text className='text-typography-600 font-semibold  text-lg mb-1'>Date of birth</Text>
                                    <Textinput placeholder='dd/mm/yyyy'/>
                                </View>
                                <View className='flex-1'>
                                    <Text className='text-typography-600 font-semibold  text-lg mb-1'>Gender</Text>
                                    <View className='flex flex-row gap-x-2'>
                                        <Text className='text-lg py-2 bg-primary-900 text-typography-700 font-semibold text-center rounded-xl border-2 border-primary flex-1'>Male</Text>
                                        <Text className='text-lg py-2 bg-primary-900 text-typography-700 font-semibold text-center rounded-xl border-2 border-primary-800 flex-1'>Female</Text>
                                    </View>
                                </View>
                            </View>
                            <CustomButton ButtonText="Save" onPress={() => { navigation.navigate("choseAvatar") }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default CreateProfile