import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import { userRegister } from '../../services/auth';
import { Input } from '../UI/Register/Input';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const [error, setError] = useState({});

    function handleRegister() {
        if (!name.match(/^[A-Za-z]{2,}$/)) {
            setError((prev) => ({ ...prev, name: 'Ingresa un nombre valido, solo letras y mayor a 2 caracteres' }));
        }
        if (email.length < 4 && password.length < 6 && name.length < 4) {
            return;
        }
        // userRegister(email, password, name);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={style.container}>
                <Appbar>
                    <Appbar.BackAction
                        onPress={() => {
                            router.replace('/');
                        }}
                    />
                </Appbar>
                <Text variant="headlineLarge" style={style.title}>
                    Registrarse
                </Text>
                <Input value={name} error={error.name} onChange={(text) => setName(text)} label="Nombre(s)" onIconPress={() => setName('')} />
                <Input value={email} onChange={(text) => setEmail(text)} label="Correo electronico" onIconPress={() => setEmail('')} />
                <Input value={password} onChange={(text) => setPassword(text)} label="Contraseña" onIconPress={() => setPassword('')} />
                <Input value={gender} onChange={(text) => setGender(text)} label="Género" onIconPress={() => setGender('')} />
                <Input value={height} onChange={(text) => setHeight(text)} label="Estatura" number={true} onIconPress={() => setHeight('')} />
                <Input value={weight} onChange={(text) => setWeight(text)} label="Peso" number={true} onIconPress={() => setWeight('')} />

                <Button
                    onPress={handleRegister}
                    mode="elevated"
                    buttonColor="#FF7F3E"
                    textColor="white"
                    style={{
                        width: 200,
                        borderRadius: 250,
                        marginTop: 15,
                        alignSelf: 'center',
                    }}
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
    );
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
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontWeight: 'semibold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        // borderWidth: 1,
        // borderRadius: 8,
        paddingHorizontal: 10,
        // marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        marginVertical: 15,
        backgroundColor: 'white',
    },
});
