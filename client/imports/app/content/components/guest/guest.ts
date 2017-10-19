import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import template from "./guest.html";
import style from "../../style/themes/default/guest.scss";
import {RsvpService} from "../../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "guest",
    template,
    styles: [ style ],
})

export class GuestComponent implements OnInit {
    rsvpData: any;

    constructor(private _rsvpService: RsvpService) {

    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe((rsvp) => {
            this.rsvpData = rsvp;
        });
    }

    setGuests() {
        this.rsvpData.current_component = {
            name: 'meal'
        };
        //
        // this.rsvpData.guests.forEach((guest) => {
        //     if (!guest.attending) {
        //         this.rsvpData.guests = this.rsvpData.guests.filter(
        //             item => item !== guest);
        //     }
        // });

        this._rsvpService.setRsvpData(this.rsvpData, true);
    }
}