import { IEvent } from "@aster-js/events";
import { ServiceIdentifier } from "@aster-js/ioc";

export const IGridSourceService = ServiceIdentifier<IGridSourceService>("IGridSourceService");

export interface IGridSourceService {

    readonly version: number;

    readonly onDidDataSourceChange: IEvent;

    getItems(skip: number, take: number): Promise<readonly any[]>;

    setDataSource(value: unknown): Promise<void>;
}
