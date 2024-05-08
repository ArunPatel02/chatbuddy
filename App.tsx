import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Navigation from "./Navigation";
import CustomProvider from "./CustomContext";
// import io from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NativeWindStyleSheet } from "nativewind";
import { usePushNotifications } from "./usePushNotifications";

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();
  // console.log("expo push token: ", expoPushToken, notification);

  // const onLayoutRootView = useCallback(async () => {
  //   console.log("onLayoutRootView", appIsReady);
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  useEffect(() => {
    // console.log("onLayoutRootView", appIsReady);
    const hidescreen = async () => {
      await SplashScreen.hideAsync();
    };
    if (appIsReady) {
      hidescreen();
    }
  }, [appIsReady]);

  return (
    <CustomProvider>
      <View className="h-full">
        <StatusBar style="auto" />
        {/* <Home /> */}
        <Navigation setAppIsReady={setAppIsReady} />
      </View>
    </CustomProvider>
  );
}
