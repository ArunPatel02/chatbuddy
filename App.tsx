import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Navigation from "./Navigation";
import CustomProvider from "./CustomContext";
// import io from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NativeWindStyleSheet } from "nativewind";
import { usePushNotifications } from "./usePushNotifications";
import * as Updates from "expo-updates";

SplashScreen.preventAutoHideAsync();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { expoPushToken, notification } = usePushNotifications();

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        alert("updates is available");
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
      console.log(`Error fetching latest Expo update: ${error}`)
    }
  }

  useEffect(() => {
    // console.log("onLayoutRootView", appIsReady);
    const hidescreen = async () => {
      await SplashScreen.hideAsync();
    };
    if (appIsReady) {
      hidescreen();
      onFetchUpdateAsync();
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
