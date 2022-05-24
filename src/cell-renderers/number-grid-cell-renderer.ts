import { ServiceContract } from "@aster-js/ioc";
import { GridDataItem, NumberColumnDefinition } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class NumberGridCellRenderer extends GridCellRenderer {

    static readonly types: ColumnType[] = ["number"];

    protected *renderValue(value: number | null, item: GridDataItem, definition: NumberColumnDefinition): unknown {
        if (value === null) {
            yield definition.NaNText ?? "NaN";
        }
        else {
            if (definition.fixed) {
                yield value.toFixed(definition.precision);
            }
            else {
                yield value;
            }

            if (definition.unit) yield definition.unit;
        }
    }
}
