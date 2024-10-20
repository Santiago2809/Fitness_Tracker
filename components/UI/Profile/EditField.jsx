import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export function EditField({ title, data, onChange, numeric = false }) {
    return (
        <View className="items-center gap-y-3 my-2">
            <Text variant="titleLarge">{title}</Text>
            <TextInput
                keyboardType={numeric ? 'numeric' : 'default'}
                onChangeText={(value) => {
                    if (numeric) {
                        if (value.match(/^(\d+)?$/)) {
                            onChange(value);
                        }
                    } else {
                        onChange(value);
                    }
                }}
                mode="outlined"
                className="w-full"
                style={{ minWidth: 140, textAlign: 'center' }}
                value={data}
            />
        </View>
    );
}
