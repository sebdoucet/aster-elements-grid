import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { RenderResult } from "./render-result";

export const IGridController = ServiceIdentifier<IGridController>("IGridController");
export interface IGridController {
    readonly columns: readonly ColumnDefinition[];
    load(): Promise<void>;
    syncDataSource(): Promise<void>;
    requestRender(): void;
}
