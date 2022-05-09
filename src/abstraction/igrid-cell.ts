import { ColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";

export interface IGridCell {
    readonly renderer?: IGridCellRenderer;
    readonly definition?: ColumnDefinition;
    readonly item: any;
}
