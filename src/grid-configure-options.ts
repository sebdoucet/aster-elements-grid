import type { ColumnDefinition } from "./column-definition";


export type GridConfigureOptions = {
    readonly dataSource: unknown;
    readonly columns: readonly ColumnDefinition[];
}
