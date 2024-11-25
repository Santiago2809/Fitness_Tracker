import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AUTH, DB } from '../firebaseConfig';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

export const userLogin = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(AUTH, email, password);
        /* const { user } = response;
        console.log(user.uid); */
        return null;

    } catch (error) {
        return Promise.reject({ error: true, message: "Correo o contraseña incorrectos. Inténtalo de nuevo." });
    }
};

export const editProfile = async (altura, edad, peso, genero) => {
    const userId = AUTH.currentUser.uid;
    const docRef = doc(DB, 'Usuaros', userId);
    await updateDoc(docRef, {
        edad,
        peso,
        genero,
        altura,
    })
};

export const userRegister = async ({ email, password, name, gender, height, weight }) => {
    try {
        if (name.trim() === "") {
            const error = new Error();
            error.message = "Name must not be empty";
            error.code = "EMPTY_NAME";
        };
        const response = await createUserWithEmailAndPassword(AUTH, email, password);
        const { user } = response;
        await setDoc(doc(DB, 'Usuaros', user.uid), {
            nombre: name,
            genero: gender ? gender : null,
            altura: height ? height : null,
            peso: weight ? weight : null,
        });
        const userExercisesCollectionRef = collection(doc(DB, "Usuaros", user.uid), "ejercicios");
        const defaultExercises = [
            { name: "Bench" },
            { name: "Squat" },
            { name: "Press Militar" },
            { name: "Bicep Curl" },
            { name: "Pull ups" },
            { name: "Extension de tricep" },
        ]
        for (const exercise of defaultExercises) {
            await addDoc(userExercisesCollectionRef, exercise);
        }
        console.log('Guardado con exito');
    } catch (error) {
        //* Ya existe un usuario con ese correo
        if (error.code === 'auth/email-already-in-use') {
            return Promise.reject({ error: true, message: "El correo ya esta en uso" })
        }
        //* El campo name venia vacio 
        if (error.code === "EMPTY_NAME") {
            return Promise.reject({ error: true, message: error.message })
        }
    }
};
