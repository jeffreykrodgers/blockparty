import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import template from "./area.html";
import style from "./area.scss";
import {ModalService} from "../../services/modals.service";
import {FilterService} from "../../services/filter.service";

declare let $: any;

@Component({
    selector: "dashboard-area",
    host: {
        class: 'area',
    },
    template,
    styles: [style],
})

export class admin_AreaComponent implements OnInit {
    @Input() slug: string;
    @Input() items: any[];
    @Output() sort = new EventEmitter();
    @Output() filter = new EventEmitter();

    filters: any[];

    constructor(private _modalService: ModalService,
                private _filterService: FilterService) {
        this.filters = [];
        this.items = {...this.items};
    }

    ngOnInit() {

    }

    setSort(sort) {
        this.sort.emit(sort);
    }

    addFilter(filter) {
        let selected = this._filterService.getFilter(filter);
        this.filters.push(selected);

        Meteor.setTimeout(() => {
            $('.ui.dropdown').dropdown();
        }, 500);
    }

    addFilterValue(filter, value) {

        let modify = this.filters.find(i => i === filter);
        let index = this.filters.indexOf(modify);

        modify.value = value;
        this.filters[index] = modify;
        this.filter.emit(this.filters);
    }

    removeFilter(filter) {
        this.filters.splice(this.filters.indexOf(filter), 1);
        this.filter.emit(this.filters);
    }


}