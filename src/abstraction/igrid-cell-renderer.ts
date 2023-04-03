import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";

export const IGridCellRenderer = ServiceIdentifier<IGridCellRenderer>("IGridCellRenderer");

export interface IGridCellRenderer {
    readonly name: string;
    renderCellHeader(definition: ColumnDefinition): unknown;
    renderCellData(item: any, definition: ColumnDefinition): unknown;
}
