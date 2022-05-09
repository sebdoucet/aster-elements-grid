import { EventEmitter, IEvent } from "@aster-js/events";
import { ServiceContract } from "@aster-js/ioc";
import { Iterables } from "@aster-js/iterators";
import { IGridSourceService } from "./igrid-source-service";

@ServiceContract(IGridSourceService)
export class GridSourceService implements IGridSourceService {
    private readonly _onDidDataSourceChange: EventEmitter = new EventEmitter();
    private _version: number = 0;
    private _items: any[] = [];

    get version(): number { return this._version; }

    get onDidDataSourceChange(): IEvent { return this._onDidDataSourceChange.event; }

    getPageCount(pageSize: number): Promise<number> {
        const pageCount = Math.ceil(this._items.length / pageSize);
        return Promise.resolve(pageCount);
    }

    getItems(page: number, pageSize: number): Promise<readonly any[]> {
        const start = (page - 1) * pageSize;
        const items = this._items?.slice(start, start + pageSize) ?? [];
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

    async *getAutoCompletion(field: string): AsyncIterable<any> {
        const set = new Set();
        for (const item of this._items) {
            const value = item[field];
            if ( typeof value !== "undefined" && value !== null &&!set.has(value)) {
                yield value;
                set.add(value);
            }
        }
    }
}
