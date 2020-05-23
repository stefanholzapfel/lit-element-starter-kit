import { customElement, html, LitElement } from 'lit-element';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { RouterService } from '../../services/router.service';
import { LitElementStateService } from '../../services/state/litElementState.service';

import { styles } from './app.styles';

import './../../components/spinner-overlay';
import './footer/footer';
import './header/header';

@customElement('app')
export class App extends LitElement {
    
    static get styles() {
        return [
            styles
        ];
    }
    
    protected render() {
        return html`
            <header></header>
            <div slot="router" id="router-outlet"></div>
            <footer></footer>
        `;
    }
    
    protected async firstUpdated() {
        // Bootstrapping of everything except router (router needs outlet rendered) happens in loading component
        const outlet = (this as any).shadowRoot.getElementById('router-outlet');
        RouterService.init(outlet);
        installMediaQueryWatcher(
            `(max-width: 650px)`,
            mediaQueryMatches => LitElementStateService.set({
                app: {
                    mobile: mediaQueryMatches
                }
            })
        );
    }
}
