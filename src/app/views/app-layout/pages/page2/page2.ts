import { css, customElement, html, LitElement } from 'lit-element';
import { translate } from 'lit-translate';

import { sharedStyles } from '../../../../../styles/shared.styles';

@customElement('page2')
export class Page1 extends LitElement {
    static get styles() {
        return [
            sharedStyles,
            // language=CSS
            css``
        ];
    }
    
    protected render() {
        return html`
            <div>
                ${ translate('pages.page2.text') }
            </div>
        `;
    }
}
