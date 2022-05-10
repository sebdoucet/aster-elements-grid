import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { IGridPropertyValueAccessor } from "../services/igrid-property-value-accessor";
import { IGridSortingService } from "../services/igrid-sorting-service";

@ServiceContract(IGridSortingService)
export class NumberGridSortingService implements IGridSortingService {

    readonly name: string = "number";

    constructor(
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) { }

    sort(item1: any, item2: any, definition: ColumnDefinition): number {
        const value1 = this._accessor.getValue(item1, definition);
        if (typeof value1 !== "number") return -1;

        const value2 = this._accessor.getValue(item2, definition);
        if (typeof value2 !== "number") return 1;

        return value1 - value2;
    }
}
