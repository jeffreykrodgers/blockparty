import {Component, Input, OnInit} from "@angular/core";
import template from "./widget.component.html";
import style from "./widget.component.scss";
import {ModalService} from "../modals/modals.service";
import * as Highcharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
import * as SolidGauge from 'highcharts/modules/solid-gauge';


HighchartsMore(Highcharts);
SolidGauge(Highcharts);

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
    options: object;

    constructor(private _modalService: ModalService) {
        this.options = {

            chart: {
                type: 'solidgauge',
                height: 128,
                // width: '100%',
                spacingTop: 0,
                spacingRight: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                plotBorderWidth: 0,
                marginRight: 0,
                marginLeft: 0,
                marginTop: 0,
                marginBottom: 0
            },
            tooltip: {
                enabled: false
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            pane: {
                size: '99%',
                startAngle: 0,
                endAngle: 360,

                background: {
                    outerRadius: '101%',
                    backgroundColor: '#ffffff',
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            yAxis: {
                labels: {
                    enabled: false
                },

                min: 0,
                max: 100,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                minorTickLength: 0,
                tickInterval: 67,
                tickPositions: [67],
                tickColor: '#000000',
                tickPosition: 'outside',
                tickLength: 4,
                tickWidth: 1,

            },

            series: [{
                innerRadius: '70%',
                data: [{y:55,color:'red'}],
                radius: '55%'
            }, {
                innerRadius: '85%',
                data: [{y:55,color:'orange'}],
                radius: '70%'
            }, {
                innerRadius: '100%',
                radius: '85%',
                data: [{y:25,color:'green'}],
            }, {
                innerRadius: '101',
                data: [{y:67,color:'black'}]
            }]
        }
    }

    ngOnInit() {

    }
}