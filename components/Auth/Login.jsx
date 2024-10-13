import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userLogin } from '../../services/auth';

export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    function handleLogin() {
        if (!email.match(/\w{3,}@[a-z]{3,}\.\D{2,}/)) {
            setError('Por favor ingrese un email valido');
            return;
        }
        if (password.length < 2) {
            setError('Por favor ingrese una contraseña valida');
            return;
        }
        const isError = userLogin(email, password);
        isError.then().catch((error) => {
            setError(error.message);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Appbar className="bg-white" style={{ backgroundColor: 'white' }}>
                    <Appbar.BackAction
                        onPress={() => {
                            router.replace('/');
                        }}
                    />
                </Appbar>

                <View className="mb-8">
                    <Text style={styles.welcomeText}>¡Bienvenido de nuevo!</Text>
                    <View style={{ minHeight: 65, width: '100%' }}>
                        {error && (
                            <Text variant="titleLarge" className="text-red-600 text-center pt-3">
                                {error}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Correo electrónico" style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
                    {email.length > 0 && (
                        <TouchableOpacity onPress={() => setEmail('')}>
                            <Icon name="close-circle" size={24} color="#999" style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={(value) => setPassword(value)} secureTextEntry={!passwordVisible} />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Icon name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#999" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.forgotPassword}>¿Has olvidado tu contraseña?</Text>

                <Button mode="contained" buttonColor="#FF7F3E" textColor="white" style={styles.loginButton} onPress={handleLogin}>
                    Iniciar sesión
                </Button>

                <Link asChild href="/auth/register">
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        ¿No tienes una cuenta? <Text style={{ color: '#FF7F3E', fontWeight: 'bold' }}>Regístrate</Text>
                    </Text>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 150,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: 20,
        color: '#FF7F3E',
        fontWeight: 'bold',
    },
    loginButton: {
        marginBottom: 20,
        borderRadius: 20,
        marginTop: 80,
        width: 180,
        alignSelf: 'center',
    },
});
