import { ServiceContract } from "@aster-js/ioc";
import { GridPageData, IGridPaginationService } from "./igrid-pagination-service";
import { IGridSourceService } from "./igrid-source-service";

@ServiceContract(IGridPaginationService)
export class GridPaginationService implements IGridPaginationService {
    private _pages: Map<number, GridPageData>;
    private _pageSize: number = 0;
    private _pageCount: number = 0;

    get pageSize(): number { return this._pageSize; }

    get pageCount(): number { return this._pageCount; }

    constructor(
        @IGridSourceService private readonly _gridSourceService: IGridSourceService
    ) {
        this._pages = new Map();
    }

    async getPage(page: number, pageSize: number): Promise<GridPageData> {
        if (this._pageSize !== pageSize) {
            this.onPageSizeChanged(pageSize);
        }
        let pageData = this._pages.get(page);
        if (!pageData) {
            const items = await this._gridSourceService.getItems(page, pageSize);
            pageData = { page, items };
            this._pages.set(page, pageData);
        }
        return pageData;
    }

    protected async onPageSizeChanged(pageSize: number): Promise<void> {
        this._pageSize = pageSize;
        this._pages.clear();
        this._pageCount = await this._gridSourceService.getPageCount(pageSize);
    }
}
