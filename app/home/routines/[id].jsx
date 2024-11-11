import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Appbar, Button, Divider, Text } from 'react-native-paper';
import { useRoutine } from '../../../hooks/useRoutine';
import { addSession, addSystemRoutines } from '../../../services/history';

export default function RoutineScreen() {

    const { id, user } = useLocalSearchParams();
    const [error, routine, isLoading] = useRoutine(id, user);
    const [addingSession, setAddingSession] = useState(false);
    // console.log(id, user, routine)

    if (error) {
        return <ErrorComponent error={error} />
    }


    async function handleAddSession() {
        if (addingSession) return;
        setAddingSession(true)
        try {
            await addSession(id)
            router.back();
        } catch (error) {
            console.log(error)
        } finally {
            setAddingSession(false);
        }
    }

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Appbar.Header style={styles.Header}>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Rutina" />
            </Appbar.Header>
            {isLoading && <ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />}
            {!isLoading && !error && routine && (
                <View style={{ paddingHorizontal: 30 }}>
                    <Text variant='headlineSmall'>Nombre: {routine.name ?? "No hay nombre"}</Text>
                    {routine.exercises
                        ? (
                            <>
                                <Text variant='headlineSmall' style={{ marginTop: 10 }}>Ejercicios:</Text>
                                <FlatList
                                    data={routine.exercises}
                                    renderItem={ExerciseItem}
                                    ItemSeparatorComponent={<Divider />}
                                    style={{ paddingTop: 20, paddingBottom: 50 }}
                                />

                                <Button mode='elevated'
                                    buttonColor='#FF7F3E'
                                    style={{ alignSelf: "center" }}
                                    textColor='white'
                                    labelStyle={{ fontSize: 17 }}
                                    onPress={handleAddSession}
                                    loading={addingSession}
                                >
                                    Agregar sesion de entrenamiento
                                </Button>
                            </>
                        )
                        : <Text variant='headlineSmall' style={{ textAlign: 'center', marginTop: 80 }}>Esta rutina no es valida, debes borrarla.</Text>
                    }
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: "transparent",
        marginTop: -45,
        marginBottom: 25
    }
})

function ExerciseItem({ item: exercise }) {

    return (
        <Text variant='titleLarge' style={{ marginVertical: 15 }}>{exercise.name} - {exercise.sets} set x {exercise.reps} reps</Text>
    )
}

function ErrorComponent(error) {
    return <View style={{ backgroundColor: "white", height: "100%" }}>
        <Appbar.Header style={styles.Header}>
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="Rutina" />
        </Appbar.Header>
        <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10 }}>
            <Text style={{ textAlign: 'center', marginTop: 15 }} variant='headlineMedium'>{error?.title ?? "Algo ha salido mal."}</Text>
            <Text style={{ textAlign: 'center', marginTop: 15 }} variant='titleLarge'>{error?.message ?? "Intentalo mas tarde."}</Text>
        </View>
    </View>
}