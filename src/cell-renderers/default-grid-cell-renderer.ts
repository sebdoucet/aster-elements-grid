import { ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { ColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../abstraction/igrid-cell-renderer";

@ServiceContract(IGridCellRenderer)
export class DefaultGridCellRenderer implements IGridCellRenderer {

    readonly name: string = "text";

    render(item: any, definition: ColumnDefinition): HTMLTemplateResult {
        return definition.valuePredicate(item);
    }
}
