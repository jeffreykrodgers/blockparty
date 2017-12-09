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
    meals: any;
    guests?: object[];
    mealBudget: any;

    constructor(private _weddingService: WeddingService,
                private _utils: UtilityService) {
        this.init();
    }

    public init() {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.weddingData.subscribe(wedding => {
            this.meals = wedding[0].meals;
            this.guests = wedding[0].guests;
            this.mealBudget = wedding[0].budgets[0].max;
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
            title: {
                text: '',
                style: {display: 'none'},
            },
            tooltip: {
                enabled: false,
                backgroundColor: this._utils.getColor('white', 'hex'),
                borderWidth: 0,
                shadow: false,
                padding: 0,
                useHTML: true,
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
        const count = this.guests.length;
        const completed = this.guests.filter((guest:any) => guest.completed);
        const not_attending= completed.filter((guest:any) => !guest.attending);
        const attending = completed.filter((guest:any) => guest.attending);

        const p = Math.round((completed.length / count) * 100);
        const n = not_attending.length;
        const a = attending.length;

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
                color: this._utils.getColor('gray', 'hex'),
                actual: n,
                tooltip: {
                    pointFormat: `<span class="gauge-label point-label" style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>`
                }
            }],
            dataLabels: {
                enabled: true,
                borderWidth: 0,
                color: this._utils.getColor('gray', 'hex'),
                padding: 0,
                y: 0,
                useHTML: true,
                format: `<div class="gauge-labels">
                            <span class="gauge-label">${p}%</span>
                            <span class="gauge-name">Complete</span>
                         </div>`
            },
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
                tooltip: {
                    pointFormatter: () => {
                        `<span class="gauge-label point-label">{point.y}%</span>`
                    }
                }
            }],
            // rounded: true,
        }];
    }

    public getMealsData(chart) {
        let completed = this.guests.filter((guest:any) => guest.meal);
        let meals = [];
        let total = 0;

        for (let meal of this.meals) {
            let count = this.guests.filter((guest:any) => guest.meal === meal.name).length;
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
                    color: this._utils.getColor(meal.color, 'hex'),
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
        let meals = [];
        let total = 0;

        for (let meal of this.meals) {
            let count = this.guests.filter((guest:any) => guest.meal === meal.name).length;
            meals.push({
                name: meal.name,
                total: meal.price*count,
            });

            total += (meal.price*count);
        }

        let m = this.mealBudget;
        const p = Math.round((total / m) * 100);

        chart.yAxis.max = m;
        chart.title.text = 'Budget';
        chart.series = [{
            animation: {
                duration: 750
            },
            name: 'Budget Used',
            data: [{
                innerRadius: '100%',
                radius: '80%',
                y: total,
                name: 'Total',
                color: '#79ED94',
            }],
            dataLabels: {
                enabled: true,
                borderWidth: 0,
                color: this._utils.getColor('green', 'hex'),
                padding: 0,
                y: 0,
                useHTML: true,
                format: `<div class="gauge-labels">
                            <span class="gauge-label green">${p}%</span>
                            <span class="gauge-name">Budget Used</span>
                         </div>`
            }
            // rounded: true,
        }];
    }



}