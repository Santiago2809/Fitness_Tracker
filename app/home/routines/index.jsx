
import { router } from 'expo-router';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ROUTES } from '../../../util/types';

export default function RoutinesScreen() {
    const routines = [
        { id: '1', valor: 'Rutina buena' },
        { id: '2', valor: 'Rutina mala' },
        { id: '3', valor: 'Rutina curiosa' },
        { id: '4', valor: 'Rutina curiosa' },
        { id: '5', valor: 'Rutina curiosa' },
        { id: '6', valor: 'Rutina curiosa' },
        { id: '7', valor: 'Rutina curiosa' },
        { id: '8', valor: 'Rutina curiosa' },
        { id: '9', valor: 'Rutina curiosa' },

    ];

    return (

        <View style={{ padding: 20, backgroundColor: "white" }}>
            <View style={styles.TitlesContainer}>
                <Text style={{ fontSize: 24, marginRight: 20 }}>Mis rutinas</Text>
                <TouchableOpacity onPress={() => router.navigate(ROUTES.ADDROUTINE)}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={routines}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rutineItem}>
                        <Text >{item.valor}</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                style={{ height: 200, marginBottom: 20 }}
            />

            <TouchableOpacity onPress={() => router.navigate(ROUTES.MYROUTINES)}>
                <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
            </TouchableOpacity>

            <Divider style={{ marginBottom: 50, marginTop: 25 }}></Divider>

            <View style={styles.TitlesContainer}>
                <Text style={{ fontSize: 24, marginRight: 20 }}>Rutinas existentes</Text>
            </View>

            <FlatList
                data={routines}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rutineItem}>
                        <Text >{item.valor}</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                style={{ maxHeight: 200, marginBottom: 20 }}
            />

            <TouchableOpacity onPress={() => router.navigate(ROUTES.SYSTEMROUTINES)}>
                <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    TitlesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',

    },
    rutineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 15,

    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',

    },
});
