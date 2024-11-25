import { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Dialog, Button, ActivityIndicator, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { addExercise, getExercises, deleteExercise, getUserExercises } from '../../../services/exercise';

export default function ExerciseScreen() {
    const [exercises, setExercises] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loadingExcercise, setLoadingExcercise] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newExercise, setNewExercise] = useState('');
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [exerciseToDelete, setExerciseToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false);
        setErrorMessage('');
    };

    const showConfirmDialog = (exercise) => {
        setExerciseToDelete(exercise.id);
        setConfirmVisible(true);
    };
    const hideConfirmDialog = () => {
        setConfirmVisible(false);
        setExerciseToDelete(null);
    };

    useEffect(() => {
        (async () => {
            setLoadingExcercise(true);
            await loadExercises(); // Carga ejercicios db
            setLoadingExcercise(false);
        })();
    }, []);

    const loadExercises = async () => {
        // const exercisesFromDb = await getExercises();
        const userExercises = await getUserExercises();
        setExercises([...userExercises]);
    };

    async function handleAddExercise() {
        setIsLoading(true);
        const exists = exercises.some((exercise) => exercise.name && exercise.name.toLowerCase().trim() === newExercise.toLowerCase().trim());
        if (exists) {
            setErrorMessage('El ejercicio ya existe.');
            setIsLoading(false);
            return;
        }
        if (newExercise.length < 1) {
            setErrorMessage('Por favor ingresa algo, no se permiten valores vacios');
            setIsLoading(false);
            return;
        }
        await addExercise(newExercise.trim());
        setIsLoading(false);
        loadExercises();
        setNewExercise('');
        hideDialog();
    }

    async function handleDeleteExercise() {
        if (exerciseToDelete) {
            const isDeleted = await deleteExercise(exerciseToDelete);
            if (isDeleted) {
                const updatedExercises = exercises.filter((ex) => ex.ejercicioId !== exerciseToDelete);
                setExercises(updatedExercises);
            }
            hideConfirmDialog();
        }
    }

    if (loadingExcercise) {
        return (
            <View className="h-full justify-center">
                <ActivityIndicator animating={true} size={90} />
            </View>
        );
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
                renderItem={({ item, index }) => (
                    <View style={styles.exerciseItem}>
                        <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                        <Text style={{ flex: 1 }}>{item.name}</Text>
                        <TouchableOpacity onPress={() => showConfirmDialog(item)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
                style={{ maxHeight: 500 }}
            />

            <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: 'white' }}>
                <Dialog.Title>Nuevo Ejercicio</Dialog.Title>
                <Dialog.Content>
                    <TextInput mode="outlined" label="Nombre del ejercicio" value={newExercise} onChangeText={setNewExercise} placeholder="Ej: Squat" />
                    {errorMessage ? (
                        <Text style={styles.errorText} className="text-red-500 mt-1">
                            {errorMessage}
                        </Text>
                    ) : null}
                </Dialog.Content>
                <Dialog.Actions>
                    <Button textColor="#ff6a1e" onPress={hideDialog}>
                        Cancelar
                    </Button>
                    <Button textColor="#ff6a1e" onPress={handleAddExercise} disabled={isLoading}>
                        {isLoading ? 'Loading' : 'Agregar'}
                    </Button>
                </Dialog.Actions>
            </Dialog>

            <Dialog visible={confirmVisible} onDismiss={hideConfirmDialog}>
                <Dialog.Title>Confirmar eliminación</Dialog.Title>
                <Dialog.Content>
                    <Text>¿Estás seguro que deseas eliminar este ejercicio?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideConfirmDialog}>Cancelar</Button>
                    <Button onPress={handleDeleteExercise}>Eliminar</Button>
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
