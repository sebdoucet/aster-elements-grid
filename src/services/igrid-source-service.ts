import { IEvent } from "@aster-js/events";
import { ServiceIdentifier } from "@aster-js/ioc";

export const IGridSourceService = ServiceIdentifier<IGridSourceService>("IGridSourceService");

export interface IGridSourceService {

    readonly version: number;

    readonly onDidDataSourceChange: IEvent;

    getPageCount(pageSize: number):Promise<number>;

    getItems(page: number, pageSize: number): Promise<readonly any[]>;

    setDataSource(value: unknown): Promise<void>;

    getAutoCompletion(field: string): AsyncIterable<any>;
}
