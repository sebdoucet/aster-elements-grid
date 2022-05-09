import { html, HTMLTemplateResult, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IDisposable } from "@aster-js/core";
import { dom } from "@aster-js/dom";
import { ColumnDefinition } from "./column-definition";
import { IGridCellRenderer } from "./services/igrid-cell-renderer";
import { CellEvent } from "./grid-event";
import { IGridCell } from "./abstraction/igrid-cell";
import styles from "./grid-cell.css";

@customElement("aster-grid-cell")
export class GridCell extends LitElement implements IGridCell {
    private _listeners: IDisposable[] = [];

    static readonly styles = unsafeCSS(styles);

    @property()
    renderer?: IGridCellRenderer;

    @property()
    column?: ColumnDefinition;

    @property()
    item: any;

    connectedCallback(): void {
        super.connectedCallback();
        this._listeners.push(
            dom.on(this, "click", ev => this.onCellClick(ev as UIEvent))
        );
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        IDisposable.safeDisposeAll(this._listeners.splice(0));
    }

    protected render(): HTMLTemplateResult {
        return html`<slot></slot>`;
    }

    private onCellClick(ev: UIEvent) {
        const event = new CellEvent("cell-click", this, this.item);
        this.dispatchEvent(event);

        if (event.defaultPrevented) {
            ev.preventDefault();
            event.stopPropagation();
        }
    }
}
