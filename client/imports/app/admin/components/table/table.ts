import {Component, OnInit} from "@angular/core";
import template from "./table.html";
import style from "./table.scss";

@Component({
    selector: "table-card",
    host: {
        class: 'table card',
    },
    template,
    styles: [style],
})

export class admin_TableComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {

    }
}