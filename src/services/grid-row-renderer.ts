import { Many, ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { GridController } from "./grid-controller";
import { IGridCellRenderer } from "./igrid-cell-renderer";
import { IGridRowRenderer } from "./igrid-row-renderer";
import { IGridController } from "./igrid-controller";
import { RenderResult } from "./render-result";
import { itemValue } from "../item-value";
import { GridDataItem } from "../column-definition";

@ServiceContract(IGridRowRenderer)
export class GridRowRenderer implements IGridRowRenderer {
    private readonly _cellRenderers: Map<string, IGridCellRenderer>;

    constructor(
        @IGridController private readonly _gridService: GridController,
        @Many(IGridCellRenderer) cellRenderers: Iterable<IGridCellRenderer>
    ) {
        this._cellRenderers = new Map();
        for (const cellRenderer of cellRenderers) {
            this._cellRenderers.set(cellRenderer.name, cellRenderer);
        }
    }

    renderPage(items: readonly any[]): RenderResult {
        return html`${repeat(items, x => this.render(x))}`
    }

    render(item: GridDataItem): RenderResult {
        if (item) {
            return html`<tr>${this.renderCells(item)}</tr>`
        }
        return html``;
    }

    protected *renderCells(item: GridDataItem): Iterable<HTMLTemplateResult> {
        for (const column of this._gridService.columns) {
            const renderer = this._cellRenderers.get(column.type ?? "text");
            if (renderer) {
                yield html`<td>
                    <aster-grid-cell
                        .item=${item}
                        class="${itemValue(item, column.cellClasses)}"
                        style="${itemValue(item, column.cellStyle)}">
                        ${renderer.render(item, column)}
                    </aster-grid-cell>
                </td>`;
            }
        }
    }
}
