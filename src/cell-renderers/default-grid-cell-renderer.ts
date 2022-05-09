import { ServiceContract } from "@aster-js/ioc";
import { html } from "lit";
import { ColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { RenderResult } from "../services/render-result";

@ServiceContract(IGridCellRenderer)
export class DefaultGridCellRenderer implements IGridCellRenderer {

    readonly name: string = "text";

    render(item: any, definition: ColumnDefinition): RenderResult {
        const value = this.getValue(item, definition);
        if (definition.formatter) {
            return definition.formatter(value);
        }
        return html`${value}`;
    }

    protected getValue(item: any, definition: ColumnDefinition): any {
        return Reflect.get(item, definition.property);
    }
}
