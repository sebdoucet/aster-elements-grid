import { ServiceCollection, ServiceContract, ServiceIdentifier } from "@aster-js/ioc";
import type { ColumnDefinition } from "./column-definition";

declare const AnyColumnDefinition: ColumnDefinition;
export type ColumnType = typeof AnyColumnDefinition.type;

export interface ColumnTypeHandler<TImpl> {
    readonly types: readonly ColumnType[];
    new(...args: any[]): TImpl;
}

export namespace ColumnType {

    export function* entries<TImpl extends Object>(handlers: Iterable<TImpl>): Iterable<[ColumnType, TImpl]> {
        const set = new Set<string>();
        for (const handler of handlers) {
            const types = (handler.constructor as ColumnTypeHandler<TImpl>).types;
            if (types && Array.isArray(types)) {
                for (const type of types) {
                    if (!set.has(type)) {
                        set.add(type);
                        yield [type, handler];
                    }
                }
            }
        }
    }

    export function tryAddHandlers<TImpl>(services: ServiceCollection, ...handlerType: ColumnTypeHandler<TImpl>[]): void {
        handlerType.forEach(h => tryAddHandler(services, h));
    }

    export function tryAddHandler<TImpl>(services: ServiceCollection, handlerType: ColumnTypeHandler<TImpl>): void {
        let supportedTypes = handlerType.types;
        for (const desc of services) {
            const serviceId = ServiceContract.resolve(handlerType);
            if (desc.serviceId === serviceId) {
                const ctor = desc.ctor as ColumnTypeHandler<TImpl>;
                if (ctor.types && Array.isArray(ctor.types)) {
                    supportedTypes = supportedTypes.filter(t => !ctor.types.includes(t));
                    if (supportedTypes.length === 0) return;
                }
            }
        }
        if (supportedTypes.length) {
            services.addSingleton(handlerType);
        }
    }
}
