import { View } from 'react-native';
import { Text } from 'react-native-paper';

export function DataField({ title, data }) {
    return (
        <View className="items-center gap-y-3 my-2">
            <Text variant="titleLarge">{title}</Text>
            <Text variant="titleMedium" className="text-[#79747E]">
                {data}
            </Text>
        </View>
    );
}
