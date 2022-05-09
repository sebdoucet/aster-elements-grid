import { ColumnDefinition } from "../column-definition";

export interface IGrid {

    readonly page: number;

    readonly pageSize: number;

    readonly dataSource: unknown;

    readonly columns: readonly ColumnDefinition[];
}
