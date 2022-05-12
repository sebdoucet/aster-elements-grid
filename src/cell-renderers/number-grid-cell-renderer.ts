import { ServiceContract } from "@aster-js/ioc";
import { GridDataItem, NumberColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class NumberGridCellRenderer extends GridCellRenderer {

    readonly name: string = "number";

    protected renderValue(value: unknown, item: GridDataItem, definition: NumberColumnDefinition): unknown {
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

        return value;
    }
}
