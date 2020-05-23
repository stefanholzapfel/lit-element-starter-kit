import { Pipe } from '../services/pipe.service';
import { Language, TranslateService } from '../services/translate.service';

export class LocaleDatePipe implements Pipe {
    
    private locale = TranslateService.currentLanguage();
    
    constructor(locale?: Language) {
        this.locale = locale;
    }
    
    public transform(date: string): string {
        const localeDate = new Date(date);
        const localeDateString = localeDate.toLocaleDateString(this.locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return localeDateString;
    }
    
}
