import {Component, Input, OnInit} from "@angular/core";
import template from "./area.html";
import style from "./area.scss";

@Component({
    selector: "dashboard-area",
    host: {
        class: 'area',
    },
    template,
    styles: [style],
})

export class admin_AreaComponent implements OnInit {
    @Input() title: string;

    constructor() {

    }

    ngOnInit() {

    }
}