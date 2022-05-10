import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";

export const IGridSortingService = ServiceIdentifier<IGridSortingService>("IGridSortingService");
export interface IGridSortingService {
    readonly name: string;
    sort(item1: any, item2: any, definition: ColumnDefinition): number;
}
