import {css, customElement, html, internalProperty, LitElement} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';

import('./lit-lazy-repeat');

@customElement('lit-performance-demo')
export class PerformanceDemo extends LitElement {
    static get styles() {
        return [
            // language=CSS
            css`
          .siblings {
              display: flex;
              flex-wrap: wrap;
          }

          .sibling {
              position: relative;
              width: 4px;
              height: 4px;
              margin: 0 2px 2px 0;
              padding: 0px;

              outline: 1px solid green;
              background-color: transparent;
          }

          .sibling div {
              position: absolute;
              width: 100%;
              height: 100%;
          }
          .sibling div.filled {
              background-color: orange;
          }
      `
        ];
    }

    @internalProperty()
    siblings: { color: string; id: number; }[] = [];

    @internalProperty()
    lazy = false;

    protected render() {
        return html`
            <div>Lit-Element performance demo</div>
            <div>
                <button @click="${ this.runNormal }">RUN</button>
                <button @click="${ this.runLazy }">RUN LAZY (CHUNKED)</button>
                <button @click="${ this.runPrioritized }">RUN LAZY & LAST PRIORITIZED</button>
                <input type="number" id="count" value="5000">
            </div>
            <div>
              <button @click="${ this.reset }">RESET</button>
            </div>
            <div>
                <h3>${ this.siblings.length } Siblings</h3>
                <div class="siblings">
                    ${
                        this.lazy ?
                            repeat(this.siblings, (i) => i.id, (i,index) => html`<lit-lazy-repeat-entry .index="${index}" .value="${i}" ></lit-lazy-repeat-entry>`) :
                            repeat(this.siblings, (i) => i.id, (i,index) => getTemplate(i, index))
                    }
                </div>
            </div>
        `;
    }



    run() {
        this.siblings = this.toBooleanArray(
            parseInt((this.shadowRoot.getElementById('count') as HTMLInputElement).value, 10)
        ).map((filled, id) => ({ color: this.color(Math.random()), filled, id }));
    }

    runNormal() {
        this.lazy = false;
        this.run();
    }

    runLazy() {
        this.lazy = true;
        this.run();
    }

    runPrioritized() {

    }

    reset() {
        this.siblings = [];
    }

    color(a: any) {
        return '#' +Math.floor(a*16777215).toString(16);
    }

    toBooleanArray(num: number) {
        return new Array(num).fill(0).map(() => this.toBoolean(Math.random()))
    }

    toBoolean(float: number, truthy: number = 0.5): boolean | undefined {
        return float !== undefined ? float < truthy : undefined;
    }
}

export const getTemplate = (i, index) => {
    return html`
            <div class="sibling">
                <div style="background: ${ i.color }" ></div>
            </div>`;
}
