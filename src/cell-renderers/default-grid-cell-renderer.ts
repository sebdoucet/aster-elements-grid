import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class DefaultGridCellRenderer extends GridCellRenderer {

    static readonly types: readonly ColumnType[] = ["default", "text"];

    protected renderValue(value: unknown, _item: GridDataItem, _definition: ColumnDefinition): unknown {
        return value;
    }
}
