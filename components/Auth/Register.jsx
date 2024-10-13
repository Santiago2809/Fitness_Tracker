import { router } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, RadioButton, Text } from 'react-native-paper';
import { userRegister } from '../../services/auth';
import { Input } from '../UI/Register/Input';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('male');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const [error, setError] = useState({});

    function handleRegister() {
        if (!name.match(/^[A-Za-z\s]{3,}$/)) {
            setError((prev) => ({ ...prev, name: 'Ingresa un nombre valido, solo letras y mayor a 2 caracteres.' }));
        } else {
            setError((prev) => ({ ...prev, name: null }));
        }
        if (!email.match(/^\w+@[a-z]+\.[a-z]{2,}/)) {
            setError((prev) => ({ ...prev, email: 'Ingresa un email valido.' }));
        } else {
            setError((prev) => ({ ...prev, email: null }));
        }
        if (!password.match(/^(?=.*[!@#$%^&*()_+{}\[\]:;"'|\\<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'|\\<>,.?/~`-]{6,}$/)) {
            setError((prev) => ({ ...prev, password: 'Ingresa una contaseña valida, minimo 6 caracteres, que incluya letras numeros y un caracter especial.' }));
        } else {
            setError((prev) => ({ ...prev, password: null }));
        }
        if (!height.match(/^\d{2,3}$/)) {
            setError((prev) => ({ ...prev, height: 'Ingresa una altura valida.' }));
        } else {
            setError((prev) => ({ ...prev, height: null }));
        }
        if (!weight.match(/^\d{2,3}$/)) {
            setError((prev) => ({ ...prev, weight: 'Ingresa un peso valido.' }));
        } else {
            setError((prev) => ({ ...prev, weight: null }));
        }
        // userRegister({ email, password, name, gender, height, weight });
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
                <ScrollView>
                    <Text variant="headlineLarge" style={style.title}>
                        Registrarse
                    </Text>
                    <Input value={name} error={error.name} onChange={(text) => setName(text.trim())} label="Nombre(s)" onIconPress={() => setName('')} />
                    <Input value={email} error={error.email} onChange={(text) => setEmail(text.trim())} label="Correo electronico" onIconPress={() => setEmail('')} />
                    <Input value={password} error={error.password} onChange={(text) => setPassword(text.trim())} label="Contraseña" onIconPress={() => setPassword('')} />
                    <View className="border border-black rounded-md" style={{ marginHorizontal: 10, marginVertical: 15 }}>
                        <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
                            <RadioButton.Item color="#FF7F3E" label="Hombre" labelVariant="titleMedium" labelStyle={{ textDecorationLine: gender === 'male' ? 'underline' : 'none' }} value="male" status={gender === 'male' ? 'checked' : 'unchecked'} />
                            <RadioButton.Item
                                color="#FF7F3E"
                                label="Mujer"
                                labelVariant="titleMedium"
                                labelStyle={{ textDecorationLine: gender === 'female' ? 'underline' : 'none' }}
                                value="female"
                                status={gender === 'female' ? 'checked' : 'unchecked'}
                            />
                        </RadioButton.Group>
                    </View>
                    {/* <Input value={gender} error={error.gender} onChange={(text) => setGender(text)} label="Género" onIconPress={() => setGender('')} /> */}
                    <Input value={height} error={error.height} onChange={(text) => setHeight(text.trim())} label="Estatura" number={true} onIconPress={() => setHeight('')} />
                    <Input value={weight} error={error.weight} onChange={(text) => setWeight(text.trim())} label="Peso" number={true} onIconPress={() => setWeight('')} />

                    <Button
                        onPress={handleRegister}
                        mode="elevated"
                        buttonColor="#FF7F3E"
                        textColor="white"
                        style={{
                            width: 200,
                            borderRadius: 250,
                            marginTop: 15,
                            marginBottom: 50,
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
                </ScrollView>
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
