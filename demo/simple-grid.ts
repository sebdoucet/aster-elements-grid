import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import data from "./simple-data";

const columns = [
    { title: "", allowSort: true }
];

@customElement("aster-simple-grid-demo")
export class SimpleGridDemo extends LitElement {
    protected render(): unknown {
        return html`<aster-grid .items=${data} .columns=${columns}></aster-grid>`;
    }
}
//
