import { Directive, directive } from "lit-html/directive.js";
import { GridDataItem } from "./column-definition";

export type ItemValue<TItem = any, TResult = unknown> = TResult extends Function ? never : TResult | ((item: TItem) => TResult);

class ItemValueDirective<TItem, TResult> extends Directive {

    render(item: GridDataItem, value: ItemValue): unknown {
        if (typeof value === "function") {
            return value(item);
        }
        return value;
    }
}

export const itemValue = directive(ItemValueDirective)
