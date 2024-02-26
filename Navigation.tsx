import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './screens/Home'
import Login from './screens/Login'
import CreateProfile from './screens/CreateProfile'
import ChooseAvatar from './screens/ChoseAvatar'
import ChatScreen from './screens/ChatScreen'

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{animation : "slide_from_right"}}>
                <Stack.Screen name='login' options={{ headerShown: false }} component={Login} />
                <Stack.Screen name='createProfile' options={{ headerShown: false }} component={CreateProfile} />
                <Stack.Screen name='choseAvatar' options={{ headerShown: false }} component={ChooseAvatar} />
                <Stack.Screen name='home' options={{ headerShown: false }} component={Home} />
                <Stack.Screen name='chatscreen' options={{ headerShown: false }} component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

