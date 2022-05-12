import { IGrid } from "./abstraction/igrid";
import { IGridCell } from "./abstraction/igrid-cell";
import { GridDataItem } from "./column-definition";

export type GridEventMap = {
    "grid-items-changed": void
};

export class GridEvent<K extends keyof GridEventMap, T extends GridEventMap[K]> extends CustomEvent<T> {

    constructor(eventName: K, readonly source: IGrid, detail: T) {
        super(eventName, { composed: true, bubbles: true, detail });
    }
}

export type CellEventMap = {
    "cell-click": GridDataItem,
    "cell-focus": GridDataItem
};

export class CellEvent<K extends keyof CellEventMap> extends CustomEvent<CellEventMap[K]> {

    constructor(eventName: K, readonly source: IGridCell, detail: CellEventMap[K]) {
        super(eventName, { composed: true, bubbles: true, detail });
    }
}
