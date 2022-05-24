import { ServiceCollection } from "@aster-js/ioc";

import { DefaultGridCellRenderer } from "./default-grid-cell-renderer";
import { NumberGridCellRenderer } from "./number-grid-cell-renderer";
import { CustomGridCellRenderer } from "./custom-grid-cell-renderer";
import { HtmlGridCellRenderer } from "./html-grid-cell-renderer";
import { IGridCellRendererImpl } from "../services/igrid-cell-renderer";
import { ColumnType } from "../column-type";

export namespace GridCellRenderers {
    export function addDefault(services: ServiceCollection): void {
        ColumnType.tryAddHandlers<IGridCellRendererImpl>(
            services,
            DefaultGridCellRenderer,
            NumberGridCellRenderer,
            HtmlGridCellRenderer,
            CustomGridCellRenderer
        );
    }
}
