import { Tag } from "@aster-js/core";
import { Many, ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { ColumnType } from "../column-type";
import { IGridDataType, IGridDataTypeImpl } from "./igrid-data-type";
import { GridPropertyAccessorDelegate, IGridPropertyValueAccessor } from "./igrid-property-value-accessor";

const AccessorTag = Tag.lazy<GridPropertyAccessorDelegate>("Accessor", (target: object) => {
    const { path } = (target as ColumnDefinition);
    const segments = path.split(".");
    if (segments.length === 1) {
        return (item: GridDataItem) => Reflect.get(item, path);
    }
    return (item: GridDataItem) => {
        let value: unknown = item;
        for (let idx = 0; idx < segments.length; idx++) {
            value = Reflect.get(value as object, segments[idx]);
            if (typeof value === "undefined" || value === null) {
                break;
            }
        }
        return value;
    }
});

@ServiceContract(IGridPropertyValueAccessor)
export class GridPropertyValueAccessor implements IGridPropertyValueAccessor {
    private readonly _dataTypes: Map<ColumnType, IGridDataTypeImpl>;
    private readonly _default: IGridDataTypeImpl;

    constructor(@Many(IGridDataType) dataTypes: Iterable<IGridDataTypeImpl>) {
        const entries = ColumnType.entries(dataTypes);
        this._dataTypes = new Map(entries);
        this._default = this._dataTypes.get("default")!;
    }

    getValue(item: GridDataItem, definition: ColumnDefinition): unknown {
        const accessor = AccessorTag(definition);
        return this.getAccessorValue(item, definition, accessor);
    }

    resolveAccessor(definition: ColumnDefinition): GridPropertyAccessorDelegate {
        const accessor = AccessorTag(definition);
        return item => this.getAccessorValue(item, definition, accessor);
    }

    protected getAccessorValue(item: GridDataItem, definition: ColumnDefinition, accessor: GridPropertyAccessorDelegate): unknown {
        const value = accessor(item);
        const dataType = this._dataTypes.get(definition.type) ?? this._default;
        return dataType.coerce(value, item, definition);
    }
}
