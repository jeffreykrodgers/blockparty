import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

import * as Highcharts from 'highcharts';
import * as SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsMore = require('highcharts/highcharts-more');

import {WeddingDB} from "../../../../../both/models/wedding.model";
import {WeddingService} from "../../common/services/wedding.service";
import {UtilityService} from "../../common/services/utils.services";

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

@Injectable()
export class ChartService {
    weddingData: Observable<WeddingDB[]>;
    meals: object[];
    guests: object[];

    constructor(private _weddingService: WeddingService,
                private _utils: UtilityService) {
        this.init();
    }

    public init() {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.weddingData.subscribe(wedding => {
            this.meals = wedding[0].meals;
            this.guests = wedding[0].guests;
        });
    }

    public getChart(type, settings: any = {}) {
        let chart: any = {
            chart: {
                animation: {
                    duration: 50,
                },
                type: 'solidgauge',
                height: 128,
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
                // enabled: false
            },
            title: {
                text: '',
                style: {display: 'none'},
            },
            credits: {
                enabled: false
            },
            pane: {
                size: '100%',
                startAngle: 0,
                endAngle: 360,

                background: {
                    innerRadius: '80%',
                    outerRadius: '100%',
                    backgroundColor: '#EEEEEE',
                    borderWidth: 0,
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false,
                    },
                    // linecap: 'round',
                },
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
                tickInterval: 0,
                tickPositions: [],
                tickPosition: 'outside',
                tickLength: 4,
                tickWidth: 1,

            },
            series: []
        };

        Object.assign(chart, settings);
        this.chartData(chart, type);

        return chart;
    }

    private chartData(chart, type) {
        switch (type) {
            case 'rsvp':
                this.getRsvpData(chart);
                break;
            case 'meals':
                this.getMealsData(chart);
                break;
            case 'budget':
                this.getBudgetData(chart);
                break;
        }
    }

    public getRsvpData(chart) {
        let count = this.guests.length;
        let completed = this.guests.filter(guest => guest.completed);
        let not_attending= completed.filter(guest => !guest.attending);
        let attending = completed.filter(guest => guest.attending);

        let p = Math.round((completed.length / count) * 100);
        let n = not_attending.length;
        let a = attending.length;

        chart.yAxis.max = count;
        chart.title.text = 'RSVP Completion';
        chart.series = [{
            animation: {
                duration: 750
            },
            name: 'Not Attending',
            data: [{
                innerRadius: '100%',
                radius: '80%',
                y: n + a,
                color: '#ED5858',
                actual: n
            }],
            dataLabels: {
                enabled: true,
                format: `<span>${p}%</span>`
            }
            // rounded: true,
        }, {
            animation: {
                duration: 750
            },
            name: 'Attending',
            data: [{
                innerRadius: '100%',
                radius: '80%',
                y: a,
                color: '#79ED94',
                actual: a,
            }],
            // rounded: true,
        }];
    }

    public getMealsData(chart) {
        let completed = this.guests.filter(guest => guest.meal);
        let meals = [];
        let total = 0;

        for (let meal of this.meals) {
            let count = this.guests.filter(guest => guest.meal === meal.name).length;
            total += count;

            meals.push({
                animation: {
                    duration: 750
                },
                name: meal.name,
                data: [{
                    innerRadius: '100%',
                    radius: '80%',
                    y: total,
                    color: this._utils.invertColorType(meal.color, 'hex'),
                    actual: count,
                }],
                index: this.meals.length - meals.length,
                // rounded: true,
            });


        }

        chart.series = meals;
        chart.title.text = 'Meal Selection';
        chart.yAxis.max = completed.length;
        }

    public getBudgetData(chart) {
        chart.series = [{
            animation: {
                duration: 750
            },
            data: [{
                innerRadius: '100%',
                radius: '80%',
                y: 55,
                name: 'Total',
                color: '#79ED94'
            }],
            // rounded: true,
        }];
    }



}