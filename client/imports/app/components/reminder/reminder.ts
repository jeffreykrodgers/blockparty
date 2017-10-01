import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

import template from "./reminder.html";
import style from "../../style/themes/default/reminder.scss";

import {RsvpService} from "../../services/rsvp.service";

@Component({
    selector: "reminder",
    host: {
      class: "reminder",
    },
    template,
    styles: [ style ]
})

export class ReminderComponent implements OnInit {
    //I/O
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();

    //Observables
    rsvpData: Observable<any>;

    //Other Variables
    guests?: object[];
    reminders?: object[];

    constructor(private _rsvpService: RsvpService) {
        this.reminders = [];
        this.guests = [];
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;
            this.guests = rsvp.guests;

            this.guests.forEach((guest: any) => {
                if (guest.reminder && this.reminders.filter((r: any) => r.guest === guest._id).length === 0) {
                    this.reminders.push({
                        guest: guest._id,
                        date: guest.reminder,
                        guest_email: guest.email
                    });
                }
            });
        });
    }


    ngOnInit() {

    }

    addReminder() {
        this.reminders.push({});
    }

    setReminder() {

        this.reminders.forEach((reminder?: any) => {
            this.guests.filter((guest?: any) => {
                if (guest._id === reminder.guest) {
                    guest.reminder = reminder.date;
                    guest.email = reminder.guest_email;
                }
            });
        });

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this.currentComponent.emit('gift');
    }
}