import { ServiceContract } from "@aster-js/ioc";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { GridCellRenderer } from "./grid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class HtmlGridCellRenderer extends GridCellRenderer  {

    readonly name: string = "html";

    protected renderValue(value: unknown, _item: GridDataItem, _definition: ColumnDefinition): unknown {
        return unsafeHTML(String(value));
    }
}
