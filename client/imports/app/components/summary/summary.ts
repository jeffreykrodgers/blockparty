import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import template from "./summary.html";
import style from "../../style/themes/default/summary.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "summary",
    template,
    styles: [style],
})

export class SummaryComponent implements OnInit {
    rsvpData: any;

    constructor(private _rsvpService: RsvpService) {

    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe((rsvp) => {
            this.rsvpData = rsvp;
        });
    }

    finish() {
        this.rsvpData.current_component = {
            name: 'finished',
            title: 'You are all set!'
        };

        this._rsvpService.setRsvpData(this.rsvpData, true);
    }
}