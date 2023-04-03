import { ServiceContract } from "@aster-js/ioc";
import { IGrid } from "../abstraction/igrid";
import { IGridRenderer } from "../abstraction/igrid-renderer";
import { GridOptions } from "../abstraction/igrid-service";
import { IGridService } from "../abstraction/igrid-service";
import { IGridSourceService } from "../abstraction/igrid-source-service";

@ServiceContract(IGridService)
export class GridService implements IGridService {
    private _options: GridOptions;

    get options(): GridOptions { return this._options; }

    constructor(
        private readonly _grid: IGrid,
        @IGridSourceService private readonly _sourceService: IGridSourceService,
        @IGridRenderer private readonly _renderer: IGridRenderer
    ) {
        this._options = {
            columns: this._grid.columns,
            dataSource: this._grid.dataSource
        }
    }

    async updateOptions(): Promise<void> {
        if (this._options.columns !== this._grid.columns) {

        }
        await this._sourceService.setDataSource(this._grid.dataSource);
        this._grid.requestRender();
    }

    render(): unknown {
        return this._renderer.render();
    }
}
