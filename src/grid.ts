import { IIoCContainerBuilder, IIoCModule, IoCKernel, ServiceCollection } from "@aster-js/ioc";
import { unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GridService } from "./services/grid-service";
import { asserts, IDisposable } from "@aster-js/core";
import { dom } from "@aster-js/dom";
import { DefaultGridCellRenderer } from "./cell-renderers/default-grid-cell-renderer";
import { GridRowRenderer } from "./renderers/table/grid-row-renderer";
import { IGrid } from "./abstraction/igrid";

import { IGridSourceService } from "./abstraction/igrid-source-service";
import { GridSourceService } from "./services/grid-source-service";

import { ColumnDefinition } from "./column-definition";
import styles from "./grid.css";
import { GridElement } from "./grid-element";
import { GridElementEvent } from "./grid-event";
import { IGridRenderer } from "./abstraction/igrid-renderer";
import { IGridService } from "./abstraction/igrid-service";

@customElement("aster-grid")
export class Grid extends GridElement implements IGrid {
    private _module: IIoCModule | null = null;
    private _svc: IGridService | null = null;
    private _dataSource: unknown = [];
    private readonly _setupQueue: GridElement[] = [];

    static readonly styles = unsafeCSS(styles);

    @property()
    get dataSource(): unknown { return this._dataSource; }
    set dataSource(value: unknown) {
        if (value !== this._dataSource) {
            const oldValue = this._dataSource;
            this._dataSource = value;
            this.onDidSourceChanged(oldValue);
        }
    }

    @property({ type: Boolean })
    readonly autoLoad: boolean = true;

    columns: readonly ColumnDefinition[] = [];

    protected *setupListeners(): Iterable<IDisposable> {
        yield dom.on(this, "grid-element-connected", (ev) => this.onGridElementConnected(ev as GridElementEvent))
    }

    protected onGridElementConnected(ev: GridElementEvent): void {
        ev.stopPropagation();

        if (!ev.defaultPrevented && ev.source.setup) {
            if (this._module) {
                ev.source.setup(this._module.services);
            }
            else {
                this._setupQueue.push(ev.source);
            }
        }
    }

    async load(iocModule?: IIoCModule): Promise<void> {
        this._module = this.createModule(iocModule)
            .setup(IGridSourceService, x => x.setDataSource(this.dataSource))
            .build();
    }

    private createModule(iocModule?: IIoCModule): IIoCContainerBuilder {

        if (iocModule) {
            return iocModule.createChildScope("grid")
                .configure(services => this.configure(services));
        }

        return IoCKernel.create()
            .configure(services => this.configure(services));
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (!this._module && this.autoLoad) {
            this.load();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        IDisposable.safeDispose(this._module);
        this._module = null;
    }

    protected configure(services: ServiceCollection): void {
        services
            .tryAddSingleton(GridService, { baseArgs: [this] })
            .tryAddSingleton(GridSourceService)
            .tryAddSingleton(DefaultGridCellRenderer)
            .tryAddSingleton(GridRowRenderer);
    }

    protected async onDidSourceChanged(oldValue: unknown): Promise<void> {
        if (this._svc) {
            await this._svc.updateDataSource(this._dataSource);
            this.requestUpdate("items", oldValue);
        }
    }

    protected render(): unknown {
        if(this._svc){
            return this._svc.render();
        }
    }
}
