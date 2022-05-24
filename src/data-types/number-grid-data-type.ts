import { ServiceContract } from "@aster-js/ioc";
import { GridDataItem, NumberColumnDefinition } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridDataType, IGridDataTypeImpl } from "../services/igrid-data-type";

@ServiceContract(IGridDataType)
export class NumberGridDataType implements IGridDataTypeImpl<number> {

    static readonly types: readonly ColumnType[] = ["number"];

    coerce(value: unknown, item: GridDataItem, definition: NumberColumnDefinition): number | null {
        let coerceValue = this.parseValue(value);

        if (definition.coerce) {
            coerceValue = definition.coerce(coerceValue, item, definition);
        }

        if (coerceValue !== null && typeof definition.precision !== "undefined") {
            const factor = Math.pow(10, definition.precision);
            value = Math.round(coerceValue * factor) / factor;
        }

        return coerceValue;
    }

    private parseValue(value: unknown): number | null {
        let parseValue = NaN;
        switch (typeof value) {
            case "number":
                parseValue = value;
                break;
            case "boolean":
                parseValue = value ? 1 : 0;
                break;
            case "string":
                parseValue = parseFloat(value);
                break;
        }
        return isNaN(parseValue) ? null : parseValue;
    }

    sort(value1: number | null, value2: number | null, _definition: NumberColumnDefinition): number {
        if (value1 === null) return value2 === null ? 0 : -1;

        if (value2 === null) return 1;

        return value1 - value2;
    }
}
