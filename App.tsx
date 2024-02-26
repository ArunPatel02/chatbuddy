import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Home from "./screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import Navigation from "./Navigation";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <View className="h-full">
        <StatusBar style="auto" />
        {/* <Home /> */}
        <Navigation />
      </View>
    </GluestackUIProvider>
  );
}
