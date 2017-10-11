import { Component, OnInit } from "@angular/core";
import template from "./adminTop.html";
import style from "./adminTop.scss";
import {WeddingService} from "../../../services/wedding.service";

@Component({
    selector: "adminTop",
    host: {
        class: 'adminTop',
    },
    template,
    styles: [ style ]
})

export class AdminTopComponent implements OnInit {

    currentTime: any;
    weddingData: any;
    countdown: any;

    constructor(private _weddingService: WeddingService) {
        this.countdown = {};
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding =>{
            this.weddingData = wedding[0];
        });

        Meteor.call("getServerTime", (error, result) => {
            this.currentTime = result;
            let _weddingTime = new Date(this.weddingData.date);
            let _currentTime = new Date(this.currentTime);

            this.countdown.diff = Math.abs(_weddingTime.getTime() - _currentTime.getTime());
            this.countdown.hours = Math.ceil(this.countdown.diff / (1000 * 3600 * 24));
        });

        let self = this;

        setInterval(function () {
            Meteor.call("getServerTime", (error, result) => {
                self.currentTime = result;
                let _weddingTime = new Date(self.weddingData.date);
                let _currentTime = new Date(self.currentTime);

                self.countdown.diff = Math.abs(_weddingTime.getTime() - _currentTime.getTime());
                self.countdown.hours = Math.ceil(self.countdown.diff / (1000 * 3600 * 24));
            });
        }, 10000);
    };

}