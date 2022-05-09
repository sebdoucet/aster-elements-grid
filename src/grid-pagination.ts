import { html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { GridEvent } from "./grid-event";
import styles from "./grid-pagination.css";

@customElement("aster-grid-pagination")
export class GridPagination extends LitElement {

    static readonly styles = unsafeCSS(styles);

    @property({ type: Number })
    maxPageCount: number = 5;

    @property({ type: Number })
    page: number = 0;

    @property({ type: Number })
    pageCount: number = 0;

    protected render(): unknown {
        const pages = this.resolveVisiblePages().map((first, idx) => first + idx);
        return html`${repeat(pages, p => p, p => this.renderPage(p))}`;
    }

    protected renderPage(page: number): unknown {
        return html`<div
            @click=${(ev: Event) => this.onPageClick(ev, page)}
            class="${page === this.page ? "page selected" : "page"}">
            ${page}
        </div>`;
    }

    protected onPageClick(ev: Event, page: number): void {
        this.dispatchEvent(new CustomEvent("grid-request-page", { detail: page, bubbles: true, composed: true }));
        ev.stopPropagation();
    }

    protected resolveVisiblePages(): number[] {
        if (this.pageCount <= this.maxPageCount) {
            return new Array(this.pageCount).fill(1);
        }

        const first = Math.max(this.page - (this.maxPageCount / 2), 0);
        return new Array(this.maxPageCount).fill(Math.floor(first));
    }
}
