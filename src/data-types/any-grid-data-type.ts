import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, DefaultColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridDataType, IGridDataTypeImpl } from "../services/igrid-data-type";

@ServiceContract(IGridDataType)
export class AnyGridDataType implements IGridDataTypeImpl<unknown>{

    static readonly types: readonly ColumnType[] = ["custom", "default", "html", "number", "text"];

    coerce(value: unknown, item: GridDataItem, definition: DefaultColumnDefinition): string {
        if (definition.coerce) {
            value = definition.coerce(value, item, definition);
        }
        const result = value ?? definition.defaultValue ?? "";
        return result.toString();
    }

    sort(value1: string, value2: string, _definition: ColumnDefinition): number {
        return value1.localeCompare(value2);
    }
}
