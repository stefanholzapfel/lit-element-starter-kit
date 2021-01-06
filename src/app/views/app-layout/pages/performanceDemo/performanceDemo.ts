import { css, customElement, html, LitElement } from 'lit-element';
import { translate } from 'lit-translate';

import { sharedStyles } from '../../../../../styles/shared.styles';

@customElement('lit-performance-demo')
export class PerformanceDemo extends LitElement {
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
                ${ translate('pages.performanceDemo.text') }
            </div>
        `;
    }
}
