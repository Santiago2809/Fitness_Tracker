import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, IconButton, Modal, PaperProvider, Portal, Text } from 'react-native-paper';
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';
import { useHistory } from '../../../hooks/useHistory';

const HISTORIAL = [
    {
        id: 1,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 2,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 3,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 4,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 5,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 6,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 7,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 8,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 9,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 10,
        fecha: "2017-21-01T00:00:00"
    },
    {
        id: 11,
        fecha: "2017-21-01T00:00:00"
    },
]

const Index = () => {

    const [error, isLoading, history] = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState(null);
    // const [filteredData, setFilteredData] = useState(HISTORIAL);
    const [date, setDate] = useState(dayjs());

    function handleDateChange(param) {
        const condition = date.isSame(dayjs(param.date), 'year')
            && date.isSame(dayjs(param.date), 'month')
            && date.isSame(dayjs(param.date), 'day');

        if (condition) return;
        setDate(param.date);
        setFilter(param.date);
        setIsModalOpen(false);
    }

    const dataToDisplay = history?.filter(session => {
        if (filter === null) return true;
        const dataDate = dayjs(session.created_at);
        return dayjs(date).isSame(dataDate, 'day')
    }).sort((a, b) => {
        const dateA = dayjs(a.created_at);
        const dateB = dayjs(b.created_at);
        if (dateA.isBefore(dateB)) {
            return 1;
        } else if (dateA.isAfter(dateB)) {
            return -1;
        } else {
            return 0;
        }
    })

    function handleResetFilter() {
        setFilter(null);
        setDate(dayjs());
    }

    return (
        <PaperProvider>
            <View style={styles.Screen}>
                <Text variant='headlineLarge'>Historial</Text>
                <View>
                    <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", columnGap: 10 }}>
                        <Text variant='titleLarge'>Rutinas realizadas:</Text>
                        {/* <Text variant='titleMedium'>Filter: </Text> */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {filter && <IconButton icon="close" size={25} style={{ margin: 0, padding: 0 }} onPress={handleResetFilter} />}
                            <IconButton icon="calendar" size={25} style={{ margin: 0, padding: 0 }} onPress={() => { setIsModalOpen(true) }} />
                        </View>
                    </View>
                    {isLoading && <ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />}
                    {!isLoading && history && (
                        <FlatList
                            data={dataToDisplay}
                            style={{ marginTop: 5, paddingVertical: 20, maxHeight: '80%' }}
                            renderItem={HistoryItem}
                            ItemSeparatorComponent={<Divider style={{ marginVertical: 5 }} bold />}
                        />
                    )}
                </View>
                <Portal>
                    <Modal
                        visible={isModalOpen}
                        onDismiss={() => setIsModalOpen(false)}
                        style={{ marginHorizontal: 25 }}
                        contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 80, rowGap: 10 }}
                    >
                        <DateTimePicker
                            mode="single"
                            date={date}
                            onChange={handleDateChange}
                        />
                    </Modal>
                </Portal>
            </View>
        </PaperProvider>
    );
}


function HistoryItem({ item }) {
    // console.log(item)
    const date = new Date(item.created_at);
    return (
        <View style={{ marginVertical: 8 }}>
            <Text variant='titleLarge'>{date.toLocaleDateString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Screen: {
        paddingHorizontal: 20,
        paddingTop: 5
    }
})

export default Index;
