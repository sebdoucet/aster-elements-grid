import { ServiceContract } from "@aster-js/ioc";
import { IGrid } from "../abstraction/igrid";
import { IGridRenderer } from "../abstraction/igrid-renderer";
import { GridOptions } from "../abstraction/igrid-service";
import { IGridService } from "../abstraction/igrid-service";
import { IGridSourceService } from "../abstraction/igrid-source-service";
import type { GridConfigureOptions } from "../grid-configure-options";
import type { GridFetchOptions } from "../gird-fetch-options";

@ServiceContract(IGridService)
export class GridService implements IGridService {
    private _configureOptions: GridConfigureOptions;
    private _fetchOptions: GridFetchOptions;
    private _data: unknown[] =[];

    constructor(
        private readonly _grid: IGrid,
        @IGridSourceService private readonly _sourceService: IGridSourceService,
        @IGridRenderer private readonly _renderer: IGridRenderer
    ) {
        this._configureOptions = {
            columns: this._grid.columns,
            dataSource: this._grid.dataSource
        };
        this._fetchOptions = {
            skip: 0,
            take: 10,
            orderBy: [],
            filters: []
        }
    }

    async configure(callback: ()=> GridConfigureOptions): Promise<void> {
        if (this._configureOptions.columns !== this._grid.columns) {

        }
        await this._sourceService.setDataSource(this._grid.dataSource);
        this._data = this._sourceService.getItems(this._options);
        this._grid.requestRender();
    }

    render(): unknown {
        return this._renderer.render(this._data, this._configureOptions);
    }
}
