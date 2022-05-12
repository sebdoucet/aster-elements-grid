import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class DefaultGridCellRenderer extends GridCellRenderer {

    readonly name: string = "text";

    protected renderValue(value: unknown, _item: GridDataItem, _definition: ColumnDefinition): unknown {
        return value;
    }
}
