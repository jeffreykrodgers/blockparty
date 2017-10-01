import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import template from "./summary.html";
import style from "../../style/themes/default/summary.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "summary",
    template,
    styles: [ style ],
})

export class SummaryComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter;
    rsvpData: Observable<any>;

    constructor(private _rsvpService: RsvpService) {
        this._rsvpService.getRsvpData().subscribe(rsvp => this.rsvpData = rsvp);
    }

    ngOnInit() {

    }

    finish() {
        this._rsvpService.setRsvpData(this.rsvpData, true);

        this.currentComponent.emit('finished');
    }
}