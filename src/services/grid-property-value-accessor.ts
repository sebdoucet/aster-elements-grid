import { Tag } from "@aster-js/core";
import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition, GridDataItem } from "../column-definition";
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
    getValue(item: GridDataItem, definition: ColumnDefinition): unknown {
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

    resolveAccessor(definition: ColumnDefinition): GridPropertyAccessorDelegate {
        const accessor = AccessorTag(definition);
        return item => this.getAccessorValue(item, definition, accessor);
    }

    protected getAccessorValue(item: GridDataItem, definition: ColumnDefinition, accessor: GridPropertyAccessorDelegate): unknown {
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
