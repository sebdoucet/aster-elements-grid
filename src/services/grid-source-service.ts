import { EventEmitter, IEvent } from "@aster-js/events";
import { LogLevel, ServiceContract, ILogger } from "@aster-js/ioc";
import { Iterables } from "@aster-js/iterators";
import { IGridSourceService } from "../abstraction/igrid-source-service";
import type { GridFetchOptions } from "../gird-fetch-options";

@ServiceContract(IGridSourceService)
export class GridSourceService implements IGridSourceService {
    private readonly _onDidDataSourceChange: EventEmitter = new EventEmitter();
    private _version: number = 0;
    private _items?: any[];

    get version(): number { return this._version; }

    get onDidDataSourceChange(): IEvent { return this._onDidDataSourceChange.event; }

    constructor(@ILogger private readonly _logger: ILogger) { }

    getItems({ skip, take, filters, sort }: GridFetchOptions): Promise<readonly any[]> {

        if (filters.length) this._logger.log(LogLevel.warn, "");

        const items = this._items?.slice(skip, skip + take) ?? [];

        return Promise.resolve(items);
    }

    async setDataSource(value: unknown): Promise<void> {
        this._version++;

        if (Array.isArray(value)) {
            this._items = value;
        }
        else if (Iterables.cast(value)) {
            this._items = [...value];
        }
        else {
            this._items = [];
            console.error("Invalid Grid source");
        }

        this._onDidDataSourceChange.emit();
    }
}
