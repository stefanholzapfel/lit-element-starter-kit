import { css } from 'lit-element';

// language=CSS
export const styles = css`
    :host {
        padding-left: 1rem;
        padding-right: 1rem;
        width: calc(100% - 2rem);
        height: 100%;
        display: grid;
        align-content: center;
        background-color: var(--sp-background-color);
        grid-template-columns: var(--sp-default-icon-size) auto 11rem;
        grid-auto-flow: column;
        grid-column-gap: 0.5rem;
    }
    
    .left {
        display: grid;
        align-items: center;
        grid-auto-flow: column;
    }

    .middle {
        height: var(--sp-default-icon-size);
        display: grid;
        grid-auto-flow: row;
    }

    .right {
        display: grid;
        align-items: center;
        text-align: right;
        grid-auto-flow: column;
    }

    .user-image {
        width: var(--sp-default-icon-size);
        height: var(--sp-default-icon-size);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        border-radius: var(--sp-default-icon-size);
    }
    
    .bold {
        font-weight: bold;
    }
`;
