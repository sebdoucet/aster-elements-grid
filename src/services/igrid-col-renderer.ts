import { ServiceIdentifier } from "@aster-js/ioc";
import { RenderResult } from "./render-result";

export const IGridColRenderer = ServiceIdentifier<IGridColRenderer>("IGridColRenderer");
export interface IGridColRenderer {
    renderHead():  RenderResult;
}
