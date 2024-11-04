
import { router } from 'expo-router';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Divider, IconButton, Menu, PaperProvider, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ROUTES } from '../../../util/types';
import { useUserRoutines } from '../../../hooks/useUserRoutines';
import { useState } from 'react';
import { deleteRoutine } from '../../../services/routines';
import { useSystemRoutines } from '../../../hooks/useSystemRoutines';

export default function RoutinesScreen() {
    // const routines = [
    //     { id: '1', valor: 'Rutina buena' },
    //     { id: '2', valor: 'Rutina mala' },
    //     { id: '3', valor: 'Rutina curiosa' },
    //     { id: '4', valor: 'Rutina curiosa' },
    //     { id: '5', valor: 'Rutina curiosa' },
    //     { id: '6', valor: 'Rutina curiosa' },
    //     { id: '7', valor: 'Rutina curiosa' },
    //     { id: '8', valor: 'Rutina curiosa' },
    //     { id: '9', valor: 'Rutina curiosa' },
    // ];

    const [userErrorRoutine, userRoutines, userRoutinesLoading] = useUserRoutines();
    const [systemErrorRoutine, systemRoutines, systemRoutinesLoading] = useSystemRoutines();
    async function handleDeleteRoutine(id) {
        deleteRoutine(id);
    }

    return (

        <PaperProvider>

            <View style={{ padding: 20, backgroundColor: "white", paddingBottom: 40 }}>
                <View style={styles.TitlesContainer}>
                    <Text style={{ fontSize: 24, marginRight: 20 }}>Mis rutinas</Text>
                    <TouchableOpacity onPress={() => router.navigate(ROUTES.ADDROUTINE)}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {
                    userRoutinesLoading
                        ?
                        (<ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />)
                        :
                        userRoutines.length < 1
                            ? (
                                <Text variant='titleMedium' style={{ textAlign: "center", marginVertical: 60 }}>No hay rutinas, agrega una!</Text>
                            )
                            : (
                                <FlatList
                                    data={userRoutines}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <ListItem key={item.id} routine={item} handleDeleteRoutine={handleDeleteRoutine} />
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                    style={{ height: 200, marginBottom: 20 }}
                                />
                            )
                }

                <TouchableOpacity onPress={() => router.navigate(ROUTES.MYROUTINES)}>
                    <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
                </TouchableOpacity>

                <Divider style={{ marginBottom: 50, marginTop: 25 }}></Divider>

                <View style={styles.TitlesContainer}>
                    <Text style={{ fontSize: 24, marginRight: 20 }}>Rutinas existentes</Text>
                </View>

                {
                    systemRoutinesLoading
                        ?
                        (<ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />)
                        :
                        systemRoutines.length < 1
                            ? (
                                <Text variant='titleMedium' style={{ textAlign: "center", marginVertical: 60 }}>No hay rutinas, agrega una!</Text>
                            )
                            : (
                                <FlatList
                                    data={systemRoutines}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <ListItem key={item.id} routine={item} />
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                    style={{ height: 200, marginBottom: 20 }}
                                />
                            )
                }

                <TouchableOpacity onPress={() => router.navigate(ROUTES.SYSTEMROUTINES)}>
                    <Text style={{ textAlign: "right", marginBottom: 20, fontWeight: "bold" }}>Mostrar todas</Text>
                </TouchableOpacity>
            </View>
        </PaperProvider >
    );
}

function ListItem({ routine, handleDeleteRoutine }) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.rutineItem}>
            <Text >{routine.name}</Text>
            {/* <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            </TouchableOpacity> */}
            <Menu
                visible={menuVisible}
                anchor={handleDeleteRoutine ? (<IconButton style={{ marginBottom: -10 }} onPress={() => setMenuVisible(true)} icon="dots-vertical" size={20} />) : null}
                onDismiss={() => setMenuVisible(false)}
            >
                <Menu.Item
                    leadingIcon="delete"
                    title="Eliminar rutina"
                    onPress={() => {
                        handleDeleteRoutine(routine.id)
                        setMenuVisible(false)
                    }}
                />
            </Menu>
        </View>
    )
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
