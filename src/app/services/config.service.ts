export class ConfigService {
    public static async init(): Promise<ConfigService> {
        if (!ConfigService.initialized) {
            ConfigService.setConfig();
            return ConfigService;
        } else {
            console.log('Already initialized ConfigService!');
        }
    }
    
    private static initialized = false;
    
    private static config: Config;
    
    public static getConfig(): Config {
        return ConfigService.config;
    }
    
    public static get(key: keyof Config) {
        return ConfigService.config[key];
    }
    
    private static setConfig() {
        ConfigService.config = process.env.SP_ENV_VARS as any;
    }
}

export interface Config {
    APP_URL: string;
}
