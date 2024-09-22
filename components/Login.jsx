import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto"
import { useFonts } from "expo-font"
import { Image, StyleSheet, View } from "react-native"
import { Button, Text } from "react-native-paper"

const img1 = require("../assets/imagen_1.jpg")
const img2 = require("../assets/imagen_2.png")
const img3 = require("../assets/imagen_3.png")
const img4 = require("../assets/imagen_4.png")

export const Login = () => {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold
    })

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Espera</Text>
            </View>
        )
    }


    return (
        <View style={style.all}>
            <Text variant="displayMedium" style={[style.text, { fontWeight: 'bold' }]}>Fitness Tracker</Text>
            <Text variant="headlineSmall" style={style.text}>¡Registra y administra tus ejercicios y rutinas!</Text>
            <View style={style.imgContainer}>
                <Image source={img1} style={style.image} />
                <Image source={img2} style={style.image} />
                <Image source={img3} style={style.image} />
                <Image source={img4} style={style.image} />
            </View>
            <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Button
                    mode="text"
                    textColor="#FF7F3E"
                    labelStyle={{ fontSize: 22, padding: 20 }}
                >
                    Registrarse
                </Button>
                <Button
                    mode="contained"
                    buttonColor="#FF7F3E"
                    textColor="white"
                    style={{ width: '260px', borderRadius: 250 }}
                    labelStyle={{ fontSize: 22, paddingHorizontal: 10, paddingVertical: 5 }}
                >
                    Iniciar Sesion
                </Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    all: {
        fontFamily: 'Roboto_400Regular',
        padding: '10px'
    },
    text: {
        color: 'black',
        marginTop: 25,
        textAlign: 'center',
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '50px',
    },
    image: {
        width: '150px',
        height: '135px',
        resizeMode: 'center',
    }
})