import { customElement, html, LitElement, property } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import { ConfigService } from '../../services/config.service';
import { LitElementStateService } from '../../services/state/litElementState.service';
import { TranslateService } from '../../services/translate.service';

import { styles } from './loading.styles';

import '../app-layout/app';
import '../../components/spinner-overlay';

@customElement('loading')
export class Loading extends LitElement {
    
    static get styles() {
        return [
            styles
        ];
    }
    
    @property({ type: Object })
    private initializing: Promise<any> = null;

    protected render() {
        return html`
            ${ until(
            this.initializing.then(res => html`
                <app-layout></app-layout>
            `),
            html`
                <spinner-overlay></spinner-overlay>
            `
        ) }
        `;
    }
    
    protected firstUpdated() {
        this.initializing = Promise.all([
            ConfigService.init(),
            TranslateService.init('en-EN'),
            LitElementStateService.init({})
        ]);
    }
}
