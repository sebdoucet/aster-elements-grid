import { HTMLTemplateResult } from "lit";

export type RenderResult = HTMLTemplateResult | string | Iterable<HTMLTemplateResult> | Iterable<string>;
