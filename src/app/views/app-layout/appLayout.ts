import { customElement, html, LitElement } from 'lit-element';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { RouterService } from '../../services/router.service';
import { LitElementStateService } from '../../services/state/litElementState.service';

import { styles } from './appLayout.styles';

import './../../components/spinner-overlay';
import './footer/footer';
import './header/header';

@customElement('lit-app-layout')
export class AppLayout extends LitElement {
    
    static get styles() {
        return [
            styles
        ];
    }
    
    protected render() {
        return html`
            <lit-header></lit-header>
            <div slot="router" id="router-outlet"></div>
            <lit-footer></lit-footer>
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
