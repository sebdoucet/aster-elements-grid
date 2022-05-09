import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { RenderResult } from "./render-result";

export const IGridCellRenderer = ServiceIdentifier<IGridCellRenderer>("IGridCellRenderer");

export interface IGridCellRenderer {
    readonly name: string;
    render(item: any, definition: ColumnDefinition): RenderResult;
}
