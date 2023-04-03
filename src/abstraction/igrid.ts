import { ColumnDefinition } from "../column-definition";

export interface IGrid {

    readonly dataSource: unknown;

    readonly columns: readonly ColumnDefinition[];

    requestRender(): void;
}
