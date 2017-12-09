import {Component, Input, OnInit} from "@angular/core";
import template from "./widget.component.html";
import style from "./widget.component.scss";
import {ChartService} from "../../services/chart.services";
import {WeddingService} from "../../../common/services/wedding.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Observable} from "rxjs/Observable";

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
    wedding: Observable<WeddingDB[]>

    constructor(private _chartService: ChartService,
                private _weddingService: WeddingService) {
        this.wedding = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.wedding.subscribe(wedding => {
            this.widget = this._chartService.getChart(this.chart, this.settings);
        });
    }
}