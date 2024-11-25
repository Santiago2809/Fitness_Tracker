import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { useRoutineHistory } from '../../../hooks/useRoutineHistory';
import { useHistory } from '../../../hooks/useHistory';
import { useUserRoutines } from '../../../hooks/useUserRoutines';
import { useSystemRoutines } from '../../../hooks/useSystemRoutines';

const Index = () => {

    // const [val1, val2, val3] = useRoutineHistory("JPm2C5B3G04QPDX12kqY");
    // console.log(val3)
    const [error, isLoading, history] = useHistory();
    const [userError, userRoutines, userLoading] = useUserRoutines();
    const [systemError, systemRoutines, systemLoading] = useSystemRoutines();


    const routineOccurrences = history?.reduce((acc, item) => {
        const { routine_id } = item;
        acc[routine_id] = (acc[routine_id] || 0) + 1;
        return acc;
    }, {});

    let dataToDisplay = [];
    if (routineOccurrences && userRoutines && systemRoutines) {

        // console.log(userRoutines)
        // console.log(systemRoutines)
        dataToDisplay = Object.entries(routineOccurrences).map(([routine_id, count]) => {

            let routine = userRoutines?.find(routine => routine.id === routine_id) || systemRoutines?.find(routine => routine.id === routine_id);

            return ({
                label: routine?.name,
                value: count
            })
        });
    }
    // console.log(dataToDisplay);

    // const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }, { value: 40 }, { value: 40 }, { value: 40 }, { value: 40 }, { value: 40 }];

    return (
        <View style={styles.Screen}>
            <Text variant='headlineLarge'>Graficas</Text>
            <View style={{ marginTop: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text variant='headlineSmall'>Ocurrencias por rutina</Text>
                <IconButton icon="chart-bar" style={{ margin: 0 }} />
            </View>
            {(isLoading || userLoading || systemLoading) && <ActivityIndicator color='#FF7F3E' style={{ marginVertical: 50 }} animating={true} size={60} />}
            {!(isLoading || userLoading || systemLoading) && (
                <View style={{ alignItems: "center", width: "100%", justifyContent: "center", marginTop: 40 }}>
                    <BarChart
                        frontColor='#FF7F3E'
                        data={dataToDisplay}
                        width={250}
                        initialSpacing={20}
                        spacing={40}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Screen: {
        paddingHorizontal: 20,
        paddingTop: 5
    }
})

export default Index;
