import { ServiceIdentifier } from "@aster-js/ioc";
import { RenderResult } from "./render-result";

export const IGridRowRenderer = ServiceIdentifier<IGridRowRenderer>("IGridRowRenderer");
export interface IGridRowRenderer {
    renderPage(items: readonly any[]): RenderResult;
}
