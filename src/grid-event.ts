import { IGrid } from "./abstraction/igrid";
import { IGridCell } from "./abstraction/igrid-cell";
import type { GridElement } from "./grid-element";

export type GridElementEventMap = {
    "grid-element-connected": void
};

export class GridElementEvent<K extends keyof GridElementEventMap = any, T extends GridElementEventMap[K] = void> extends CustomEvent<T> {

    constructor(eventName: K, readonly source: GridElement, detail: T) {
        super(eventName, { composed: true, bubbles: true, detail });
    }
}

export type GridEventMap = {
    "grid-items-changed": void
};

export class GridEvent<K extends keyof GridEventMap, T extends GridEventMap[K]> extends CustomEvent<T> {

    constructor(eventName: K, readonly source: IGrid, detail: T) {
        super(eventName, { composed: true, bubbles: true, detail });
    }
}

export type CellEventMap = {
    "cell-click": void,
    "cell-focus": void
};

export class CellEvent<K extends keyof CellEventMap> extends CustomEvent<CellEventMap[K]> {

    constructor(eventName: K, readonly source: IGridCell, detail: CellEventMap[K]) {
        super(eventName, { composed: true, bubbles: true, detail });
    }
}
