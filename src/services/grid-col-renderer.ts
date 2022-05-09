import { Many, ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { GridCell } from "../grid-cell";
import { GridController } from "./grid-controller";
import { IGridCellRenderer } from "./igrid-cell-renderer";
import { IGridController } from "./igrid-controller";
import { IGridColRenderer } from "./igrid-col-renderer";
import { RenderResult } from "./render-result";

@ServiceContract(IGridColRenderer)
export class GridColRenderer implements IGridColRenderer {

    constructor(
        @IGridController private readonly _controller: GridController
    ) {
    }

    renderHead(): RenderResult {
        return html`<tr>${this.renderRowHeaders()}</tr>`;
    }

    protected *renderRowHeaders(): Iterable<HTMLTemplateResult> {
        for (const column of this._controller.columns) {
            yield html`<th>${column.header}</th>`;
        }
    }
}
