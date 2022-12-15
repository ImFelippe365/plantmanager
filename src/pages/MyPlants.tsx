import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    FlatList

} from 'react-native';
import { Header } from '../components/Header';

import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png'
import { loadPlant, PlantsProps, removePlant, StoragePlantProps } from './../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';
import { Load } from '../components/Load';


export function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantsProps) {
        Alert.alert('Remover', `Deseja remover a planta ${plant.name}?`, [
            {
                text: 'Não 😅',
                style: 'cancel'
            },
            {
                text: 'Sim 😨',
                onPress: async () => {
                    try {

                        await removePlant(plant.id);

                        setMyPlants((oldData) => (
                            oldData.filter((item) => item.id != plant.id)
                        ));

                    } catch (error) {
                        throw new Error();
                    }
                }
            }
        ]);
    }

    async function loadingStorageData() {
        try {
            const plantsStoraged = await loadPlant();
            console.log(myPlants)
            if (plantsStoraged[0]) {
                console.log(plantsStoraged)
                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    { locale: pt }
                );

                setNextWatered(
                    `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
                )

                setMyPlants(plantsStoraged);
            }
        } catch {
            Alert.alert("Deu errado")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadingStorageData();
    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <Header />

            {
                myPlants[0] ?
                    <View style={styles.spotlight}>


                        <Image
                            source={waterDrop}
                            style={styles.spotlightImage}
                        />

                        <Text style={styles.spotlightText}>
                            {nextWaterd}
                        </Text>


                    </View>
                    : <Text style={styles.divider}> </Text>
            }

            {
                myPlants[0] ?
                    <View style={styles.plants}>
                        <Text style={styles.plantsTitle}>
                            Próximas regadas
                        </Text>

                        <FlatList
                            data={myPlants}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => (
                                <PlantCardSecundary
                                    data={item}
                                    handleRemove={() => { handleRemove(item) }}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flex: 1 }}
                        />
                    </View>
                    :
                    <View style={styles.plantsEmptyContainer}>
                        <Text style={styles.plantsEmptyEmoji}>😢</Text>
                        <Text style={styles.plantsEmptyTitle}>Vazio</Text>
                        <Text style={styles.plantsEmptySubtitle}> Você não adicionou nenhuma planta.</Text>
                    </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },

    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    spotlightImage: {
        width: 60,
        height: 60,
    },

    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },

    plants: {
        flex: 1,
        width: '100%'
    },

    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },

    plantsEmptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 80
    },

    plantsEmptyEmoji: {
        fontSize: 88,
    },

    plantsEmptyTitle: {
        fontSize: 22,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },

    plantsEmptySubtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        color: colors.heading
    },

    divider: {
        borderBottomColor: colors.shape,
        borderBottomWidth: 1,
        width: 350
    }


})