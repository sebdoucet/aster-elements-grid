import { Func, Tag } from "@aster-js/core";
import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { IGridPropertyValueAccessor } from "./igrid-property-value-accessor";

const AccessorTag = Tag.lazy<Func<[any]>>("Accessor", (target: object) => {
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
})

@ServiceContract(IGridPropertyValueAccessor)
export class GridPropertyValueAccessor implements IGridPropertyValueAccessor {
    getValue(item: GridDataItem, definition: ColumnDefinition): any {
        const accessor = AccessorTag(definition);

        const value = accessor(item);
        if (typeof value === "undefined" || (value === null && definition.ignoreNull)) {
            return definition.defaultValue;
        }

        if (definition.coerce) {
            return definition.coerce(value, item, definition);
        }
        return value;
    }
}
