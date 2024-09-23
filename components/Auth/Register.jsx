import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";


export function Register() {

    return (
        <View style={style.screen}>
            <Appbar>
                <Appbar.BackAction onPress={() => { router.replace("/") }} />
            </Appbar>
            <View style={style.container}>
                <Text variant="headlineLarge" style={style.title}>
                    Registrarse
                </Text>
                <View style={style.inputs}>
                    <TextInput
                        mode="outlined"
                        style={style.input}
                        placeholder="Nombre(s)"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Apellido(s)"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Correo electronico"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Contraseña"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="cancel" />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Genero"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon="arrow-down-circle-outline" />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Estatura"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon={() => <Text style={{ color: 'grey' }}>cm</Text>} />}
                    />
                    <TextInput
                        mode="outlined"
                        style={[style.input, { backgroundColor: "white" }]}
                        placeholder="Peso"
                        activeOutlineColor="black"
                        right={<TextInput.Icon icon={() => <Text style={{ color: 'grey' }}>kg</Text>} />}
                    />
                </View>
                <Button
                    mode="elevated"
                    buttonColor="#FF7F3E"
                    textColor="white"
                    style={{ width: 200, borderRadius: 250, marginTop: 15 }}
                    labelStyle={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                >
                    Crear cuenta
                </Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    screen: {
        height: 100,
    },
    container: {
        paddingHorizontal: 25,
        alignItems: "center",
    },
    title: {
        alignSelf: "flex-start",
        textAlign: 'left',
        fontWeight: 'semibold'
    },
    input: {
        marginVertical: 15,
        backgroundColor: "white"
    },
    inputs: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        gap: '10'
    }
})