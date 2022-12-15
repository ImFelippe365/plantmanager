export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Welcome: undefined;
            UserIdentification: undefined;
            Confirmation: {
                title: string,
                subtitle: string,
                buttonTitle: string,
                icon: string,
                nextScreen: string
            };
            PlantSelect: undefined;
            PlantSave: {
                id: string,
                name: string,
                about: string,
                water_tips: string,
                photo: string,
                environments: [string],
                frequency: {
                    times: number,
                    repeat_every: string
                };
                hour: string,
                dateTimeNotification: Date;
            } | undefined;
            MyPlants: undefined;
        }
    }
}