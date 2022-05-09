import { Disposable } from "@aster-js/core";
import { Debouncer } from "@aster-js/async";
import { ServiceContract } from "@aster-js/ioc";
import { html, render } from "lit";

import { IGrid } from "../abstraction/igrid";
import { ColumnDefinition } from "../column-definition";
import { IGridRowRenderer } from "./igrid-row-renderer";
import { IGridController } from "./igrid-controller";
import { IGridSourceService } from "./igrid-source-service";
import { RenderResult } from "./render-result";
import { IGridColRenderer } from "./igrid-col-renderer";
import { GridPageData, IGridPaginationService } from "./igrid-pagination-service";

@ServiceContract(IGridController)
export class GridController extends Disposable implements IGridController {
    private readonly _render: Debouncer;

    get columns(): readonly ColumnDefinition[] { return this._grid.columns; }

    constructor(
        private readonly _grid: IGrid & HTMLElement,
        @IGridColRenderer private readonly _colRenderer: IGridColRenderer,
        @IGridRowRenderer private readonly _rowRenderer: IGridRowRenderer,
        @IGridSourceService private readonly _sourceService: IGridSourceService,
        @IGridPaginationService private readonly _paginationService: IGridPaginationService
    ) {
        super();
        this.registerForDispose(
            this._render = new Debouncer(this.render.bind(this), { delay: 100, overdue: 300 })
        );
    }

    async load(): Promise<void> {
        await this.syncDataSource();
    }

    async syncDataSource(): Promise<void> {
        await this._sourceService.setDataSource(this._grid.dataSource);
    }

    requestRender(): void {
        this._render.invoke();
    }

    protected async render(): Promise<void> {
        const page = await this._paginationService.getPage(this._grid.page, this._grid.pageSize);
        const template = this.renderTable(page);

        render(template, this._grid);
    }

    protected renderTable(pageData: GridPageData): RenderResult {
        return html`
            <table slot="table">
                <thead>
                    ${this._colRenderer.renderHead()}
                </thead>
                <tbody>
                    ${this._rowRenderer.renderPage(pageData.items)}
                </tbody>
            </table>
            <aster-grid-pagination
                slot="pagination"
                .page=${pageData.page}
                .pageSize=${this._paginationService.pageSize}
                .pageCount=${this._paginationService.pageCount}/>
        `;
    }
}
