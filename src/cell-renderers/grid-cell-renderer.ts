import { html } from "lit";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnType } from "../column-type";
import { itemValue } from "../item-value";
import { IGridCellRendererImpl } from "../services/igrid-cell-renderer";
import { RenderResult } from "../services/render-result";

export abstract class GridCellRenderer implements IGridCellRendererImpl {

    static readonly types: readonly ColumnType[] = [];

    render(value: unknown, item: GridDataItem, definition: ColumnDefinition): RenderResult {
        return html`<aster-grid-cell
            .item=${item}
            class="${itemValue(item, definition.cellClasses)}"
            style="${itemValue(item, definition.cellStyle)}">
            ${this.renderContent(value, item, definition)}
        </aster-grid-cell>`;
    }

    protected renderContent(value: unknown, item: GridDataItem, definition: ColumnDefinition): RenderResult {
        const valueTemplate = this.renderValue(value, item, definition);
        if (definition.formatter) {
            return definition.formatter(valueTemplate, item, definition);
        }
        return html`${valueTemplate}`;
    }

    protected abstract renderValue(value: unknown, _item: GridDataItem, _definition: ColumnDefinition): unknown;
}
