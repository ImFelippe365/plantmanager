import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    Image
} from 'react-native';

// import SvgUri from 'react-native-svg-uri';
import { SvgUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface PlantProps extends TouchableOpacityProps {
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            <SvgUri
                width="70"
                height="70"
                uri={data.photo}
                
            />

            <Text style={styles.text}>
                {data.name}
            </Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },

    text: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical: 16,
    },

})