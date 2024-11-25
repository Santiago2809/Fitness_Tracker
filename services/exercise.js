import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { AUTH, DB } from '../firebaseConfig';

export const getExercises = async () => {
    try {
        const querySnapshot = await getDocs(collection(DB, 'Ejercicio'));
        const exercises = [];
        querySnapshot.forEach((doc) => exercises.push({ ...doc.data(), id: doc.id }));
        // console.log(exercises);
        return exercises;
    } catch (err) {
        console.log(err);
    }
};

export const getUserExercises = async () => {
    try {
        const userId = AUTH.currentUser.uid
        const querySnapshot = await getDocs(collection(DB, 'Usuaros', userId, "ejercicios"));
        const userExercises = [];
        querySnapshot.forEach(doc => userExercises.push({ id: doc.id, ...doc.data() }))
        // console.log(userExercises);
        return userExercises;

    } catch (err) {
        console.log(err);
    }
}

export const addExercise = async (name) => {

    const userId = AUTH.currentUser.uid;
    try {
        const exercisesRef = collection(DB, "Usuaros", userId, "ejercicios");
        const docId = await addDoc(exercisesRef, {
            name: name,
        });
        console.log(docId);
        return { ejercicioId: docId.id };
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const deleteExercise = async (exerciseId) => {
    const user = AUTH.currentUser.uid;

    try {
        await deleteDoc(doc(DB, 'Usuaros', user, "ejercicios", exerciseId));
        console.log('Ejercicio eliminado:', exerciseId);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
