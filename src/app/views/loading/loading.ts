import { customElement, html, LitElement, property } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { ConfigService } from '../../services/config.service';
import { LitElementStateService } from 'lit-state';
import { TranslateService } from '../../services/translate.service';

import '../app-layout/appLayout';
import '../../components/spinner-overlay';

import { styles } from './loading.styles';

@customElement('lit-loading')
export class Loading extends LitElement {
    
    static get styles() {
        return [
            styles
        ];
    }
    
    @property({ type: Object })
    private initializing: Promise<any> = null;
    
    protected render() {
        if (this.initializing) {
            return html`
            ${ until(
                this.initializing.then(res => html`<lit-app-layout></lit-app-layout>`),
                html`<spinner-overlay></spinner-overlay>`
            ) }
            `;
        }
    }
    
    protected firstUpdated() {
        this.initializing = Promise.all([
            ConfigService.init(),
            TranslateService.init('en-EN'),
            new LitElementStateService<State>(
                {
                    app: {
                        mobile: false,
                        language: 'en-EN',
                        previousRoute: '/',
                        currentRoute: '/'
                    },
                    components: {
                        main: {},
                        page1: {},
                        page2: {}
                    }
                },
                undefined,
                true
            )
        ]);
    }
}

export interface State {
    app: {
        mobile: Boolean;
        language: String;
        previousRoute: String;
        currentRoute: String;
    };
    components: {
        main: {};
        page1: {};
        page2: {};
    };
}
