import {Component, Input, OnInit} from "@angular/core";
import template from "./chart.html";
import style from "./chart.scss";

@Component({
    selector: "chart-card",
    host: {
        class: 'chart card',
    },
    template,
    styles: [style],
})

export class admin_ChartComponent implements OnInit {
    @Input() chart: object;

    constructor() {

    }

    ngOnInit() {

    }
}