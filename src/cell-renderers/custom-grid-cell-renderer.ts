import { ServiceContract } from "@aster-js/ioc";
import { CustomColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class CustomGridCellRenderer extends GridCellRenderer {

    static readonly types: readonly ColumnType[] = ["custom"];

    protected renderValue(value: unknown, item: GridDataItem, definition: CustomColumnDefinition): unknown {
        return definition.cellRenderer(value, item, definition);
    }
}
