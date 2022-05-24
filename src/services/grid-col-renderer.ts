import { Many, ServiceContract } from "@aster-js/ioc";
import { html, HTMLTemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { GridController } from "./grid-controller";
import { IGridController } from "./igrid-controller";
import { IGridColRenderer } from "./igrid-col-renderer";
import { RenderResult } from "./render-result";
import { IGridColAction } from "./igrid-col-action";

@ServiceContract(IGridColRenderer)
export class GridColRenderer implements IGridColRenderer {

    constructor(
        @IGridController private readonly _controller: GridController,
        @Many(IGridColAction) private readonly _actions: Iterable<IGridColAction>
    ) {
    }

    renderHead(): RenderResult {
        return html`<tr>${this.renderRowHeaders()}</tr>`;
    }

    protected *renderRowHeaders(): Iterable<HTMLTemplateResult> {
        for (const column of this._controller.columns) {
            yield html`<th scope="col">
                <aster-grid-head>
                    ${column.header}
                    <div slot="actions">${repeat(this._actions, a => a.render(column))}</div>
                </aster-grid-head>
            </th>`;
        }
    }
}
