import { ServiceContract } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { IGridPropertyValueAccessor } from "../services/igrid-property-value-accessor";
import { IGridSortingService } from "../services/igrid-sorting-service";

@ServiceContract(IGridSortingService)
export class CustomGridSortingService implements IGridSortingService {

    readonly name: string = "number";

    constructor(
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) { }

    sort(item1: any, item2: any, definition: ColumnDefinition): number {
        throw new Error();
    }
}
