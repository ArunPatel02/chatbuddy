import { View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableHighlight, Button } from 'react-native'
import React from 'react'
import BackImage from '../assets/hpge.png'
import Textinput from '../helpers/Input/Textinput'
import CustomButton from '../helpers/Buttons/CustomButton'


const Login = ({ navigation }) => {
    return (
        <KeyboardAvoidingView behavior='padding'>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View className='relative'>
                    <Image source={BackImage} className='h-full w-screen' />
                    <View className='absolute bottom-0 right-0 left-0 bg-foreground-600 rounded-t-[40px] p-8 flex items-center justify-between gap-y-4'>
                        <Text className='text-typography-800 font-semibold  text-3xl text-center '>Express your self with new experiences</Text>
                        <Text className='text-typography-600 text-lg text-center '>chat with stranges across the world and make friends</Text>
                        <View className='w-full'>
                            <Text className='text-typography-600 font-semibold  text-lg mb-1'>Email</Text>
                            <Textinput placeholder='example@xyz.com' />
                            <CustomButton ButtonText="Login" onPress={()=>{navigation.navigate("createProfile")}} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login