import { ServiceIdentifier } from "@aster-js/ioc";

export const IGridService = ServiceIdentifier<IGridService>("IGridService");
export interface IGridService {

    updateOptions(): Promise<void>;

    render(): unknown;
}
