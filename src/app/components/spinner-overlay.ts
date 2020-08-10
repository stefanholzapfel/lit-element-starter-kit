import {css, customElement, html, LitElement} from 'lit-element';

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
            z-index: 0;
            position: absolute;
            top: 0;
            left: 0;
            background-color: grey;
            opacity: 0.5;
            width: 100%;
            height: 100%;
        }

        .spinner,
        .spinner:after {
          z-index: 1;
          border-radius: 50%;
          width: 20vw;
          height: 20vw;
        }
        .spinner {
          margin: 60px auto;
          font-size: 10px;
          position: relative;
          text-indent: -9999em;
          border-top: 1.1em solid rgba(255, 255, 255, 0.2);
          border-right: 1.1em solid rgba(255, 255, 255, 0.2);
          border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
          border-left: 1.1em solid #ffffff;
          transform: translateZ(0);
          animation: spin 1.1s infinite linear;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
    `;
    }

    protected render() {
        return html`
          <div class="spinner">Loading...</div>
          <div class="spinner-background"></div>
    `;
    }
}
