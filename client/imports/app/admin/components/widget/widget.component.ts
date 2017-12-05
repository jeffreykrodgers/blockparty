import {Component, Input, OnInit} from "@angular/core";
import template from "./widget.component.html";
import style from "./widget.component.scss";
import {ChartService} from "../../services/chart.services";

@Component({
    selector: "widget",
    host: {
        class: 'widget',
    },
    template,
    styles: [style],
})

export class admin_WidgetComponent implements OnInit {
    @Input() title: string;
    @Input() chart: any;
    @Input() settings: any;
    widget: any;

    constructor(private _chartService: ChartService) {}

    ngOnInit() {
        this.widget = this._chartService.getChart(this.chart, this.settings);
    }
}