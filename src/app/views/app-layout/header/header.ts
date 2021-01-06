import { customElement, html, property } from 'lit-element';
import { Language, TranslateService } from '../../../services/translate.service';
import { translate } from 'lit-translate';
import { sharedStyles } from '../../../../styles/shared.styles';
import { styles } from './header.styles';
import { LitElementStateful } from 'lit-state';
import {State} from '../../loading/loading';

@customElement('lit-header')
export class Header extends LitElementStateful<State> {
    static get styles() {
        return [
            sharedStyles,
            styles
        ];
    }
    
    @property({ type: String })
    public currentRoute: string;
    
    @property({ type: String })
    public language: string;
    
    constructor() {
        super();
        this.connectState('app', 'language', 'language');
        this.connectState('app', 'currentRoute', 'currentRoute');
    }
    
    protected render() {
        return html`
            <div class="bold">
                ${ translate('header.title') }
            </div>
            <div>
                <div style="align-self: end">
                    <a href="/" class="${ this.currentRoute === '/' ? 'bold' : '' }">${ translate('pages.main.title') }</a> |
                    <a href="/page1" class="${ this.currentRoute.startsWith('/page1') ? 'bold' : '' }">${ translate('pages.page1.title') }</a> |
                    <a href="/page2" class="${ this.currentRoute.startsWith('/page2') ? 'bold' : '' }">${ translate('pages.page2.title') }</a> |
                    <a href="/performanceDemo" class="${ this.currentRoute.startsWith('/performanceDemo') ? 'bold' : '' }">${ translate('pages.performanceDemo.title') }</a>
                </div>
            </div>
            <div>
                ${ translate('header.language_select') }
                    <a class="${ this.language === 'en-EN' ? 'bold' : '' }" @click="${ () => this.switchLanguage('en-EN') }">${ translate('header.language_en') }</a> |
                    <a class="${ this.language === 'de-DE' ? 'bold' : '' }" @click="${ () => this.switchLanguage('de-DE') }">${ translate('header.language_de') }</a>
            </div>
        `;
    }
    
    private switchLanguage(lang: Language) {
        TranslateService.setLanguage(lang);
    }
}
