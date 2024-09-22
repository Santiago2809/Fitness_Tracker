import { StatusBar } from 'expo-status-bar';
import { AppRegistry, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Login } from './components/Login';
import { SafeAreaContext, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <View>
                    <Login />
                    <StatusBar />
                </View>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent('Fitness Tracker', () => App);
