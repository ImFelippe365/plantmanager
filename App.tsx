import React, { useEffect } from 'react';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';
import { PlantsProps } from './src/libs/storage';

export default function App() {

  const [ fontsLoading ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantsProps;
        console.log(data);
      }
    );

    return () => subscription.remove();

    // async function notifications() {
    //   await Notifications.cancelAllScheduledNotificationsAsync();

    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log('NOTIFICAÇÕES AGENDADAS')
    //   console.log(data);

      
    // }

    // notifications();
  }, [])

  if(!fontsLoading)
    return <AppLoading />

  return (

    <Routes />

  )


}
