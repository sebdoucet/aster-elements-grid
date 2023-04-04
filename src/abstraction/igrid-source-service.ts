import { IEvent } from "@aster-js/events";
import { ServiceIdentifier } from "@aster-js/ioc";
import type { GridFetchOptions } from "../gird-fetch-options";

export const IGridSourceService = ServiceIdentifier<IGridSourceService>("IGridSourceService");

export interface IGridSourceService {

    readonly version: number;

    readonly onDidDataSourceChange: IEvent;

    getItems(opts: GridFetchOptions): Promise<readonly any[]>;

    setDataSource(value: unknown): Promise<void>;
}
