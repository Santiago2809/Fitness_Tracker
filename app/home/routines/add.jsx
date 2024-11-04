import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button, Dialog, Divider, IconButton, Modal, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';
import { useExercises } from '../../../hooks/useExercises';
import { addRoutine } from '../../../services/routines';
import { ROUTES } from '../../../util/types';

const initialState = [
    {
        id: 1,
        name: "Squat",
        sets: 2,
        reps: 8,
    },
    {
        id: 2,
        sets: 4,
        reps: 12,
        name: "Bench press"
    },
    {
        id: 3,
        sets: 3,
        reps: 10,
        name: "Bicep curl"
    },
    {
        id: 4,
        sets: 3,
        reps: 10,
        name: "Bicep curl"
    },
    {
        id: 5,
        sets: 3,
        reps: 10,
        name: "Bicep curl"
    },
    {
        id: 6,
        sets: 3,
        reps: 10,
        name: "Bicep curl"
    },
]

export default function Add() {

    const [error, exerciseToList] = useExercises();

    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [selected, setSelected] = useState("");
    const [formError, setFormError] = useState({});
    const [routineName, setRoutineName] = useState("");

    const [addingLoading, setAddingLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    function handleAddExcercise() {
        if (exercises.length > 8) { return }

        if (sets.trim().length < 1 || Number(sets) < 1) {
            setFormError(prev => ({ ...prev, sets: "Por favor ingrese un numero valido de sets" }))
            return
        }
        if (reps.trim().length < 1 || Number(reps) < 1) {
            setFormError(prev => ({ ...prev, reps: "Por favor ingrese un numero valido de reps" }))
            return;
        }
        if (selected.length < 1) {
            setFormError(prev => ({ ...prev, exercise: "Por favor ingrese el ejercicio" }))
            return
        }


        setExercises(prev => [...prev, {
            id: prev.length + 1,
            ejercicioId: selected,
            name: exerciseToList.find(exercise => exercise.id === selected).name,
            sets,
            reps
        }])
        setSets("")
        setReps("")
        setSelected("");
        setFormError({});
        setIsAdding(false);
    }


    function handleDeleteExercise(id) {
        setExercises(prev => prev.filter(exercise => exercise.id !== id))
    }

    async function handleSaveRoutine() {
        if (routineName.trim().length < 1) {
            setFormError(prev => ({ ...prev, name: "Por favor ingresa un nombre valido." }))
            return
        }
        if (exercises.length < 3) {
            setFormError(prev => ({ ...prev, name: "Tiene que haber minimo 3 ejercicios." }))
            return
        };
        try {
            setAddingLoading(true)
            await addRoutine(routineName, exercises);
            router.replace(ROUTES.ROUTINES);

        } catch (err) {
            console.log(err)
        } finally {
            setAddingLoading(false)
        }

    }

    if (error) {
        return (
            <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10 }}>
                <View style={styles.Header}>
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 'auto' }} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text variant='headlineMedium' style={{ marginRight: 'auto' }}>Añadir rutina</Text>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 15 }} variant='headlineMedium'>{error?.title ?? "Algo ha salido mal."}</Text>
                <Text style={{ textAlign: 'center', marginTop: 15 }} variant='titleLarge'>{error?.message ?? "Intentalo mas tarde."}</Text>
            </View>
        )
    }

    return (
        <PaperProvider>

            <View style={{ backgroundColor: "white", height: "100%", paddingHorizontal: 10 }}>
                <View style={styles.Header}>
                    <TouchableOpacity style={{ marginTop: 5, marginRight: 'auto' }} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text variant='headlineMedium' style={{ marginRight: 'auto' }}>Añadir rutina</Text>
                </View>

                {exercises.length > 0
                    ? (
                        <ExerciseList exercises={exercises} handleDeleteExercise={handleDeleteExercise} scroll={exercises.length > 4} />
                    )
                    : null
                }

                <Portal>
                    <Modal
                        visible={isAdding}
                        onDismiss={() => setIsAdding(false)}
                        style={{ marginHorizontal: 25 }}
                        contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 80, rowGap: 10 }}
                    >
                        <TextInput
                            mode='outlined'
                            outlineColor={formError.sets && "red"}
                            value={sets}
                            onChangeText={(val) => { if (val.match(/^\d*$/) && (Number(val) < 11)) { setSets(val) } }}
                            label="Sets"
                            keyboardType='numeric'
                        />
                        {formError.sets && (<Text variant='labelSmall' style={{ color: "red", marginTop: -5 }}>{formError.sets}</Text>)}

                        <TextInput
                            mode='outlined'
                            outlineColor={formError.reps && "red"}
                            value={reps}
                            onChangeText={(val) => { if (val.match(/^\d*$/) && (Number(val) <= 30)) { setReps(val) } }}
                            label="Reps"
                            keyboardType='numeric'
                        />
                        {formError.reps && (<Text variant='labelSmall' style={{ color: "red", marginTop: -5 }}>{formError.reps}</Text>)}

                        <SelectList
                            placeholder='Elige el ejercicio'
                            searchPlaceholder='Ej. Sentadilla'
                            setSelected={setSelected}
                            boxStyles={{ borderColor: formError.exercise && "red" }}
                            data={exerciseToList.map(exercise => ({ key: exercise.id, value: exercise.name }))}
                            save="key"
                        />
                        <Button mode='elevated' style={{ marginTop: 8 }} onPress={handleAddExcercise} labelStyle={{ fontSize: 18, color: "white" }} buttonColor='#FF7F3E'>
                            Añadir
                        </Button>
                    </Modal>
                </Portal>


                <Portal>
                    <Dialog visible={isConfirming} onDismiss={() => setIsConfirming(false)} style={{ backgroundColor: 'white' }}>
                        <Dialog.Title>Confirmas guardar la rutina?</Dialog.Title>
                        <Dialog.ScrollArea>
                            <Dialog.Content>
                                <Text variant="bodyMedium" style={{ marginBottom: 8 }}>Ponle un nombre a la rutina:</Text>
                                <TextInput mode='outlined' label="Nombre" outlineColor={formError.name && "red"} value={routineName} onChangeText={val => setRoutineName(val)} />
                                {formError.name && <Text variant='bodySmall' style={{ color: 'red', marginTop: 5 }}>{formError.name}</Text>}
                            </Dialog.Content>
                        </Dialog.ScrollArea>
                        <Dialog.Actions>
                            <Button onPress={() => setIsConfirming(false)} textColor='black' mode='outlined'>Cancelar</Button>
                            <Button onPress={handleSaveRoutine} loading={addingLoading} mode='contained' buttonColor='#FF7F3E' style={{ paddingHorizontal: 5 }} textColor='white'>Guardar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>


                <Button
                    mode='elevated'
                    labelStyle={{ fontSize: 18 }}
                    textColor='black'
                    style={styles.AddBtn}
                    icon={isAdding ? "cancel" : "plus-circle-outline"}
                    onPress={() => setIsAdding(true)}
                >
                    Añadir nuevo ejercicio
                </Button>
                <Button mode='elevated' onPress={() => setIsConfirming(true)} style={{ alignSelf: "center", marginTop: 20, paddingHorizontal: 15 }} labelStyle={{ fontSize: 18, color: "white" }} buttonColor='#FF7F3E'>
                    Guardar Rutina
                </Button>
            </View>
        </PaperProvider>
    )
}





