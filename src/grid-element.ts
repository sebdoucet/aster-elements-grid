import { IDisposable } from "@aster-js/core";
import { IServiceProvider } from "@aster-js/ioc";
import { LitElement } from "lit";
import { GridElementEvent } from "./grid-event";

export class GridElement extends LitElement {
    private readonly _listeners: IDisposable[] = [];

    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    setup?(services: IServiceProvider): Promise<void>;

    connectedCallback(): void {
        super.connectedCallback();

        if (this.setupListeners) {
            this._listeners.push(...this.setupListeners());
        }

        this.dispatchEvent(new GridElementEvent("grid-element-connected", this, void 0));
    }

    protected setupListeners?(): Iterable<IDisposable>;

    disconnectedCallback(): void {
        super.disconnectedCallback();
        IDisposable.safeDisposeAll(this._listeners.splice(0));
    }
}
