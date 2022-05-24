import { ServiceCollection } from "@aster-js/ioc";

import { AnyGridDataType } from "./any-grid-data-type";
import { NumberGridDataType } from "./number-grid-data-type";
import { ColumnType } from "../column-type";
import { IGridDataTypeImpl } from "../services/igrid-data-type";

export namespace GridDataTypes {
    export function addDefault(services: ServiceCollection): void {
        ColumnType.tryAddHandlers<IGridDataTypeImpl>(
            services,
            NumberGridDataType,
            AnyGridDataType
        );
    }
}
