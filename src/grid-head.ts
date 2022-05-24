import { html, HTMLTemplateResult, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./grid-head.css";

@customElement("aster-grid-head")
export class GridHead extends LitElement {

    static readonly styles = unsafeCSS(styles);

    protected render(): HTMLTemplateResult {
        return html`<div class="content"><slot></slot></div>
        <div class="actions"><slot name="actions"></slot></div>`;
    }
}
