import {css, customElement, html, LitElement, property} from 'lit-element';
import {KeyFn, repeat} from 'lit-html/directives/repeat';
import {getTemplate} from './performanceDemo';
import {SchedulerService} from '../../../../services/scheduler.service';

@customElement('lit-lazy-repeat-entry')
export class LazyRepeatEntry<T> extends LitElement {
    static get styles() {
        return [
            // language=CSS
            css`
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

    @property()
    value: T;

    @property()
    index: number;

    protected render() {
        const template = getTemplate(this.value, this.index);
        return template;
    }

    // Overwrite performUpdate for lazyness
    async performUpdate() {
        SchedulerService.schedule({
            workCallback: () => { super.performUpdate() },
        })
        //super.performUpdate();
    }
}
