import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { IGridPropertyValueAccessor } from "./igrid-property-value-accessor";

@ServiceContract(IGridPropertyValueAccessor)
export class GridPropertyValueAccessor implements IGridPropertyValueAccessor {
    getValue(item: any, definition: ColumnDefinition): any {
        return Reflect.get(item, definition.property);
    }
}
