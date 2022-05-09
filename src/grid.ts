import { IDisposable, Tags } from "@aster-js/core";
import { IIoCContainerBuilder, IIoCModule, IoCKernel, ServiceCollection } from "@aster-js/ioc";
import { html, HTMLTemplateResult, LitElement, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IGrid } from "./abstraction/igrid";
import { GridController } from "./services/grid-controller";
import { GridRowRenderer } from "./services/grid-row-renderer";
import { IGridController } from "./services/igrid-controller";
import { GridColRenderer } from "./services/grid-col-renderer";
import { GridSourceService } from "./services/grid-source-service";
import { DefaultGridCellRenderer } from "./cell-renderers/default-grid-cell-renderer";
import { NumberGridCellRenderer } from "./cell-renderers/number-grid-cell-renderer";

import { ColumnDefinition } from "./column-definition";
import { GridPaginationService } from "./services/grid-pagination-service";
import styles from "./grid.css";

@customElement("aster-grid")
export class Grid extends LitElement implements IGrid {
    private _module: IIoCModule | null = null;
    private _dataSource: unknown = [];
    private _ready: boolean = false;

    static readonly styles = unsafeCSS(styles);

    @property({ attribute: "datasource" })
    get dataSource(): unknown { return this._dataSource; }
    set dataSource(value: unknown) {
        if (value !== this._dataSource) {
            const oldValue = this._dataSource;
            this._dataSource = value;
            this.onDidSourceChanged(oldValue);
        }
    }

    @property({ type: Number, attribute: true })
    page: number = 1;

    @property({ type: Number, attribute: "page-size" })
    pageSize: number = 10;

    columns: readonly ColumnDefinition[] = [];

    @property({ type: Boolean, attribute: "auto-load" })
    autoLoad?: boolean;

    async load(iocModule?: IIoCModule): Promise<void> {
        this._module = this.createContainerBuilder(iocModule)
            .configure(services => this.configure(services))
            .setup(IGridController, ctl => ctl.load())
            .build();

        await this._module.start();
        this.requestUpdate();
    }

    protected createContainerBuilder(iocModule?: IIoCModule): IIoCContainerBuilder {
        if (iocModule) {
            const hashId = Tags.hashId.get(this);
            return iocModule.createChildScope(`aster-grid#${hashId}`);
        }
        return IoCKernel.create();
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (!this._module && this.autoLoad) {
            this.load();
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        const disposingError = IDisposable.safeDispose(this._module);
        disposingError && console.error(disposingError);
        this._module = null;
    }

    protected configure(services: ServiceCollection): void {
        services
            .addSingleton(GridController, { delayed: true, baseArgs: [this] })
            .addSingleton(GridSourceService)
            .addSingleton(GridColRenderer)
            .addSingleton(DefaultGridCellRenderer)
            .addSingleton(NumberGridCellRenderer)
            .addSingleton(GridRowRenderer)
            .addSingleton(GridPaginationService);
    }

    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.update(changedProperties);
        if (this._ready) {
            this.controller()?.requestRender();
        }
    }

    protected firstUpdated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(changedProperties);
        this._ready = true;
    }

    protected render(): HTMLTemplateResult {
        return html`<main @grid-request-page=${this.onRequestPage}>
            <div class="table"><slot name="table"></slot></div>
            <div class="pagination"><slot name="pagination"></slot></div>
        </main>`;
    }

    protected onRequestPage(ev: CustomEvent<number>): void {
        ev.stopPropagation();
        this.page = ev.detail;
    }

    //@cacheResult({ ignoreUndefined: true })
    protected controller(): IGridController | undefined {
        return this._module?.services.get(IGridController, true);
    }

    protected async onDidSourceChanged(oldValue: unknown): Promise<void> {
        const controller = this.controller();
        if (controller) {
            await controller.syncDataSource();
            this.requestUpdate("dataSource", oldValue);
        }
    }
}
