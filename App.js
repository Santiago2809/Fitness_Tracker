import { StatusBar } from 'expo-status-bar';
import { AppRegistry, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Login } from './components/Login';

export default function App() {
	return (
		<PaperProvider>
			<View>
				<Login />
				<StatusBar />
			</View>
		</PaperProvider>
	);
}

AppRegistry.registerComponent("Fitness Tracker", () => App);