// import { router } from "expo-router";
import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, Dialog, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addExercise, getExercises } from '../../../services/exercise';

export default function ExerciseScreen() {
    const [exercises] = useState([
        { id: '1', name: 'Bench Press' },
        { id: '2', name: 'Squat' },
        { id: '3', name: 'Press militar' },
        { id: '4', name: 'Bicep Curl' },
        { id: '5', name: 'Incline Bench press' },
        { id: '6', name: 'Leg press' },
    ]);

    useEffect(() => {
        (async () => {
            getExercises();
        })();
    }, []);

    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newExercise, setNewExercise] = useState('');

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    async function handleAddExercise() {
        setIsLoading(true);
        const ejercicioId = await addExercise(newExercise);
        setIsLoading(false);
        if (ejercicioId) {
            hideDialog();
            setNewExercise('');
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <View style={styles.addExerciseContainer}>
                <Text style={{ fontSize: 18, marginRight: 10 }}>Agregar nuevo ejercicio</Text>
                <TouchableOpacity style={styles.addButton} onPress={showDialog}>
                    <MaterialCommunityIcons name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={exercises}
                renderItem={({ item }) => (
                    <View style={styles.exerciseItem}>
                        <Text style={styles.exerciseNumberText}>{item.id}</Text>
                        <Text style={{ flex: 1 }}>{item.name}</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Nuevo Ejercicio</Dialog.Title>
                <Dialog.Content>
                    <TextInput label="Nombre del ejercicio" value={newExercise} onChangeText={setNewExercise} placeholder="Ej: Squat" />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancelar</Button>
                    <Button onPress={handleAddExercise} disabled={isLoading}>
                        {isLoading ? 'Loading' : 'Agregar'}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    addExerciseContainer: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    addButton: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    exerciseNumberText: {
        backgroundColor: '#FF7F3E',
        color: '#fff',
        borderRadius: 20,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
        marginRight: 15,
        fontWeight: 'bold',
    },
});
