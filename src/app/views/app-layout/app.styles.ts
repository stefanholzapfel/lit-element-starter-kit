import { css } from 'lit-element';

// language=CSS
export const styles =
    css`
        :host {
            display: grid;
            height: 100vh;
            grid-template-rows: calc(var(--sp-default-icon-size) * 1.5) 1rem 1fr 3rem;
        }
        
        @media (max-width: 650px) {

        }
    `;
