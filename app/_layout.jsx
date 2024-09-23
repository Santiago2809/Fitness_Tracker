import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeLayout() {

    return (
        <SafeAreaView>
            <Slot />
        </SafeAreaView>
    )
}