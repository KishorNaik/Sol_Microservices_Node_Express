export type AppSettingsConfiguration={
    Production:{
        Port:number;
        DatabaseConnection:{
            Server: string,
            Driver: string,
            Database: string,
            Options: {
                TrustedConnection: boolean
            }
        },
        Secret:string
    },
    Development:{
        Port:number;
        DatabaseConnection:{
            Server: string,
            Driver: string,
            Database: string,
            Options: {
                TrustedConnection: boolean
            }
        }
        Secret:string
    }
}