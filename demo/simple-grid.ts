import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ColumnDefinition } from "../src/column-definition";

import data from "./simple-data";

const columns: ColumnDefinition[] = [
    { type: "custom", header: "", cellRenderer: v => unsafeHTML(`&#x${v}`), path: "icon" },
    { type: "text", header: "Description", path: "description" },
    { type: "text", header: "Date", path: "date" },
    { type: "text", header: "City", path: "address.city" },
    { type: "number", header: "Price", path: "price", precision: 2, fixed: true, cellClasses: "price" },
    { type: "number", header: "Rounded Price", path: "price", coerce: (v) => Math.round(v as number), precision: 2, fixed: true, cellClasses: "price" }
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
        return html`<aster-grid
            .dataSource=${data}
            .columns=${columns}
            .pageSize=${2}
            auto-load>
        </aster-grid>`;
    }
}
