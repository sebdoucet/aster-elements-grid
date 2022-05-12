import { ServiceContract } from "@aster-js/ioc";
import { html } from "lit";
import { GridDataItem, NumberColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { IGridPropertyValueAccessor } from "../services/igrid-property-value-accessor";
import { RenderResult } from "../services/render-result";

@ServiceContract(IGridCellRenderer)
export class NumberGridCellRenderer implements IGridCellRenderer {

    readonly name: string = "number";

    constructor(
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) { }

    render(item: GridDataItem, definition: NumberColumnDefinition): RenderResult {
        let value = this._accessor.getValue(item, definition);

        if (typeof value === "number") {
            if (typeof definition.precision !== "undefined") {
                if (definition.fixed) {
                    value = value.toFixed(definition.precision);
                }
                else {
                    const factor = Math.pow(10, definition.precision);
                    value = Math.round(value * factor) / factor;
                }
            }

            if (definition.unit) {
                value = `${value}${definition.unit}`
            }
        }
        else {
            value = definition.NaNText ?? "NaN";
        }

        if (definition.formatter) {
            return definition.formatter(value);
        }
        return html`${value}`;
    }
}
