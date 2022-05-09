import { Directive, directive } from "lit-html/directive.js";

export type ItemValue<TItem = any, TResult = unknown> = TResult extends Function ? never : TResult | ((item: TItem) => TResult);

class ItemValueDirective<TItem, TResult> extends Directive {

    render(item: any, value: ItemValue): unknown {
        if (typeof value === "function") {
            return value(item);
        }
        return value;
    }
}

export const itemValue = directive(ItemValueDirective)
