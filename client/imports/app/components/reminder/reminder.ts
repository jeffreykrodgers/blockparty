import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import template from "./reminder.html";
import { Observable } from "rxjs";
import style from "../../style/themes/default/reminder.scss";
import {WeddingService} from "../../services/wedding.service";
import {RsvpService} from "../../services/rsvp.service";
import {WeddingDB} from "../../../../../both/models/wedding.model";

@Component({
    selector: "reminder",
    host: {
      class: "reminder",
    },
    template,
    styles: [ style ]
})

export class ReminderComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();

    rsvpData: Observable<any>;
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    guestMenuItems: object[];

    constructor(private _weddingService: WeddingService, private _rsvpService: RsvpService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;
            this.guests = rsvp.guests;

            // for (let i = 0; i < this.guests.length; i++) {
            //     this.guestMenuItems[i].label = this.guests[i].guest_name;
            //     this.guestMenuItems[i].value = this.guests[i]._id;
            // }
            //
            // console.log(this.guestMenuItems);
        });
    }


    ngOnInit() {

    }
}