import { ServiceIdentifier } from "@aster-js/ioc";
import { ColumnDefinition } from "../column-definition";
import { RenderResult } from "./render-result";

export const IGridColAction = ServiceIdentifier<IGridColAction>("IGridColAction");

export interface IGridColAction {
    render(definition: ColumnDefinition): RenderResult;
}
