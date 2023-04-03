import { IEvent } from "@aster-js/events";
import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";

export const IGridService = ServiceIdentifier<IGridService>("IGridService");
export interface IGridService {

    readonly options: GridOptions;

    updateOptions(): Promise<void>;

    render(): unknown;
}

export type GridOptions = {
    readonly dataSource: unknown;
    readonly columns: readonly ColumnDefinition[];
}
