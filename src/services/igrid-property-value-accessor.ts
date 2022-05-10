import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";

export const IGridPropertyValueAccessor = ServiceIdentifier<IGridPropertyValueAccessor>("IGridPropertyValueAccessor");

export interface IGridPropertyValueAccessor {
    getValue(item: any, definition: ColumnDefinition): any;
}
