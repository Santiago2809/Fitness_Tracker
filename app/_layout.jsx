import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Slot } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "../firebaseConfig";


export default function AppLayout() {

    useEffect(() => {
        onAuthStateChanged(AUTH, (user) => {
            //* Si el usuario esta autenticado lo manda para la pantalla principal de home
            if (user) {
                router.replace("/home")
            }
            //* Si el usuario NO esta autenticado lo manda para la pantalla de bienvenida
            else {
                router.replace("/")
            }
        })
    }, [])

    return (
        <SafeAreaView>
            <Slot />
        </SafeAreaView>
    )
}