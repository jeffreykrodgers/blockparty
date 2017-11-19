import {Component, OnInit} from "@angular/core";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";
import template from "./reminder.html";
import style from "../../style/themes/default/reminder.scss";

@Component({
    selector: "reminder",
    host: {
        class: "reminder",
    },
    template,
    styles: [style]
})

export class ReminderComponent implements OnInit {
    rsvpData: any;
    guests?: object[];
    reminders?: object[];

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {
        this.reminders = [];
        this.guests = [];
    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);

            this.guests = rsvp.guests.filter(function (guest) {
                return guest.attending;
            });

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
        this._router.navigate(['/rsvp/summary']);

    }
}