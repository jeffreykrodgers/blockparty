import {Component, Input, OnInit} from "@angular/core";
import template from "./table.html";
import style from "./table.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {ModalService} from "../../views/modals/modals.service";

declare let $: any;

@Component({
    selector: "table-card",
    host: {
        class: 'table',
    },
    template,
    styles: [style],
})

export class admin_TableComponent implements OnInit {
    @Input() table: any;
    @Input() index: any;

    tableCount: number;
    tablePercent: number;
    // options: any;

    constructor(private _weddingService: WeddingService) {
        // this.options = {
        //     credits: {
        //         enabled: false,
        //     },
        //     chart: {
        //         type: 'bar',
        //         backgroundColor: 'rgba(0,0,0,0)'
        //     },
        //     pane: {
        //         center: ['50%', '85%'],
        //         size: '140%',
        //         startAngle: -90,
        //         endAngle: 90,
        //         background: {
        //             backgroundColor: 'rgba(0,0,0,0)',
        //             innerRadius: '60%',
        //             outerRadius: '100%',
        //         }
        //     },
        //     plotOptions: {
        //         solidgauge: {
        //
        //         }
        //     },
        //     series: {
        //         type: 'bar',
        //         data: [{
        //             y: 6,
        //             name: "Guests",
        //             color: "#00FF00"
        //         }]
        //     },
        //     title: {
        //         text: ''
        //     },
        //     yAxis: {
        //         min: 0,
        //         max: 200,
        //         title: {
        //             text: 'Guests'
        //         }
        //     },
        // };
    }

    ngOnInit() {
        this.tableCount = this.table.guests ? this.table.guests.length : 0;
        this.tablePercent = 100*(this.tableCount/this.table.seats);

        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });
    }
}