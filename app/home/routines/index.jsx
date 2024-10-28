
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoutinesScreen() {
    const routines = [
        { id: '1', valor: 'Rutina buena' },
        { id: '2', valor: 'Rutina mala' },
        { id: '3', valor: 'Rutina curiosa' },

    ];


    return (

        <View style={{ padding: 20 }}>
            <View style={styles.TitlesContainer}>
                <Text style={{ fontSize: 24, marginRight: 20 }}>Mis rutinas</Text>
                <TouchableOpacity>
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
                style={{ maxHeight: 500, marginBottom: 20 }}
            />

            <TouchableOpacity>
                <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
            </TouchableOpacity>

            <View style={styles.TitlesContainer}>
                <Text style={{ fontSize: 24, marginRight: 20 }}>Rutinas existentes</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="arrow-right" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={routines}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rutineItem}>
                        <Text >{item.valor}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                )}
                style={{ maxHeight: 500 }}
            />

            <TouchableOpacity>
                <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    TitlesContainer: {
        flexDirection: 'row',
        alignItems: 'left',
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
