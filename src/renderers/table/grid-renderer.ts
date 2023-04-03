import { Many, ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { GridService } from "../../services/grid-service";
import { IGridRenderer } from "../../abstraction/igrid-renderer";
import { IGridService } from "../../abstraction/igrid-service";
import { IGridCellRenderer } from "../../abstraction/igrid-cell-renderer";
import { ColumnDefinition } from "../../column-definition";

@ServiceContract(IGridRenderer)
export class GridRenderer implements IGridRenderer {
    private readonly _cellRenderers: Map<string, IGridCellRenderer>;

    constructor(
        @IGridService private readonly _gridService: GridService,
        @Many(IGridCellRenderer) cellRenderers: Iterable<IGridCellRenderer>
    ) {
        this._cellRenderers = new Map();
        for (const cellRenderer of cellRenderers) {
            this._cellRenderers.set(cellRenderer.name, cellRenderer);
        }
    }

    render(items: any[]): unknown {
        return html`<table class="aster-table">
            ${this.renderHeader()}
            ${this.renderBody(items)}
        </table>`;
    }

    protected renderHeader(): unknown {
        return html`<thead class="aster-table__headers">
            ${this.renderColumns()}
        </thead>`;
    }

    protected *renderColumns(): Iterable<HTMLTemplateResult> {
        for (const [column, renderer] of this.getRenderers()) {
            yield html`<th class="aster-table__header">
                <div class="aster-table__header__wrapper">
                    ${renderer.renderCellHeader(column)}
                </th>
            </td>`;
        }
    }

    protected renderBody(items: any[]): unknown {
        return html`<tbody class="aster-table__rows">${this.renderRows(items)}</tbody>`;
    }

    protected *renderRows(items: any[]): Iterable<HTMLTemplateResult> {
        for (const item of items) {
            if (item) yield html`<tr class="aster-table__row">${this.renderCells(item)}</tr>`;
        }
    }

    protected *renderCells(item: unknown): Iterable<unknown> {
        for (const [column, renderer] of this.getRenderers()) {
            yield html`<td class="aster-table__cell">
                <div class="aster-table__cell__wrapper">
                    ${renderer.renderCellData(item, column)}
                </div>
            </td>`;
        }
    }

    private *getRenderers(): Iterable<[ColumnDefinition, IGridCellRenderer]> {
        for (const column of this._gridService.columns) {
            const renderer = this._cellRenderers.get(column.type);
            if (renderer) yield [column, renderer];
        }
    }
}
