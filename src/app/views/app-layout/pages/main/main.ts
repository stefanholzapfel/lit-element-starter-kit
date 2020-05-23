import { customElement, html, LitElement } from 'lit-element';
import { translate } from 'lit-translate';

import { sharedStyles } from '../../../../../styles/shared.styles';
import { styles } from './main.styles';

@customElement('main')
export class Main extends LitElement {
    static get styles() {
        return [
            sharedStyles,
            styles
        ];
    }
    
    protected render() {
        return html`
            <div>
                ${ translate('pages.main.welcome') }
            </div>
    `;
    }
}
