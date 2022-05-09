import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { NumberColumnDefinition } from "../src/cell-renderers/number-grid-cell-renderer";
import { ColumnDefinition } from "../src/column-definition";

import data from "./simple-data";

const columns: ColumnDefinition[] = [
    { type: "text", header: "Description", property: "description" },
    { type: "text", header: "Date", property: "date" },
    { type: "number", header: "Price", property: "price", precision: 2, fixed: true, cellClasses: "price" } as NumberColumnDefinition
];

@customElement("aster-simple-grid-demo")
export class SimpleGridDemo extends LitElement {
    static readonly styles = css`
        aster-grid {
            width: 300px;
        }
        .price {
            display: block;
            text-align: right;
            color: red;
        }
    `;
    protected render(): unknown {
        return html`<aster-grid .dataSource=${data} .columns=${columns} .pageSize=${2} auto-load></aster-grid>`;
    }
}
