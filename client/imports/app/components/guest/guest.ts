import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import template from "./guest.html";
import style from "../../style/themes/default/guest.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "guest",
    template,
    styles: [ style ],
})

export class GuestComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter;
    rsvpData: Observable<any>;

    constructor(private _rsvpService: RsvpService) {
        this._rsvpService.getRsvpData().subscribe(rsvp => this.rsvpData = rsvp);
    }

    ngOnInit() {

    }

    setGuests() {
        this._rsvpService.setRsvpData(this.rsvpData);

        this.currentComponent.emit('meal');
    }
}