import { AppSettingsConfiguration } from "./AppSettingsConfiguration";

export interface IConfiguration{
    AppSettingConfig:AppSettingsConfiguration;
}

export class Configuration implements IConfiguration{
    
    constructor(){
        this.AppSettingConfig=require('../appSettings.json');
    }
    
    public AppSettingConfig: AppSettingsConfiguration;

}