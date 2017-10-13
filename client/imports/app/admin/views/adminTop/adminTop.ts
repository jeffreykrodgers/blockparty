import { Component, OnInit } from "@angular/core";
import template from "./adminTop.html";
import style from "./adminTop.scss";
import {WeddingService} from "../../../services/wedding.service";

import * as moment from 'moment';

@Component({
    selector: "adminTop",
    host: {
        class: 'adminTop',
    },
    template,
    styles: [ style ]
})

export class AdminTopView implements OnInit {

    currentTime: any;
    weddingData: any;
    countdown: any;

    constructor(private _weddingService: WeddingService) {
        this.countdown = {};
    }

    ngOnInit() {
        this.weddingData = this._weddingService.getWedding({}).zone();

        this.weddingData.subscribe(wedding =>{
            this.weddingData = wedding[0];

            this.getCountdown();
        });

        let self = this;
        setInterval(function () {
            self.getCountdown();
        }, 10000);
    };

    private getCountdown() {
        let _weddingDate:any = moment(this.weddingData.date);
        let _currentDate:any = moment();
        let _diffTime:any = _weddingDate - _currentDate;
        let _duration:any = moment.duration(_diffTime);

        if (_diffTime > 0) {
            //TODO Fix to use moment.diff instead of duration
            this.countdown = {
                months: _duration._data.months,
                days: _duration._data.days + 1,
                hours: _duration._data.hours,
                minutes: _duration._data.minutes,
            }
        }
    }

}