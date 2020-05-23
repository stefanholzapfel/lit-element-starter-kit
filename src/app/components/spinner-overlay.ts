import '@polymer/paper-spinner/paper-spinner-lite.js';
import { css, customElement, html, LitElement } from 'lit-element';

@customElement('spinner-overlay')
export class SpinnerOverlay extends LitElement {
    static get styles() {
        return css`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
        }
        .spinner-background {
            z-index: 20;
            position: absolute;
            top: 0;
            left: 0;
            background-color: grey;
            opacity: 0.5;
            width: 100%;
            height: 100%;
        }
        .spinner-wrapper {
            z-index: 21;
            position: relative;
            width: calc(100% * 0.2);
            padding-top: calc(100% * 0.2);
        }

        paper-spinner-lite {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        paper-spinner-lite.thin {
            --paper-spinner-stroke-width: 1px;
        }
        
        paper-spinner-lite.thick {
            --paper-spinner-stroke-width: 0.5rem;
        }
        paper-spinner-lite.color {
            --paper-spinner-color: var(--sp-primary-color);
        }
    `;
    }
    
    protected render() {
        return html`
          <div class="spinner-wrapper">
              <paper-spinner-lite class="thick color" active></paper-spinner-lite>
          </div>
          <div class="spinner-background">
          </div>
    `;
    }
}
