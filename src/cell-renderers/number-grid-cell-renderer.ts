import { ServiceContract } from "@aster-js/ioc";
import { html } from "lit";
import { ColumnDefinition } from "../column-definition";
import { IGridCellRenderer } from "../services/igrid-cell-renderer";
import { RenderResult } from "../services/render-result";
import { DefaultGridCellRenderer } from "./default-grid-cell-renderer";

export type NumberColumnDefinition = ColumnDefinition & {
    /** Indicate the precision, default will render the entire number */
    readonly precision?: number;
    /** Indicate whether or not the precision should render a formats a fixed-point notation */
    readonly fixed?: boolean;
    /** Indicate the unit to append at the end of the number */
    readonly unit?: string;
    /** Provide an alternate text for non number values */
    readonly NaNText?: string;
}

@ServiceContract(IGridCellRenderer)
export class NumberGridCellRenderer extends DefaultGridCellRenderer {

    readonly name: string = "number";

    render(item: any, definition: NumberColumnDefinition): RenderResult {
        let value = this.getValue(item, definition);

        if (typeof value === "number") {
            if (typeof definition.precision !== "undefined") {
                if (definition.fixed) {
                    value = value.toFixed(definition.precision);
                }
                else {
                    const factor = Math.pow(10, definition.precision);
                    value = Math.round(value * factor) / factor;
                }
            }

            if (definition.unit) {
                value = `${value}${definition.unit}`
            }
        }
        else {
            value = definition.NaNText ?? "NaN";
        }

        if (definition.formatter) {
            return definition.formatter(value);
        }
        return html`${value}`;
    }
}
