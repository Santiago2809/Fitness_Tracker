import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export function Input({ number = false, error = null, value = '', onChange = () => {}, label = '', onIconPress = () => {} }) {
    return (
        <View style={style.inputContainer}>
            <TextInput
                value={value}
                onChangeText={onChange}
                mode="outlined"
                label={label}
                keyboardType={number ? 'numeric' : 'default'}
                style={[style.input, { backgroundColor: 'white' }]}
                outlineColor={error ? 'red' : 'black'}
                activeOutlineColor="black"
                right={value.length > 3 ? <TextInput.Icon icon="close-circle-outline" onPress={onIconPress} /> : null}
            />
            {error && (
                <Text variant="bodySmall" className="text-red-500">
                    {error}
                </Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    inputContainer: {
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
    },
});