function ExerciseContainer({ exercise, handleDeleteExercise }) {
    const { id, sets, reps, name } = exercise;

    return (
        <View style={styles.ExerciseContainer}>
            <Text variant='titleMedium'>{name} a {sets} sets y {reps} repes</Text>
            <IconButton icon="delete" onPress={() => handleDeleteExercise(id)} />
        </View>
    )
}

function ExerciseList({ exercises, handleDeleteExercise, scroll }) {

    return (
        !scroll
            ? (
                <View style={{ marginTop: 10 }}>
                    {exercises.map((exercise, idx) => (
                        <View key={exercise.id}>
                            <ExerciseContainer exercise={exercise} handleDeleteExercise={handleDeleteExercise} />
                            {idx !== exercises.length - 1 &&
                                <Divider style={{ marginVertical: 10 }} bold />
                            }
                        </View>
                    ))}
                </View>
            )
            : (
                <ScrollView
                    style={{ backgroundColor: 'white', flex: 0, marginTop: 10, maxHeight: exercises.length < 5 ? exercises.length * 105 : "50%" }}
                >
                    {exercises.map((exercise, idx) => (
                        <View key={exercise.id}>
                            <ExerciseContainer key={exercise.id} exercise={exercise} handleDeleteExercise={handleDeleteExercise} />
                            {idx !== exercises.length - 1 &&
                                <Divider style={{ marginVertical: 10 }} bold />
                            }
                        </View>
                    ))}
                </ScrollView>
            )
    )
}

const styles = StyleSheet.create({
    Header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ExerciseContainer: {
        backgroundColor: "transparent",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        marginVertical: 8,
        padding: 10,
        borderRadius: 10,
    },
    AddExercise: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        width: '100%',
    },
    AddBtn: {
        alignSelf: "center",
        marginTop: 35
    }
})