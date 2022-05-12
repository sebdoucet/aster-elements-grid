import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { RenderResult } from "./render-result";

export const IGridCellRenderer = ServiceIdentifier<IGridCellRenderer>("IGridCellRenderer");

export interface IGridCellRenderer {
    readonly name: string;
    render(value: unknown, item: GridDataItem, definition: ColumnDefinition): RenderResult;
}
