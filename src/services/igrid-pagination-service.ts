import { ServiceIdentifier } from "@aster-js/ioc";

export const IGridPaginationService = ServiceIdentifier<IGridPaginationService>("IGridPaginationService");

export type GridPageData = {
    readonly page: number;
    readonly items: readonly any[];
}

export interface IGridPaginationService {
    readonly pageCount: number;
    readonly pageSize: number;
    getPage(page: number, pageSize: number): Promise<GridPageData>;
}
