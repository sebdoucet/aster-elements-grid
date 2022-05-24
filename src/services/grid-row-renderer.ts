import { Many, ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { GridController } from "./grid-controller";
import { IGridCellRenderer, IGridCellRendererImpl } from "./igrid-cell-renderer";
import { IGridRowRenderer } from "./igrid-row-renderer";
import { IGridController } from "./igrid-controller";
import { RenderResult } from "./render-result";
import { ColumnDefinition, GridDataItem } from "../column-definition";
import { GridPropertyAccessorDelegate, IGridPropertyValueAccessor } from "./igrid-property-value-accessor";
import { ColumnType } from "../column-type";

type DefinitionWithAccessor = readonly [ColumnDefinition, GridPropertyAccessorDelegate];

@ServiceContract(IGridRowRenderer)
export class GridRowRenderer implements IGridRowRenderer {
    private readonly _cellRenderers: Map<ColumnType, IGridCellRendererImpl>;

    constructor(
        @IGridController private readonly _gridService: GridController,
        @Many(IGridCellRenderer) cellRenderers: Iterable<IGridCellRendererImpl>,
        @IGridPropertyValueAccessor private readonly _accessor: IGridPropertyValueAccessor
    ) {
        const entries = ColumnType.entries(cellRenderers);
        this._cellRenderers = new Map(entries);
    }

    renderPage(items: readonly any[]): RenderResult {
        const definitions = this._gridService.columns.map(c => [c, this._accessor.resolveAccessor(c)] as const)
        return html`${repeat(items, x => this.render(x, definitions))}`
    }

    protected render(item: GridDataItem, definitions: DefinitionWithAccessor[]): RenderResult {
        if (item) {
            return html`<tr>${this.renderCells(item, definitions)}</tr>`
        }
        return html``;
    }

    protected *renderCells(item: GridDataItem, definitions: DefinitionWithAccessor[]): Iterable<HTMLTemplateResult> {
        for (const [def, acc] of definitions) {
            const renderer = this._cellRenderers.get(def.type ?? "default");
            if (renderer) {
                const value = acc(item);
                yield html`<td>${renderer.render(value, item, def)}</td>`;
            }
            else {
                yield html`<td></td>`;
            }
        }
    }
}
