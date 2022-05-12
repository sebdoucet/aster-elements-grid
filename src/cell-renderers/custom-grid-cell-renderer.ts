import { ServiceContract } from "@aster-js/ioc";
import { html } from "lit";
import { CustomColumnDefinition, GridDataItem } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { IGridPropertyValueAccessor } from "../services/igrid-property-value-accessor";
import { RenderResult } from "../services/render-result";

@ServiceContract(IGridCellRenderer)
export class CustomGridCellRenderer implements IGridCellRenderer {

    readonly name: string = "custom";

    constructor(
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) { }

    render(item: GridDataItem, definition: CustomColumnDefinition): RenderResult {
        const value = this._accessor.getValue(item, definition);
        return html`${definition.cellRenderer(value, item, definition)}`;
    }
}
