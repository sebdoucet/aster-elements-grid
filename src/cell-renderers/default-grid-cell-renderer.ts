import { ServiceContract } from "@aster-js/ioc";
import { html } from "lit";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { IGridPropertyValueAccessor } from "../services/igrid-property-value-accessor";
import { RenderResult } from "../services/render-result";

@ServiceContract(IGridCellRenderer)
export class DefaultGridCellRenderer implements IGridCellRenderer {

    readonly name: string = "text";

    constructor(
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) { }

    render(item: GridDataItem, definition: ColumnDefinition): RenderResult {
        const value = this._accessor.getValue(item, definition);
        if (definition.formatter) {
            return definition.formatter(value);
        }
        return html`${value}`;
    }
}
