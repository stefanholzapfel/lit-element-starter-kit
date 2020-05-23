import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('sp-checkbox')
export class Checkbox extends LitElement {
    
    static get styles() {
        // language=CSS
        return css`
                :host {
                    position: relative;
                    display: grid;
                    height: 1rem;
                    width: 1rem;
                }
            
                .outer {
                    display: grid;
                    place-items: center;
                    height: 100%;
                    width: 100%;
                    border-radius: 100%;
                    background-color: #e6e6e6;
                    cursor: pointer;
                }
                
                .inner {
                    height: 55%;
                    width: 55%;
                    border-radius: 55%;
                    background-color: darkgrey;
                }
            
                .checked {
                    background-color: var(--sp-primary-color);
                }
            
                .disabled {
                    cursor: default;
                    pointer-events: none;
                    opacity: 0.5;
                }
            `;
    }
    
    @property({ type: Boolean })
    public checked = false;
    
    @property({ type: Boolean })
    public disabled = false;
    
    constructor() {
        super();
        this.addEventListener('click', this.handleClick);
    }
    
    public disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }
    
    protected render() {
        return html`<div class="outer${ this.disabled ? ' disabled' : '' }">
                        <div class="inner${ this.checked ?  ' checked' : '' }"></div>
                    </div>`;
    }
    
    private handleClick(e) {
        if (!this.disabled) {
            this.checked = !this.checked;
        } else {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
}
