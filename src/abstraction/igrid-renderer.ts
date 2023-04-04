import { ServiceIdentifier } from "@aster-js/ioc";
import { HTMLTemplateResult } from "lit";

export const IGridRenderer = ServiceIdentifier<IGridRenderer>("IGridRenderer");
export interface IGridRenderer {
    render(items: unknown[]): unknown;
}
