import { Slot } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '../../components/UI/Navbar';

export default function HomeLayout() {
    return (
        <View className="px-3 pt-7 h-screen relative">
            <Slot />
            <NavBar />
        </View>
    );
}
