import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface EnviromentButtonProps extends TouchableOpacityProps {
    title: string,
    active?: boolean
}

export function EnviromentButton(
    {title,
    active = false,
    ... rest
} 
    : EnviromentButtonProps
){

    return (

        <TouchableOpacity style={[
            styles.container,
            active && styles.containerActive
            ]} {... rest}>
            <Text style={[
                styles.text,
                active && styles.textActive
                ]}>
                { title }
            </Text>
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },

    containerActive: {
        backgroundColor: colors.green_light
    },

    text: {
        color: colors.heading,
        fontFamily: fonts.text
    },

    textActive: {
        color: colors.green_dark,
        fontFamily: fonts.heading
    }

})