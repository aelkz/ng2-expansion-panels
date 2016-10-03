import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { ExpansionPanelsContainerComponent } from '../expansion-panels-container';

@Component({
    selector: 'expansion-panel',
    styles: [ require('./expansion-panel.style.scss').toString() ],
    template: require('./expansion-panel.template.html')
})
export class ExpansionPanelComponent {
    // outputs
    @Output() private onOpen: EventEmitter<ExpansionPanelComponent> = new EventEmitter();
    @Output() private onClose: EventEmitter<ExpansionPanelComponent> = new EventEmitter();
    @Output() private onCancel: EventEmitter<any> = new EventEmitter();
    @Output() private onSubmit: EventEmitter<any> = new EventEmitter();

    // inputs
    @Input() private buttons: boolean = true;

    constructor(private container: ExpansionPanelsContainerComponent) {}

    /**
     * @name toggle
     */
    public toggle(): void {
        (this.isToggled) ? this.unselect() : this.select();
    }

    /**
     * @name isToggled
     * @returns {boolean}
     */
    public get isToggled(): boolean {
        return this.container.selectedPanel === this;
    }

    /**
     * @name submit
     */
    public submit(): void {
        this.onSubmit.emit();
    }

    /**
     * @name cancel
     */
    public cancel(): void {
        this.onCancel.emit();
    }

    /**
     * @name select
     */
    private select(): void {
        this.container.selectedPanel = this;
        this.onOpen.emit(this);
    }

    /**
     * @name unselect
     */
    private unselect(): void {
        this.container.selectedPanel = undefined;
        this.onClose.emit(this);
    }
}