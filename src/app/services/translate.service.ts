import { Strings, Values, ValuesCallback } from 'lit-translate/model';
import { ConfigService } from './config.service';
import { extract, get, registerTranslateConfig, use } from 'lit-translate';
import { LitElementStateService } from './state/litElementState.service';

export class TranslateService {
    public static async init(language: Language): Promise<TranslateService> {
        if (!TranslateService.initialized) {
            registerTranslateConfig({
                loader: lang => TranslateService.setLanguage(lang as Language),
                interpolate: (text, values) => {
                    for (const [key, value] of Object.entries(extract(values))) {
                        text = text.replace(key, value as string);
                    }
                    return text;
                },
            });
            await TranslateService.setLanguage(language);
            TranslateService.initialized = true;
            return TranslateService;
        } else {
            console.log('Already initialized TranslateService!');
        }
    }
    
    private static initialized = false;
    
    private static selectedLanguage;
    private static loadedLanguages = new Map<Language, Strings>();
    
    public static currentLanguage(): Language {
        return TranslateService.selectedLanguage;
    }
    
    private static async loadLanguage(language: Language): Promise<Strings> {
        const langsResponse = await fetch(ConfigService.get('APP_URL') + '/assets/lang/' + language + '.json' );
        return await langsResponse.json();
    }
    
    public static async setLanguage(language: Language): Promise<Strings> {
        if (!TranslateService.loadedLanguages.get(language)) {
            const langData = await TranslateService.loadLanguage(language);
            TranslateService.loadedLanguages.set(language, langData);
        }
        await use(language);
        LitElementStateService.set({
            app: {
                language
            }
        })
        TranslateService.selectedLanguage = language;
        return TranslateService.loadedLanguages.get(language);
    }
    
    public static translate(translationString: string, replace?: Values | ValuesCallback) {
        return get(translationString, replace);
    }
}

export type Language =
    'en-EN' |
    'de-DE';
