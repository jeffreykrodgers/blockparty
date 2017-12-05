import {Injectable, EventEmitter} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsMore = require('highcharts/highcharts-more');

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

@Injectable()
export class ChartService {
    constructor() {}

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
                text: ''
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
                // tickColor: '#000000',
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
                chart.series = [{
                    animation: {
                        duration: 750
                    },
                    data: [{
                        innerRadius: '100%',
                        radius: '80%',
                        y: 70,
                        name: 'Not Attending',
                        color: '#ED5858'
                    }],
                    // rounded: true,
                }, {
                    animation: {
                        duration: 750
                    },
                    data: [{
                        innerRadius: '100%',
                        radius: '80%',
                        y: 65,
                        name: 'Attending',
                        color: '#79ED94'
                    }],
                    // rounded: true,
                }];
                break;
            case 'meals':
                chart.series = [
                    {
                        animation: {
                            duration: 750
                        },
                        data: [{
                            innerRadius: '100%',
                            radius: '80%',
                            y: 100,
                            name: 'Chicken',
                            color: '#8781EF'
                        }],
                        // rounded: true,
                    }, {
                        animation: {
                            duration: 750
                        },
                        data: [{
                            innerRadius: '100%',
                            radius: '80%',
                            y: 65,
                            name: 'Vegetarian',
                            color: '#78ECD6'
                        }],
                        // rounded: true,
                    }, {
                        animation: {
                            duration: 750
                        },
                        data: [{
                            innerRadius: '100%',
                            radius: '80%',
                            y: 25,
                            name: 'Salmon',
                            color: '#F6A2D3'
                        }],
                        // rounded: true,
                    }
                ];
                break;
            case 'budget':
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
                break;
        }
    }

}