import { customElement, html, LitElement } from 'lit-element';
import { translateUnsafeHTML } from 'lit-translate';

import { sharedStyles } from '../../../../styles/shared.styles';
import { styles } from './footer.styles';

@customElement('lit-footer')
export class Footer extends LitElement {
    static get styles() {
        return [
            sharedStyles,
            styles
        ];
    }
    
    protected render() {
        return html`
            <span class="text">${ translateUnsafeHTML('footer.link') }</span>
        `;
    }
}
