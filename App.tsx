import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications'
import React, { useEffect, useRef, useState } from 'react';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import { PlantsProps } from './src/libs/storage';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [fontsLoading] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold
	})

	async function registerForPushNotificationsAsync() {
		let token;

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		return token;
	}

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => console.log('YOUR TOKEN', token))

		const subscription = Notifications.addNotificationReceivedListener(async notification => {
			const data = notification.request.content.data.plant as PlantsProps;
			console.log(data);
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		});

		Notifications.addNotificationResponseReceivedListener(response => {
			console.log("NOTIFICATION RESPONSE",response);
		});

		async function notifications() {
			// await Notifications.cancelAllScheduledNotificationsAsync();

			const data = await Notifications.getAllScheduledNotificationsAsync();
			console.log('NOTIFICAÇÕES AGENDADAS')
			console.log(JSON.stringify(data));


		}

		notifications();

		return () => subscription.remove();


	}, [])

	if (!fontsLoading)
		return <AppLoading />

	return (
		<Routes />
	)
}