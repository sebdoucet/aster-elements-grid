
export type GridFetchOptions = {
    readonly skip: number;
    readonly take: number;
    readonly sort: GridSortOptions[];
    readonly filters: IGridFilterOptions[];
}

export type GridSortOptions = {
    /** Name of the column where the filter must be applyed */
    readonly name: string;
    /** Indicate the direction of the sorting */
    readonly direction?: "asc" | "desc";
};

export type GridFilterOperator = "equal" | "notequal" | "lt" | "gt" | "lte" | "gte";

export type IGridFilterOptions = {
    /** Name of the column where the filter must be applyed */
    readonly name: string;
    /** Operator to apply e.g. equal */
    readonly operator: string;
    /** */
    readonly value: unknown;
};

export type BasicGridFilterOptions = IGridFilterOptions & {
    readonly type: "basic";
    readonly operator: GridFilterOperator;
    readonly value: string;
};
