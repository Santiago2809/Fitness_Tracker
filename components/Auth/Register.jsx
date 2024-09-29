import { router } from "expo-router";
import { useState } from "react";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { userRegister } from "../../services/auth";


export function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [gender, setGender] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")

    function handleRegister() {
        if (email.length < 4 && password.length < 6 && name.length < 4) { return }
        userRegister(email, password, name)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={style.container}>
                <Appbar>
                    <Appbar.BackAction onPress={() => { router.replace("/") }} />
                </Appbar>
                <Text variant="headlineLarge" style={style.title}>
                    Registrarse
                </Text>
                <View style={[style.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        mode="outlined"
                        style={style.input}
                        placeholder="Nombre(s)"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Correo electronico"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Contraseña"
                        secureTextEntry={!passwordVisible}
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        value={gender}
                        onChangeText={(text) => setGender(text)}
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Genero"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="arrow-down-circle-outline" />}
                    />
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        value={height}
                        onChangeText={(text) => setHeight(text)}
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Estatura"
                        keyboardType="numeric"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon={() => <Text style={{ color: 'grey' }}>cm</Text>} />}
                    />
                </View>

                <View style={style.inputContainer}>
                    <TextInput
                        value={weight}
                        onChangeText={(text) => setWeight(text)}
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Peso"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon={() => <Text style={{ color: 'grey' }}>kg</Text>} />}
                    />
                </View>

                <Button
                    onPress={handleRegister}
                    mode="elevated"
                    buttonColor="#FF7F3E"
                    textColor="white"
                    style={{ width: 200, borderRadius: 250, marginTop: 15, alignSelf: 'center' }}
                    labelStyle={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                >
                    Crear cuenta
                </Button>
            </View>
        </TouchableWithoutFeedback>
    )
}

const style = StyleSheet.create({
    screen: {
        height: 100,
    },
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    title: {
        alignSelf: "flex-start",
        textAlign: 'left',
        fontWeight: 'semibold'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        marginVertical: 15,
        backgroundColor: "white"
    },
})