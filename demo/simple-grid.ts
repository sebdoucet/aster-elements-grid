import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { ColumnDefinition, GridDataItem } from "../src/column-definition";

import data from "./simple-data";

function priceBgColor({ price }: GridDataItem) {
    const color = typeof price !== "number" ? "black": price > 100 ? "red" : price < 10 ? "green" : "orange";
    return `background-color:${color}`;
}

const columns: ColumnDefinition[] = [
    { type: "html", header: "", coerce: (v) => `&#x${v}`, path: "icon" },
    { type: "text", header: "Description", path: "description" },
    { type: "text", header: "Date", path: "date" },
    { type: "text", header: "City", path: "address.city", defaultValue: "none" },
    { type: "number", header: "Price", path: "price", precision: 2, fixed: true, cellClasses: "price", cellStyle: priceBgColor, unit: "$" }
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
            color: #fff;
            font-weight: bold;
            padding: 2px;
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
