import { StatusBar } from 'expo-status-bar';
import { AppRegistry, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Welcome } from './components/Auth/Welcome';

export default function App() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <View>
                    <Welcome />
                    <StatusBar />
                </View>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent('Fitness Tracker', () => App);
