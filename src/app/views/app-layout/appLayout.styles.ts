import { css } from 'lit-element';

// language=CSS
export const styles =
    css`
        :host {
            height: calc(100vh - 2rem);
            width: calc(100vw - 2rem);
            margin: 1rem;
            display: grid;
            grid-template-rows: 4rem auto 2rem;
        }
        
        @media (max-width: 650px) {

        }
    `;
