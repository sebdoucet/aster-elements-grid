import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnTypeHandler } from "../column-type";
import { RenderResult } from "./render-result";

export const IGridCellRenderer = ServiceIdentifier<IGridCellRendererImpl>("IGridCellRenderer");

export interface IGridCellRendererImpl {
    render(value: unknown, item: GridDataItem, definition: ColumnDefinition): RenderResult;
}

export type IGridCellRenderer = ColumnTypeHandler<IGridCellRendererImpl>;
