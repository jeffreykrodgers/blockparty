import {Component, Input, OnInit} from "@angular/core";
import template from "./countdown.component.html";
import style from "./countdown.component.scss";
import {ModalService} from "../modals/modals.service";

import * as moment from 'moment';
import {WeddingService} from "../../../common/services/wedding.service";

@Component({
    selector: "countdown",
    host: {
        class: 'horizontal countdown',
    },
    template,
    styles: [style],
})

export class admin_CountdownComponent implements OnInit {
    @Input() slug: string;
    weddingData: any;
    countdown: any;
    moment: any;
    date: any;
    spouses: object[];

    constructor(private _modalService: ModalService,
                private _weddingService: WeddingService) {
        this.countdown = {};
        this.moment = moment;
        this.spouses = [];
        this.date = '';
    }

    ngOnInit() {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.weddingData.subscribe(wedding => {
            this.weddingData = wedding[0];
            this.getCountdown();
            this.date = moment(wedding[0].date).format('dddd, MMMM Do YYYY [at] h:mm a');
            this.spouses = wedding[0].spouses;
        });

        let self = this;

        setInterval(function () {
            self.getCountdown();
        }, 10000);
    };

    private getCountdown() {
        let _weddingDate: any = moment(this.weddingData.date);
        let _currentDate: any = moment();
        let _diffTime: any = _weddingDate - _currentDate;
        let _duration: any = moment.duration(_diffTime);

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