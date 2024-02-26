import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'

const CustomButton = ({ ButtonText, onPress = () => { } }: { ButtonText: String, onPress?: any }) => {
    return (
        <TouchableHighlight className='rounded-lg mt-8 cursor-pointer' onPress={onPress}><View className='w-full bg-primary py-2 rounded-lg'><Text className='text-2xl text-typography-0 font-semibold text-center'>{ButtonText}</Text></View></TouchableHighlight>
    )
}

export default CustomButton