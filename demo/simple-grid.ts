import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { ColumnDefinition, GridDataItem } from "../src/column-definition";

import data from "./simple-data";

function priceBgColor({ price }: GridDataItem) {
    const color = typeof price !== "number" ? "transparent" : price > 100 ? "#f003" : price < 10 ? "#0f03" : "#f1870e98";
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
            width: 700px;
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
        return html`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <aster-grid
            table-class="table table-striped table-dark"
            .dataSource=${[...data, ...data, ...data]}
            .columns=${columns}
            .pageSize=${10}
            auto-load>
        </aster-grid>`;
    }
}
